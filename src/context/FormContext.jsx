import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
    const [number, setNumber] = useState('');
    const [keyword, setKeyword] = useState('');
    const [symbol, setSymbol] = useState('');

    return (
        <FormContext.Provider
            value={{
                number,
                setNumber,
                keyword,
                setKeyword,
                symbol,
                setSymbol,
            }}
        >
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within FormProvider');
    }
    return context;
}
