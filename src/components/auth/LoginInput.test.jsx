/**
 * testing scenario for LoginInput
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';
import '@testing-library/jest-dom';

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Enter your email');

    // Action
    await userEvent.type(emailInput, 'testemail@example.com');

    // Assert
    expect(emailInput).toHaveValue('testemail@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText(
      'Enter your password'
    );

    // Action
    await userEvent.type(passwordInput, 'test123456');

    // Assert
    expect(passwordInput).toHaveValue('test123456');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput onLogin={mockLogin} />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    await userEvent.type(emailInput, 'testemail@example.com');
    const passwordInput = await screen.getByPlaceholderText(
      'Enter your password'
    );
    await userEvent.type(passwordInput, 'test123456');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'testemail@example.com',
      password: 'test123456',
    });
  });
});
