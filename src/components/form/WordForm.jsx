import { Field, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from '../../context/FormContext';

export function validateKeyword(val) {
    if (val.trim() === '') {
        return 'キーワードを入力してください';
    }
    if (val.length < 4) {
        return '4文字以上のキーワードを入力してください';
    }
    if (!/^[a-zA-Z]+$/.test(val)) {
        return 'キーワードにはアルファベットのみを使用してください';
    }
    return '';
}

export function WordForm() {
    const { keyword, setKeyword } = useFormContext();
    const [error, setError] = useState('');

    const handleBlur = (e) => {
        const val = e.target.value;
        setError(validateKeyword(val));
    };

    return (
        <Field.Root required invalid={!!error}>
            <Field.Label>
                パスワードに使用するキーワード
                <Field.RequiredIndicator />
            </Field.Label>

            <Input
                name="keyword"
                placeholder="例：naruto"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onBlur={handleBlur}
            />
            {error ? (
                <Field.ErrorText>{error}</Field.ErrorText>
            ) : (
                <Field.HelperText>
                    4文字以上、大文字、小文字もしくはその両方を含む英字
                </Field.HelperText>
            )}
        </Field.Root>
    );
}
