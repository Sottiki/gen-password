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

// jsdom は PointerEvent を持たないのでモックを用意
if (!global.PointerEvent) {
    class PointerEvent extends MouseEvent {
        constructor(type, params = {}) {
            super(type, params);
            this.pointerId = params.pointerId || 0;
            this.width = params.width || 0;
            this.height = params.height || 0;
            this.pressure = params.pressure || 0;
            this.tangentialPressure = params.tangentialPressure || 0;
            this.tiltX = params.tiltX || 0;
            this.tiltY = params.tiltY || 0;
            this.twist = params.twist || 0;
            this.pointerType = params.pointerType || '';
            this.isPrimary = params.isPrimary || false;
        }
    }
    global.PointerEvent = PointerEvent;
    window.PointerEvent = PointerEvent;
}
