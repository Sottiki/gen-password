import '@testing-library/jest-dom';

// jsdom は matchMedia を持たないのでモックを用意
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {}, // 古いAPI用（互換性のため）
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    }),
});
