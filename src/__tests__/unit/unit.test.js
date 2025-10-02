import { describe, expect, test } from 'vitest';
import { validateFourDigit } from '@/components/form/NumberForm';
import { validateSymbol } from '@/components/form/SymbolForm';
import { validateKeyword } from '@/components/form/WordForm';
import { generatePassword } from '@/lib/genPassWord';

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
});
