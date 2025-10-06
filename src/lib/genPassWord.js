/**
 * 配列をシャッフルする関数（Fisher-Yatesアルゴリズム）
 * @param {Array} array - シャッフルする配列
 * @returns {Array} シャッフルされた配列
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * パスワード生成モジュール（既存）
 * @param {string} number - 4桁の数字
 * @param {string} keyword - キーワード（アルファベット）
 * @param {string} symbol - 記号
 * @returns {string} 生成されたパスワード
 */
export function generatePassword(number, keyword, symbol) {
    const parts = [number, keyword, symbol];

    for (let i = parts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [parts[i], parts[j]] = [parts[j], parts[i]];
    }

    return parts.join('');
}

/**
 * より複雑なパスワード生成モジュール
 * 各ジャンルを個別にシャッフルし、文字レベルで混合する
 * @param {string} number - 数字
 * @param {string} keyword - キーワード（アルファベット）
 * @param {string} symbol - 記号
 * @returns {string} 生成されたパスワード
 */
export function generateComplexPassword(number, keyword, symbol) {
    // 各ジャンルを文字配列に分割
    const numberChars = number.split('');
    const keywordChars = keyword.split('');
    const symbolChars = symbol.split('');

    // 各ジャンルを個別にシャッフル
    const shuffledNumbers = shuffleArray(numberChars);
    const shuffledKeywords = shuffleArray(keywordChars);
    const shuffledSymbols = shuffleArray(symbolChars);

    // 全文字を1つの配列に結合
    const allChars = [...shuffledNumbers, ...shuffledKeywords, ...shuffledSymbols];

    // 全体を文字レベルで完全にシャッフル
    const finalPassword = shuffleArray(allChars);

    return finalPassword.join('');
}
