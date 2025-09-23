import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test } from 'vitest';
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
