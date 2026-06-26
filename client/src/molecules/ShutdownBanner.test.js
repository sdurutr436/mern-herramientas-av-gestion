import { render, screen, fireEvent } from '@testing-library/react';
import ShutdownBanner from './ShutdownBanner';

beforeEach(() => {
  document.cookie = 'av_shutdown_dismissed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
});

test('se muestra y al cerrarlo guarda la cookie de sesión y desaparece', () => {
  render(<ShutdownBanner />);
  expect(screen.getByText(/1 de agosto/)).not.toBeNull();

  fireEvent.click(screen.getByLabelText('Cerrar'));

  expect(screen.queryByText(/1 de agosto/)).toBeNull();
  expect(document.cookie).toContain('av_shutdown_dismissed=1');
});

test('no se muestra si la cookie ya está puesta', () => {
  document.cookie = 'av_shutdown_dismissed=1; path=/';
  render(<ShutdownBanner />);
  expect(screen.queryByText(/1 de agosto/)).toBeNull();
});
