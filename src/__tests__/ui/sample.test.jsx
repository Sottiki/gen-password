import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import { Provider } from '@/components/ui/provider';

test('ボタンをクリックするとカウントが増える', async () => {
    const user = userEvent.setup();
    render(
        <Provider>
            <App />
        </Provider>,
    );
    const btn = screen.getByRole('button', { name: /lick me/i });
    await user.click(btn);
    expect(screen.getByText(/count is 1/i)).toBeInTheDocument();
});
