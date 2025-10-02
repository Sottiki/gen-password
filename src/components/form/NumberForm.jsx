import { Field, Input } from '@chakra-ui/react';
import { useFormContext } from '../../context/FormContext';

export function validateFourDigit(val) {
    if (!/^\d{4}$/.test(val)) {
        return '4桁の数字を入力してください';
    }
    return '';
}

export function NumberForm() {
    const { number, setNumber, numberError, setNumberError } = useFormContext();

    const handleBlur = (e) => {
        const val = e.target.value;
        const error = validateFourDigit(val);
        setNumberError(error);
    };

    const handleChange = (e) => {
        setNumber(e.target.value);
        // 入力中はエラーをクリア
        if (numberError) {
            setNumberError('');
        }
    };

    return (
        <Field.Root required invalid={!!numberError}>
            <Field.Label>
                好きな数字4桁を入力してください
                <Field.RequiredIndicator />
            </Field.Label>
            <Input
                name="number"
                placeholder="例:0504"
                value={number}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {numberError ? (
                <Field.ErrorText>{numberError}</Field.ErrorText>
            ) : (
                <Field.HelperText>0始まりでもいいよ</Field.HelperText>
            )}{' '}
        </Field.Root>
    );
}
