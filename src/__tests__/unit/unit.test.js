import { describe, expect, test } from 'vitest';
import { validateFourDigit } from '@/components/form/NumberForm';
import { validateSymbol } from '@/components/form/SymbolForm';
import { validateKeyword } from '@/components/form/WordForm';
import { generatePassword, generateComplexPassword } from '@/lib/genPassWord';

function sum(a, b) {
    return a + b;
}

describe('sum', () => {
    test('足し算をする', () => {
        const result = sum(2, 3);
        expect(result).toBe(5);
    });
});

describe('validateFourDigit', () => {
    test.each([
        ['123', '4桁の数字を入力してください'], // 3桁
        ['12345', '4桁の数字を入力してください'], // 5桁
        ['abcd', '4桁の数字を入力してください'], // 非数字
        ['１２３４', '4桁の数字を入力してください'], // 全角数字
        ['1 234', '4桁の数字を入力してください'], // 空白含み
        ['', '4桁の数字を入力してください'], // 空
    ])('無効な入力: %s のときにエラーメッセージが返ること', (input, expected) => {
        const result = validateFourDigit(input);
        expect(result).toBe(expected);
    });
    test('有効な入力: 4桁の数字のときに空文字が返ること', () => {
        const result = validateFourDigit('1234');
        expect(result).toBe('');
    });
});

describe('validateKeyword', () => {
    test.each([
        ['', 'キーワードを入力してください'], // 空
        ['abc', '4文字以上のキーワードを入力してください'], // 3文字
        ['ab1c', 'キーワードにはアルファベットのみを使用してください'], // 数字含み
        ['ab-c', 'キーワードにはアルファベットのみを使用してください'], // 記号含み
        ['あいうえお', 'キーワードにはアルファベットのみを使用してください'], // 非アルファベット
        ['abc d', 'キーワードにはアルファベットのみを使用してください'], // 空白含み
    ])('無効な入力: %s のときにエラーメッセージが返ること', (input, expected) => {
        const result = validateKeyword(input);
        expect(result).toBe(expected);
    });
    test('有効な入力: 4文字以上のアルファベットのときに空文字が返ること', () => {
        const result = validateKeyword('abcd');
        expect(result).toBe('');
    });
});

describe('validateSymbol', () => {
    test.each([
        ['', '1文字以上の記号を入力してください'], // 空
        ['abc', '記号には特殊文字のみを使用してください'], // 英字のみ
        ['123', '記号には特殊文字のみを使用してください'], // 数字のみ
        ['abc123', '記号には特殊文字のみを使用してください'], // 英数字
        ['あいうえお', '記号には特殊文字のみを使用してください'], // 非記号
        ['abc 123', '記号には特殊文字のみを使用してください'], // 空白含み
    ])('無効な入力: %s のときにエラーメッセージが返ること', (input, expected) => {
        const result = validateSymbol(input);
        expect(result).toBe(expected);
    });
    test.each(['@', '#$%&', '!-/:-@[-`{-~'])('有効な入力: %s のときに空文字が返ること', (input) => {
        const result = validateSymbol(input);
        expect(result).toBe('');
    });
});

describe('generatePassword', () => {
    test('パスワード文字列を返す', () => {
        const number = '1234';
        const keyword = 'abcd';
        const symbol = '@#$';
        const password = generatePassword(number, keyword, symbol);
        expect(typeof password).toBe('string');
        expect(password.length).toBe(11); // 4 + 4 + 3
    });

    test('入力した全ての文字が含まれる', () => {
        const number = '5678';
        const keyword = 'test';
        const symbol = '!@';
        const password = generatePassword(number, keyword, symbol);

        // 数字が全て含まれる
        expect(password).toContain('5');
        expect(password).toContain('6');
        expect(password).toContain('7');
        expect(password).toContain('8');

        // キーワードの文字が全て含まれる
        expect(password).toContain('t');
        expect(password).toContain('e');
        expect(password).toContain('s');

        // 記号が全て含まれる
        expect(password).toContain('!');
        expect(password).toContain('@');
    });

    test('塊でシャッフルされる（各パーツが連続している）', () => {
        const number = '1234';
        const keyword = 'abcd';
        const symbol = '@#$';
        const password = generatePassword(number, keyword, symbol);

        // いずれかのパターンにマッチすることを確認（3つのパーツの順序が保たれている）
        const possiblePatterns = [
            /1234.*abcd.*@#\$/,
            /1234.*@#\$.*abcd/,
            /abcd.*1234.*@#\$/,
            /abcd.*@#\$.*1234/,
            /@#\$.*1234.*abcd/,
            /@#\$.*abcd.*1234/,
        ];

        const matchesPattern = possiblePatterns.some((pattern) => pattern.test(password));
        expect(matchesPattern).toBe(true);
    });

    test('空文字列を含む場合も正しく動作する', () => {
        const number = '1234';
        const keyword = 'abcd';
        const symbol = '';
        const password = generatePassword(number, keyword, symbol);
        expect(password.length).toBe(8); // 4 + 4 + 0
        expect(password).toContain('1');
        expect(password).toContain('a');
    });

    test('異なる長さの入力で正しく動作する', () => {
        const number = '123456';
        const keyword = 'ab';
        const symbol = '@';
        const password = generatePassword(number, keyword, symbol);
        expect(password.length).toBe(9); // 6 + 2 + 1
    });
});

describe('generateComplexPassword', () => {
    test('パスワード文字列を返す', () => {
        const number = '1234';
        const keyword = 'abcd';
        const symbol = '@#$';
        const password = generateComplexPassword(number, keyword, symbol);
        expect(typeof password).toBe('string');
        expect(password.length).toBe(11); // 4 + 4 + 3
    });

    test('入力した全ての文字が含まれる', () => {
        const number = '5678';
        const keyword = 'test';
        const symbol = '!@';
        const password = generateComplexPassword(number, keyword, symbol);

        // 数字が全て含まれる
        expect(password).toContain('5');
        expect(password).toContain('6');
        expect(password).toContain('7');
        expect(password).toContain('8');

        // キーワードの文字が全て含まれる
        expect(password).toContain('t');
        expect(password).toContain('e');
        expect(password).toContain('s');

        // 記号が全て含まれる
        expect(password).toContain('!');
        expect(password).toContain('@');
    });

    test('文字レベルでシャッフルされる（塊ではない）', () => {
        const number = '1234';
        const keyword = 'abcd';
        const symbol = '@#$';

        // 複数回実行して、少なくとも1回は塊でない結果が出ることを確認
        let hasNonBlockPattern = false;
        for (let i = 0; i < 100; i++) {
            const password = generateComplexPassword(number, keyword, symbol);

            // 塊パターン（各パーツが連続している）
            const blockPatterns = [
                /1234.*abcd.*@#\$/,
                /1234.*@#\$.*abcd/,
                /abcd.*1234.*@#\$/,
                /abcd.*@#\$.*1234/,
                /@#\$.*1234.*abcd/,
                /@#\$.*abcd.*1234/,
            ];

            const isBlockPattern = blockPatterns.some((pattern) => pattern.test(password));
            if (!isBlockPattern) {
                hasNonBlockPattern = true;
                break;
            }
        }

        expect(hasNonBlockPattern).toBe(true);
    });

    test('各ジャンルの文字数が正しい', () => {
        const number = '123456';
        const keyword = 'password';
        const symbol = '@#$%';
        const password = generateComplexPassword(number, keyword, symbol);

        // 数字の文字数
        const numberCount = password.split('').filter((c) => /\d/.test(c)).length;
        expect(numberCount).toBe(6);

        // アルファベットの文字数
        const alphaCount = password.split('').filter((c) => /[a-z]/i.test(c)).length;
        expect(alphaCount).toBe(8);

        // 記号の文字数
        const symbolCount = password.split('').filter((c) => /[@#$%]/.test(c)).length;
        expect(symbolCount).toBe(4);
    });

    test('空文字列を含む場合も正しく動作する', () => {
        const number = '1234';
        const keyword = 'abcd';
        const symbol = '';
        const password = generateComplexPassword(number, keyword, symbol);
        expect(password.length).toBe(8); // 4 + 4 + 0
        expect(password).toContain('1');
        expect(password).toContain('a');
    });

    test('異なる長さの入力で正しく動作する', () => {
        const number = '123456';
        const keyword = 'ab';
        const symbol = '@';
        const password = generateComplexPassword(number, keyword, symbol);
        expect(password.length).toBe(9); // 6 + 2 + 1
    });

    test('同じ入力でも異なる結果が生成される（ランダム性の確認）', () => {
        const number = '1234';
        const keyword = 'abcd';
        const symbol = '@#$';

        const passwords = new Set();
        for (let i = 0; i < 10; i++) {
            passwords.add(generateComplexPassword(number, keyword, symbol));
        }

        // 10回生成して少なくとも2つ以上の異なるパスワードが生成されることを確認
        expect(passwords.size).toBeGreaterThan(1);
    });
});

describe('ローディング機能のユニットテスト', () => {
    test('1秒以上待機することを確認', async () => {
        const startTime = Date.now();

        // 1秒待機する処理をシミュレート
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const endTime = Date.now();
        const elapsed = endTime - startTime;

        // 1秒以上経過していることを確認（多少の誤差を許容）
        expect(elapsed).toBeGreaterThanOrEqual(1000);
        expect(elapsed).toBeLessThan(1100);
    });

    test('Promise が正しく解決されることを確認', async () => {
        const promise = new Promise((resolve) => setTimeout(() => resolve('success'), 1000));

        const result = await promise;
        expect(result).toBe('success');
    });
});
