import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test } from 'vitest';
import App from '@/App';
import { Provider } from '@/components/ui/provider';

test('フォームに入力できる', async () => {
    const user = userEvent.setup();
    render(
        <Provider>
            <App />
        </Provider>,
    );

    const numberInput = screen.getByLabelText('好きな数字4桁を入力してください*');
    await user.type(numberInput, '1234');
    expect(numberInput).toHaveValue('1234');

    const wordInput = screen.getByLabelText('パスワードに使用するキーワード*');
    await user.type(wordInput, 'naruto');
    expect(wordInput).toHaveValue('naruto');

    const symbolInput = screen.getByLabelText('パスワードに混ぜる記号を入力してください*');
    await user.type(symbolInput, '@!$');
    expect(symbolInput).toHaveValue('@!$');
});

/**
 *  数字入力フォームのテスト
 */
const renderApp = () => {
    render(
        <Provider>
            <App />
        </Provider>,
    );
};

const getNumberInput = () => screen.getByLabelText('好きな数字4桁を入力してください*');

describe('数字入力フォームのバリデーション', () => {
    let user;

    beforeEach(() => {
        user = userEvent.setup();
        renderApp();
    });

    test.each([
        '123', // 3桁
        '12345', // 5桁
        'abcd', // 非数字
        '１２３４', // 全角数字
        '1 234', // 空白含み
        '', // 空
    ])('無効入力: %s のときにエラーメッセージが表示される', async (input) => {
        const numberInput = getNumberInput();
        if (numberInput.value) {
            await user.clear(numberInput);
        }
        // フォーカスしてから値を入力（空入力はタイプしない）
        await user.click(numberInput);
        if (input) {
            await user.type(numberInput, input);
        }
        await user.tab(); // フォーカスアウト
        expect(screen.getByText('4桁の数字を入力してください')).toBeInTheDocument();
    });

    test.each(['1234', '0123', '0000', '9999'])(
        '有効入力: %s のときにエラーメッセージが表示されない',
        async (input) => {
            const numberInput = getNumberInput();
            if (numberInput.value) {
                await user.clear(numberInput);
            }
            await user.type(numberInput, input);
            await user.tab(); // フォーカスアウト
            expect(screen.queryByText('4桁の数字を入力してください')).not.toBeInTheDocument();
        },
    );
});

/**  キーワード入力フォームのテスト
 */
const getWordInput = () => screen.getByLabelText('パスワードに使用するキーワード*');

describe('キーワード入力フォームのバリデーション', () => {
    let user;

    beforeEach(() => {
        user = userEvent.setup();
        renderApp();
    });

    test('空入力のときにエラーメッセージが表示される', async () => {
        const wordInput = getWordInput();
        if (wordInput.value) {
            await user.clear(wordInput);
        }
        await user.click(wordInput);
        await user.tab(); // フォーカスアウト
        expect(screen.getByText('キーワードを入力してください')).toBeInTheDocument();
    });
    
    test.each(['a', 'abc', 'abcd', 'abcde'])(
        '4文字以上の入力: %s のときにエラーメッセージが表示される',
        async (input) => {
            const wordInput = getWordInput();
            if (wordInput.value) {
                await user.clear(wordInput);
            }
            await user.type(wordInput, input);
            await user.tab(); // フォーカスアウト
            if (input.length < 4) {
                expect(screen.getByText('4文字以上のキーワードを入力してください')).toBeInTheDocument();
            } else {
                expect(screen.queryByText('4文字以上のキーワードを入力してください')).not.toBeInTheDocument();
            }
        }
    );

    test('アルファベット以外の文字が混ざっている時', async () => {
        const wordInput = getWordInput();
        if (wordInput.value) {
            await user.clear(wordInput);
        }
        await user.type(wordInput, 'abc1');
        await user.tab(); // フォーカスアウト
        expect(screen.getByText('キーワードにはアルファベットのみを使用してください')).toBeInTheDocument();
    });
});
