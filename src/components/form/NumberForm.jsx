import { Field, Input } from '@chakra-ui/react';

export function NumberForm() {
    return (
        <Field.Root required>
            <Field.Label>
                好きな数字4桁を入力してください
                <Field.RequiredIndicator />
            </Field.Label>
            <Input name="number" placeholder="例:0504" />
            {/* TODO：エラー表示追加 */}
        </Field.Root>
    );
}
