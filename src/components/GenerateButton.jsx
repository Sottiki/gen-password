import { Button } from '@chakra-ui/react';
import { useFormContext } from '../context/FormContext';
import { generatePassword } from '../lib/genPassWord';

export default function GenerateButton({ onGenerate }) {
    const { number, keyword, symbol } = useFormContext();

    const handleClick = () => {
        try {
            const pw = generatePassword(number, keyword, symbol);
            onGenerate(pw);
        } catch (e) {
            console.error(e);
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
