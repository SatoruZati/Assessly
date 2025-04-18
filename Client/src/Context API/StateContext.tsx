import React, { createContext, useState, ReactNode } from 'react';

export const StateContext = createContext<any>(undefined);

interface StateProviderProps {
    children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
    const [modalOpen, setModal] = useState(false)
    const [isAssignments, setAssignments] = useState(false)
    const [isSubmissions, setSubmissions] = useState(false)
    const [isHome, setHome] = useState(true)
    const [studentName, setStudentName] = useState("")
    return (
        <StateContext.Provider value={{
            modalOpen, setModal,
            isAssignments, setAssignments,
            isSubmissions, setSubmissions,
            isHome, setHome,
            studentName, setStudentName
        }}>
            {children}
        </StateContext.Provider>
    );
};