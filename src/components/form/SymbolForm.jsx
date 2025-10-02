import { Field, Input } from '@chakra-ui/react';
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
    const { symbol, setSymbol, symbolError, setSymbolError } = useFormContext();

    const handleBlur = (e) => {
        const val = e.target.value;
        const error = validateSymbol(val);
        setSymbolError(error);
    };

    const handleChange = (e) => {
        setSymbol(e.target.value);
        // 入力中はエラーをクリア
        if (symbolError) {
            setSymbolError('');
        }
    };

    return (
        <Field.Root required invalid={!!symbolError}>
            <Field.Label>
                パスワードに混ぜる記号を入力してください
                <Field.RequiredIndicator />
            </Field.Label>
            <Input
                name="symbol"
                placeholder="例: @#$%&"
                fontFamily="monospace"
                value={symbol}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {symbolError ? (
                <Field.ErrorText>{symbolError}</Field.ErrorText>
            ) : (
                <Field.HelperText>1文字以上の記号を入力してください</Field.HelperText>
            )}
        </Field.Root>
    );
}
