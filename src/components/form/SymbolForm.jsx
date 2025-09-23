import { Field, Input } from '@chakra-ui/react';

export function SymbolForm() {
    return (
        <Field.Root required>
            <Field.Label>
                パスワードに混ぜる記号を入力してください
                <Field.RequiredIndicator />
            </Field.Label>
            <Input name="symbol" placeholder="例: @#$%&" fontFamily="monospace" />
            {/* TODO：エラー表示追加 */}
        </Field.Root>
    );
}
