import { Field, Input } from '@chakra-ui/react';
import { useState } from 'react';

export function validateFourDigit(val) {
    if (!/^\d{4}$/.test(val)) {
        return '4桁の数字を入力してください';
    }
    return '';
}

export function NumberForm() {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleBlur = (e) => {
        const val = e.target.value;
        setError(validateFourDigit(val));
    };

    return (
        <Field.Root required invalid={!!error}>
            <Field.Label>
                好きな数字4桁を入力してください
                <Field.RequiredIndicator />
            </Field.Label>
            <Input
                name="number"
                placeholder="例:0504"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
            />
            {error ? (
                <Field.ErrorText>{error}</Field.ErrorText>
            ) : (
                <Field.HelperText>0始まりでもいいよ</Field.HelperText>
            )}{' '}
        </Field.Root>
    );
}
