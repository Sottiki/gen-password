import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
    const [number, setNumber] = useState('');
    const [keyword, setKeyword] = useState('');
    const [symbol, setSymbol] = useState('');

    // 各フォームのエラー状態
    const [numberError, setNumberError] = useState('');
    const [keywordError, setKeywordError] = useState('');
    const [symbolError, setSymbolError] = useState('');

    // 複雑なパスワード生成モードのスイッチ
    const [useComplexMode, setUseComplexMode] = useState(false);

    // 全てのフォームが有効かどうかをチェック
    const isValid = () => {
        return !numberError && !keywordError && !symbolError;
    };

    return (
        <FormContext.Provider
            value={{
                number,
                setNumber,
                keyword,
                setKeyword,
                symbol,
                setSymbol,
                numberError,
                setNumberError,
                keywordError,
                setKeywordError,
                symbolError,
                setSymbolError,
                useComplexMode,
                setUseComplexMode,
                isValid,
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
