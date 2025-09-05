import { describe, test, expect } from 'vitest';

function sum(a, b) {
    return a + b;
}

describe('sum', () => {
    test('足し算をする', () => {
        const result = sum(2,3);
        expect(result).toBe(5);
    });
});
