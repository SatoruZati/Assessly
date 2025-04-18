import axios from 'axios';
interface ExportTestResultsButtonProps {
    testHash: string;
}
export default function ExportTestResultsButton({ testHash }: ExportTestResultsButtonProps) {
    const token = localStorage.getItem('token');

    const handleExportTestResults = async () => {
        if (!testHash) {
            alert("Test hash is missing.");
            return;
        }
        if (!token) {
            alert("Authentication token not found. Please log in again.");
            return;
        }

        try {
            const response = await axios.post("https://grade-genie-server.vercel.app/api/v1/tests/export", {
                hash: testHash,
            }, {
                headers: {
                    token: token,
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `test_results_${testHash}.csv`);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error: any) {
            console.error("Error exporting test results:", error);
            if (error.response && error.response.status === 404) {
                 alert("Error: Test not found or no results available to export.");
            } else if (error.response && (error.response.status === 401 || error.response.status === 403)){
                 alert("Authentication error. Please log in again.");
            }
            else {
                 alert("Error exporting test results. Please try again later.");
            }
        }
    };

    return (
        <button
            onClick={handleExportTestResults}
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-1.5 px-3 rounded-md transition-colors flex items-center gap-1"
            disabled={!testHash}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Test Results
        </button>
    );
}