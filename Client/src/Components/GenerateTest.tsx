import React, { useState } from 'react';
import axios from 'axios';

interface GenerateTestProps {
    isOpen: boolean;
    onClose: () => void;
}

const GenerateTest: React.FC<GenerateTestProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        description: '',
        numberOfQuestions: '',
        difficulty: 'medium',
        testDate: '',
        testTime: ''
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const nextStep = () => {
        if (formData.title && formData.subject && formData.description) {
            setCurrentStep(2);
        }
    };

    const prevStep = () => {
        setCurrentStep(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const testDateTime = new Date(`${formData.testDate}T${formData.testTime}`);
            
            const submissionData = {
                ...formData,
                testDateTime: testDateTime.toISOString(),
            };

            const response = await axios.post('https://localhost:3000/api/v1/tests/create', submissionData, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            onClose();
        } catch (error) {
            console.error('Error creating test:', error);
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800/60 backdrop-blur-[8px] overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative bg-gray-800 w-full max-w-md mx-4 rounded-3xl shadow-2xl border border-blue-400/30">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 mix-blend-screen"></div>
                    <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-20 mix-blend-screen"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-900/10 to-cyan-900/10 rounded-3xl opacity-40"></div>
                </div>
                
                <div className="relative p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Create New Test
                            </h2>
                            <p className="text-blue-300 text-sm mt-1">
                                Step {currentStep} of 2: {currentStep === 1 ? 'Basic Information' : 'Test Details'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-blue-300 hover:text-blue-400 p-2 hover:bg-blue-500/10 rounded-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-8 relative">
                        <div className="absolute w-24 h-0.5 bg-gray-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-blue-300'} border-2 ${currentStep === 1 ? 'border-blue-400' : 'border-blue-700'} shadow-md`}>
                                    1
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-blue-300'} border-2 ${currentStep === 2 ? 'border-blue-400' : 'border-blue-700'} shadow-md`}>
                                    2
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className={currentStep === 1 ? 'block' : 'hidden'}>
                            {currentStep === 1 && (
                                <>
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-blue-300 mb-1">
                                                Test Title
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2.5 bg-gray-700 border border-blue-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-blue-200/50 shadow-sm hover:border-blue-600"
                                                placeholder="Enter test title"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-blue-300 mb-1">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2.5 bg-gray-700 border border-blue-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-blue-200/50 shadow-sm hover:border-blue-600"
                                                placeholder="Enter subject"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-blue-300 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                                rows={3}
                                                className="w-full px-4 py-2.5 bg-gray-700 border border-blue-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-blue-200/50 shadow-sm hover:border-blue-600 resize-none"
                                                placeholder="Enter test description"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-6">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 text-sm font-medium text-blue-300 bg-gray-700 border border-blue-700 rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!formData.title || !formData.subject || !formData.description}
                                            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next Step
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className={currentStep === 2 ? 'block' : 'hidden'}>
                            {currentStep === 2 && (
                                <>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="testDate" className="block text-sm font-medium text-blue-300 mb-1">
                                                    Test Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="testDate"
                                                    name="testDate"
                                                    value={formData.testDate}
                                                    onChange={handleChange}
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full px-4 py-2.5 bg-gray-700 border border-blue-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-blue-200/50 shadow-sm hover:border-blue-600"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="testTime" className="block text-sm font-medium text-blue-300 mb-1">
                                                    Test Time
                                                </label>
                                                <input
                                                    type="time"
                                                    id="testTime"
                                                    name="testTime"
                                                    value={formData.testTime}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2.5 bg-gray-700 border border-blue-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-blue-200/50 shadow-sm hover:border-blue-600"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="numberOfQuestions" className="block text-sm font-medium text-blue-300 mb-1">
                                                Number of Questions
                                            </label>
                                            <input
                                                type="number"
                                                id="numberOfQuestions"
                                                name="numberOfQuestions"
                                                value={formData.numberOfQuestions}
                                                onChange={handleChange}
                                                required
                                                min="1"
                                                className="w-full px-4 py-2.5 bg-gray-700 border border-blue-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-blue-200/50 shadow-sm hover:border-blue-600"
                                                placeholder="Enter number of questions"
                                            />
                                        </div>

        <div>
                                            <label htmlFor="difficulty" className="block text-sm font-medium text-blue-300 mb-1">
                                                Difficulty Level
                                            </label>
                                            <select
                                                id="difficulty"
                                                name="difficulty"
                                                value={formData.difficulty}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2.5 bg-gray-700 border border-blue-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white shadow-sm hover:border-blue-600 appearance-none"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2360a5fa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                    backgroundPosition: 'right 0.5rem center',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '1.5em 1.5em',
                                                    paddingRight: '2.5rem'
                                                }}
                                            >
                                                <option value="easy">Easy</option>
                                                <option value="medium">Medium</option>
                                                <option value="hard">Hard</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-6">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="px-4 py-2 text-sm font-medium text-blue-300 bg-gray-700 border border-blue-700 rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating...
                                                </>
                                            ) : (
                                                'Create Test'
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GenerateTest;
