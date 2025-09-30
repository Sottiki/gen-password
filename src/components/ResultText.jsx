/**
 * @file ResultText.jsx
 * @description 生成されたパスワードを表示するコンポーネント
 * クリックでクリップボードにコピー
 */

import { Clipboard, IconButton, Input, InputGroup } from '@chakra-ui/react';

function ClipboardIconButton() {
    return (
        <Clipboard.Trigger asChild>
            <IconButton
                variant="surface"
                size="xs"
                me="-2" // アイコンの右側マージン調整
                aria-label="パスワードをコピー"
            >
                <Clipboard.Indicator />
            </IconButton>
        </Clipboard.Trigger>
    );
}

export default function ResultText({ password }) {
    return (
        <Clipboard.Root maxW="300px" value={password} mt={6}>
            <Clipboard.Label fontWeight="bold" fontSize="sm">
                生成されたパスワード
            </Clipboard.Label>
            <InputGroup endElement={<ClipboardIconButton />}>
                <Clipboard.Input asChild>
                    <Input />
                </Clipboard.Input>
            </InputGroup>
        </Clipboard.Root>
    );
}
