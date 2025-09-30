import { Button } from '@chakra-ui/react';
import { generatePassword } from '../lib/genPassWord';

export default function GenerateButton({ onGenerate }) {
    const handleClick = () => {
        try {
            const pw = generatePassword();
            onGenerate(pw);
        } catch (e) {
            onError(e);
        } finally {
            // TODO: ローディング状態を解除する
        }
    };

    return (
        <Button
            type="button"
            onClick={handleClick}
            mt={6}
            width="100%"
            bgColor="teal.500"
            color="white"
        >
            生成
        </Button>
    );
}
