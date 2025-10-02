import { Field, Input } from '@chakra-ui/react';
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
    const { keyword, setKeyword, keywordError, setKeywordError } = useFormContext();

    const handleBlur = (e) => {
        const val = e.target.value;
        const error = validateKeyword(val);
        setKeywordError(error);
    };

    const handleChange = (e) => {
        setKeyword(e.target.value);
        // 入力中はエラーをクリア
        if (keywordError) {
            setKeywordError('');
        }
    };

    return (
        <Field.Root required invalid={!!keywordError}>
            <Field.Label>
                パスワードに使用するキーワード
                <Field.RequiredIndicator />
            </Field.Label>

            <Input
                name="keyword"
                placeholder="例：naruto"
                value={keyword}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {keywordError ? (
                <Field.ErrorText>{keywordError}</Field.ErrorText>
            ) : (
                <Field.HelperText>
                    4文字以上、大文字、小文字もしくはその両方を含む英字
                </Field.HelperText>
            )}
        </Field.Root>
    );
}
