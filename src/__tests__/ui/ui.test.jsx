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

/**
 * キーワード入力フォームのテスト
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
                expect(
                    screen.getByText('4文字以上のキーワードを入力してください'),
                ).toBeInTheDocument();
            } else {
                expect(
                    screen.queryByText('4文字以上のキーワードを入力してください'),
                ).not.toBeInTheDocument();
            }
        },
    );

    test('アルファベット以外の文字が混ざっている時', async () => {
        const wordInput = getWordInput();
        if (wordInput.value) {
            await user.clear(wordInput);
        }
        await user.type(wordInput, 'abc1');
        await user.tab(); // フォーカスアウト
        expect(
            screen.getByText('キーワードにはアルファベットのみを使用してください'),
        ).toBeInTheDocument();
    });
});

/**
 * 記号入力フォームのテスト
 */
const getSymbolInput = () => screen.getByLabelText('パスワードに混ぜる記号を入力してください*');
describe('記号入力フォームのバリデーション', () => {
    let user;

    beforeEach(() => {
        user = userEvent.setup();
        renderApp();
    });

    test('空入力のときにエラーメッセージが表示される', async () => {
        const symbolInput = getSymbolInput();
        if (symbolInput.value) {
            await user.clear(symbolInput);
        }
        await user.click(symbolInput);
        await user.tab(); // フォーカスアウト
        expect(screen.getByText('1文字以上の記号を入力してください')).toBeInTheDocument();
    });

    test.each(['abc', '123', 'abc123', 'あいうえお', 'abc 123'])(
        '特殊文字以外の文字が混ざっている時: %s のときにエラーメッセージが表示される',
        async (input) => {
            const symbolInput = getSymbolInput();
            if (symbolInput.value) {
                await user.clear(symbolInput);
            }
            await user.type(symbolInput, input);
            await user.tab(); // フォーカスアウト
            expect(screen.getByText('記号には特殊文字のみを使用してください')).toBeInTheDocument();
        },
    );

    test.each([
        '@',
        '#$%&',
        '!-/:-@',
        '[]', // [] を直接入力
        '`',
        '{', // { を直接入力
        '-',
        '~',
    ])('有効な入力: %s のときにエラーメッセージが表示されない', async (input) => {
        const symbolInput = getSymbolInput();
        if (symbolInput.value) {
            await user.clear(symbolInput);
        }
        // 特殊文字（[]や{）は直接valueにセット
        if (input === '[]' || input === '{') {
            symbolInput.value = input;
        } else {
            await user.type(symbolInput, input);
        }
        await user.tab(); // フォーカスアウト
        // エラーメッセージが空であること
        expect(
            screen.queryByText('記号には特殊文字のみを使用してください'),
        ).not.toBeInTheDocument();
    });
});

describe('パスワード生成時のバリデーション', () => {
    let user;

    beforeEach(() => {
        user = userEvent.setup();
        renderApp();
    });

    test('未入力の状態で生成ボタンを押すとエラーが表示される', async () => {
        const generateButton = screen.getByRole('button', { name: '生成' });
        await user.click(generateButton);

        // 各フォームにエラーメッセージが表示される
        expect(screen.getByText('4桁の数字を入力してください')).toBeInTheDocument();
        expect(screen.getByText('キーワードを入力してください')).toBeInTheDocument();
        expect(screen.getByText('1文字以上の記号を入力してください')).toBeInTheDocument();
    });

    test('一部のフォームが未入力の状態で生成ボタンを押すとエラーが表示される', async () => {
        // 数字フォームだけ入力
        const numberInput = getNumberInput();
        await user.type(numberInput, '1234');

        const generateButton = screen.getByRole('button', { name: '生成' });
        await user.click(generateButton);

        // 未入力のフォームにエラーが表示される
        expect(screen.getByText('キーワードを入力してください')).toBeInTheDocument();
        expect(screen.getByText('1文字以上の記号を入力してください')).toBeInTheDocument();

        // 入力済みのフォームにはエラーが出ない
        expect(screen.queryByText('4桁の数字を入力してください')).not.toBeInTheDocument();
    });

    test('無効な値で生成ボタンを押すとエラーが表示される', async () => {
        // 無効な値を入力
        const numberInput = getNumberInput();
        await user.type(numberInput, '123'); // 3桁

        const wordInput = getWordInput();
        await user.type(wordInput, 'ab'); // 2文字

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, 'abc'); // 記号ではない

        const generateButton = screen.getByRole('button', { name: '生成' });
        await user.click(generateButton);

        // 各フォームにエラーメッセージが表示される
        expect(screen.getByText('4桁の数字を入力してください')).toBeInTheDocument();
        expect(screen.getByText('4文字以上のキーワードを入力してください')).toBeInTheDocument();
        expect(screen.getByText('記号には特殊文字のみを使用してください')).toBeInTheDocument();
    });

    test('エラーがある状態で入力を修正するとエラーが消える', async () => {
        // まず生成ボタンを押してエラーを表示
        const generateButton = screen.getByRole('button', { name: '生成' });
        await user.click(generateButton);

        expect(screen.getByText('4桁の数字を入力してください')).toBeInTheDocument();

        // 正しい値を入力するとエラーが消える
        const numberInput = getNumberInput();
        await user.type(numberInput, '1234');

        expect(screen.queryByText('4桁の数字を入力してください')).not.toBeInTheDocument();
    });
});

describe('パスワード生成機能の統合テスト', () => {
    let user;

    beforeEach(() => {
        user = userEvent.setup();
        renderApp();
    });

    test('全てのフォームに入力してパスワードを生成できる', async () => {
        // 各フォームに入力
        const numberInput = getNumberInput();
        await user.type(numberInput, '1234');

        const wordInput = getWordInput();
        await user.type(wordInput, 'test');

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, '@#$');

        // 生成ボタンをクリック
        const generateButton = screen.getByRole('button', { name: '生成' });
        await user.click(generateButton);

        // ローディング完了を待機
        await new Promise((resolve) => setTimeout(resolve, 1100));

        // 生成されたパスワードが表示される
        const label = await screen.findByText('生成されたパスワード');
        expect(label).toBeInTheDocument();

        // 生成されたパスワードの長さを確認
        const resultInput = screen.getByRole('textbox', { name: /生成されたパスワード/i });
        expect(resultInput.value).not.toBe('');
        expect(resultInput.value.length).toBe(11); // 4 + 4 + 3
    });

    test('生成されたパスワードに入力した文字が全て含まれる', async () => {
        // 各フォームに入力
        const numberInput = getNumberInput();
        await user.type(numberInput, '5678');

        const wordInput = getWordInput();
        await user.type(wordInput, 'abcd');

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, '!@');

        // 生成ボタンをクリック
        const generateButton = screen.getByRole('button', { name: '生成' });
        await user.click(generateButton);

        // ローディング完了を待機
        await new Promise((resolve) => setTimeout(resolve, 1100));

        // 生成されたパスワードを取得
        const resultInput = screen.getByRole('textbox', { name: /生成されたパスワード/i });
        const password = resultInput.value;

        // 全ての文字が含まれていることを確認
        expect(password).toContain('5');
        expect(password).toContain('6');
        expect(password).toContain('7');
        expect(password).toContain('8');
        expect(password).toContain('a');
        expect(password).toContain('b');
        expect(password).toContain('c');
        expect(password).toContain('d');
        expect(password).toContain('!');
        expect(password).toContain('@');
    });

    test('生成ボタンを複数回押すとパスワードが変わる（ランダム性の確認）', async () => {
        // 各フォームに入力
        const numberInput = getNumberInput();
        await user.type(numberInput, '1234');

        const wordInput = getWordInput();
        await user.type(wordInput, 'test');

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, '@#$');

        const generateButton = screen.getByRole('button', { name: '生成' });
        const resultInput = screen.getByRole('textbox', { name: /生成されたパスワード/i });

        // 1回目の生成
        await user.click(generateButton);
        await new Promise((resolve) => setTimeout(resolve, 1100));
        const password1 = resultInput.value;

        // 2回目の生成
        await user.click(generateButton);
        await new Promise((resolve) => setTimeout(resolve, 1100));
        const password2 = resultInput.value;

        // 3回目の生成
        await user.click(generateButton);
        await new Promise((resolve) => setTimeout(resolve, 1100));
        const password3 = resultInput.value;

        // 少なくとも1つは異なるパスワードが生成されることを確認
        // （全て同じになる確率は非常に低い）
        const passwords = [password1, password2, password3];
        const uniquePasswords = new Set(passwords);
        expect(uniquePasswords.size).toBeGreaterThan(1);
    });

    test('異なる入力で異なるパスワードが生成される', async () => {
        // 1回目：最初の入力でパスワード生成
        const numberInput = getNumberInput();
        await user.type(numberInput, '1234');

        const wordInput = getWordInput();
        await user.type(wordInput, 'test');

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, '@#$');

        const generateButton = screen.getByRole('button', { name: '生成' });
        await user.click(generateButton);

        // ローディング完了を待機
        await new Promise((resolve) => setTimeout(resolve, 1100));

        const resultInput = screen.getByRole('textbox', { name: /生成されたパスワード/i });
        const password1 = resultInput.value;

        // 2回目：異なる入力でパスワード生成
        await user.clear(numberInput);
        await user.type(numberInput, '5678');

        await user.clear(wordInput);
        await user.type(wordInput, 'abcd');

        await user.clear(symbolInput);
        await user.type(symbolInput, '!@');

        await user.click(generateButton);

        // ローディング完了を待機
        await new Promise((resolve) => setTimeout(resolve, 1100));

        const password2 = resultInput.value;

        // 入力が異なれば、生成されるパスワードも異なる
        expect(password1).not.toBe(password2);
        expect(password1.length).toBe(11);
        expect(password2.length).toBe(10); // 5678(4) + abcd(4) + !@(2)
    });
});

describe('複雑モードスイッチのテスト', () => {
    let user;

    beforeEach(() => {
        user = userEvent.setup();
        renderApp();
    });

    test('スイッチラベルが表示される', () => {
        expect(screen.getByText('複雑なパスワード生成モード')).toBeInTheDocument();
        expect(screen.getByText('(文字レベルでシャッフル)')).toBeInTheDocument();
        expect(screen.getByText('ON')).toBeInTheDocument();
    });

    test('スイッチをクリックして切り替えられる', async () => {
        // Switch.Controlをクリック（data-part="control"で検索）
        const switchControl = screen.getByText('複雑なパスワード生成モード').parentElement;

        // スイッチをクリック
        await user.click(switchControl);

        // コンテキストの状態が変わったことを確認するため、パスワード生成で検証
        const numberInput = getNumberInput();
        await user.type(numberInput, '1234');

        const wordInput = getWordInput();
        await user.type(wordInput, 'test');

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, '@#$');

        const generateButton = screen.getByRole('button', { name: '生成' });
        await user.click(generateButton);

        await new Promise((resolve) => setTimeout(resolve, 1100));

        // パスワードが生成されることを確認
        const resultInput = screen.getByRole('textbox', { name: /生成されたパスワード/i });
        expect(resultInput.value).not.toBe('');
    });
});

describe('複雑モードでのパスワード生成テスト', () => {
    let user;

    beforeEach(() => {
        user = userEvent.setup();
        renderApp();
    });

    test('複雑モードONの状態で正しくパスワードが生成される', async () => {
        // 複雑モードをON（スイッチラベルをクリック）
        const switchLabel = screen.getByText('複雑なパスワード生成モード').parentElement;
        await user.click(switchLabel);

        // フォームに入力
        const numberInput = getNumberInput();
        await user.type(numberInput, '5678');

        const wordInput = getWordInput();
        await user.type(wordInput, 'abcd');

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, '!@');

        // パスワード生成
        const generateButton = screen.getByRole('button', { name: '生成' });
        await user.click(generateButton);
        await new Promise((resolve) => setTimeout(resolve, 1100));

        // パスワードが生成されていることを確認
        const resultInput = screen.getByRole('textbox', { name: /生成されたパスワード/i });
        expect(resultInput.value).not.toBe('');
        expect(resultInput.value.length).toBe(10); // 5678(4) + abcd(4) + !@(2)

        // 入力した全ての文字が含まれることを確認
        expect(resultInput.value).toContain('5');
        expect(resultInput.value).toContain('6');
        expect(resultInput.value).toContain('7');
        expect(resultInput.value).toContain('8');
        expect(resultInput.value).toContain('a');
        expect(resultInput.value).toContain('b');
        expect(resultInput.value).toContain('c');
        expect(resultInput.value).toContain('d');
        expect(resultInput.value).toContain('!');
        expect(resultInput.value).toContain('@');
    });

    test('通常モードと複雑モードでパスワードが生成される', async () => {
        // フォームに入力
        const numberInput = getNumberInput();
        await user.type(numberInput, '1234');

        const wordInput = getWordInput();
        await user.type(wordInput, 'test');

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, '@#$');

        const generateButton = screen.getByRole('button', { name: '生成' });
        const resultInput = screen.getByRole('textbox', { name: /生成されたパスワード/i });

        // 通常モードで生成
        await user.click(generateButton);
        await new Promise((resolve) => setTimeout(resolve, 1100));
        const normalPassword = resultInput.value;
        expect(normalPassword.length).toBe(11);

        // 複雑モードに切り替え
        const switchLabel = screen.getByText('複雑なパスワード生成モード').parentElement;
        await user.click(switchLabel);

        // 複雑モードで生成
        await user.click(generateButton);
        await new Promise((resolve) => setTimeout(resolve, 1100));
        const complexPassword = resultInput.value;

        // パスワードの長さが同じであることを確認
        expect(complexPassword.length).toBe(11);

        // 全ての文字が含まれていることを確認
        expect(complexPassword).toContain('1');
        expect(complexPassword).toContain('2');
        expect(complexPassword).toContain('3');
        expect(complexPassword).toContain('4');
        expect(complexPassword).toContain('t');
        expect(complexPassword).toContain('e');
        expect(complexPassword).toContain('s');
        expect(complexPassword).toContain('@');
        expect(complexPassword).toContain('#');
        expect(complexPassword).toContain('$');
    });
});

describe('ローディング機能のテスト', () => {
    let user;

    beforeEach(() => {
        user = userEvent.setup();
        renderApp();
    });

    test('生成ボタンをクリックするとローディング状態になる', async () => {
        // 各フォームに入力
        const numberInput = getNumberInput();
        await user.type(numberInput, '1234');

        const wordInput = getWordInput();
        await user.type(wordInput, 'test');

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, '@#$');

        const generateButton = screen.getByRole('button', { name: '生成' });

        // 生成ボタンをクリック
        await user.click(generateButton);

        // ボタンが無効化されることを確認
        expect(generateButton).toBeDisabled();
    });

    test('パスワード生成が完了するとローディング状態が解除される', async () => {
        // 各フォームに入力
        const numberInput = getNumberInput();
        await user.type(numberInput, '1234');

        const wordInput = getWordInput();
        await user.type(wordInput, 'test');

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, '@#$');

        const generateButton = screen.getByRole('button', { name: '生成' });

        // 生成ボタンをクリック
        await user.click(generateButton);

        // 少し待機（1秒以上）
        await new Promise((resolve) => setTimeout(resolve, 1100));

        // ボタンが再度有効になることを確認
        expect(generateButton).not.toBeDisabled();

        // パスワードが生成されていることを確認
        const resultInput = screen.getByRole('textbox', { name: /生成されたパスワード/i });
        expect(resultInput.value).not.toBe('');
    });

    test('ローディング中は連続クリックを防止する', async () => {
        // 各フォームに入力
        const numberInput = getNumberInput();
        await user.type(numberInput, '1234');

        const wordInput = getWordInput();
        await user.type(wordInput, 'test');

        const symbolInput = getSymbolInput();
        await user.type(symbolInput, '@#$');

        const generateButton = screen.getByRole('button', { name: '生成' });

        // 生成ボタンをクリック
        await user.click(generateButton);

        // ボタンが無効化されていることを確認
        expect(generateButton).toBeDisabled();

        // ローディング完了を待機
        await new Promise((resolve) => setTimeout(resolve, 1100));

        // ローディング完了後、ボタンが再度有効になる
        expect(generateButton).not.toBeDisabled();
    });
});
