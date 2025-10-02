import { Button } from '@chakra-ui/react';
import { useFormContext } from '../context/FormContext';
import { generatePassword } from '../lib/genPassWord';
import { validateFourDigit } from './form/NumberForm';
import { validateSymbol } from './form/SymbolForm';
import { validateKeyword } from './form/WordForm';

export default function GenerateButton({ onGenerate }) {
    const {
        number,
        keyword,
        symbol,
        setNumberError,
        setKeywordError,
        setSymbolError,
    } = useFormContext();

    const handleClick = () => {
        // 生成ボタンを押した時に各フォームをバリデーション
        const numError = validateFourDigit(number);
        const keyError = validateKeyword(keyword);
        const symError = validateSymbol(symbol);

        // エラーをContextに設定
        setNumberError(numError);
        setKeywordError(keyError);
        setSymbolError(symError);

        // エラーがある場合は生成しない
        if (numError || keyError || symError) {
            return;
        }

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
