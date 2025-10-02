import { Field, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from '../../context/FormContext';

export function validateSymbol(val) {
    if (val.trim() === '') {
        return '1文字以上の記号を入力してください';
    }
    if (!/^[!-/:-@[-`{-~]+$/.test(val)) {
        return '記号には特殊文字のみを使用してください';
    }
    return '';
}

export function SymbolForm() {
    const { symbol, setSymbol } = useFormContext();
    const [error, setError] = useState('');

    const handleBlur = (e) => {
        const val = e.target.value;
        setError(validateSymbol(val));
    };

    return (
        <Field.Root required invalid={!!error}>
            <Field.Label>
                パスワードに混ぜる記号を入力してください
                <Field.RequiredIndicator />
            </Field.Label>
            <Input
                name="symbol"
                placeholder="例: @#$%&"
                fontFamily="monospace"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                onBlur={handleBlur}
            />
            {error ? (
                <Field.ErrorText>{error}</Field.ErrorText>
            ) : (
                <Field.HelperText>1文字以上の記号を入力してください</Field.HelperText>
            )}
        </Field.Root>
    );
}
