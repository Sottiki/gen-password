/**
 * パスワード生成モジュール
 * @param {string} number - 4桁の数字
 * @param {string} keyword - キーワード（アルファベット）
 * @param {string} symbol - 記号
 * @returns {string} 生成されたパスワード
 */
export function generatePassword(number, keyword, symbol) {
    // TODO：分割の粒度を細かくする
    const parts = [number, keyword, symbol];

    for (let i = parts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [parts[i], parts[j]] = [parts[j], parts[i]];
    }

    return parts.join('');
}
