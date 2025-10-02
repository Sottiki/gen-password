import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useFormContext } from '../context/FormContext';
import { generatePassword } from '../lib/genPassWord';
import { validateFourDigit } from './form/NumberForm';
import { validateKeyword } from './form/WordForm';
import { validateSymbol } from './form/SymbolForm';

export default function GenerateButton({ onGenerate }) {
    const {
        number,
        keyword,
        symbol,
        setNumberError,
        setKeywordError,
        setSymbolError,
    } = useFormContext();

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
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
            setIsLoading(true);

            // 意図的に1秒待機、理由は生成してそうな感じが出るから
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const pw = generatePassword(number, keyword, symbol);
            onGenerate(pw);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
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
            loading={isLoading}
            disabled={isLoading}
        >
            生成
        </Button>
    );
}
