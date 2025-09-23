import { describe, expect, test } from 'vitest';
import { validateFourDigit } from '@/components/form/NumberForm';


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
