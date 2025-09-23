import { Field, Input } from '@chakra-ui/react';

export function WordForm() {
    return (
        <Field.Root required>
            <Field.Label>
                パスワードに使用するキーワード
                <Field.RequiredIndicator />
            </Field.Label>

            <Input name="keyword" placeholder="例：naruto" />
            {/* TODO：エラー表示追加 */}
        </Field.Root>
    );
}
