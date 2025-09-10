import { Field, Input } from '@chakra-ui/react';

export function WordForm() {
    return (
        <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input name="name" />
            {/* TODO：エラー表示追加 */}
        </Field.Root>
    );
}
