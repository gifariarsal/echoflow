/**
 * testing scenario for RegisterInput
 * - LoginInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';
import '@testing-library/jest-dom';

describe('RegisterInput component', () => {
  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Enter your name');

    // Action
    await userEvent.type(nameInput, 'testname123');

    // Assert
    expect(nameInput).toHaveValue('testname123');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Enter your email');

    // Action
    await userEvent.type(emailInput, 'testemail@example.com');

    // Assert
    expect(emailInput).toHaveValue('testemail@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Enter your password');

    // Action
    await userEvent.type(passwordInput, 'test123456');

    // Assert
    expect(passwordInput).toHaveValue('test123456');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockregister = vi.fn();
    render(<RegisterInput onRegister={mockregister} />);
    const nameInput = await screen.getByPlaceholderText('Enter your name');
    await userEvent.type(nameInput, 'testname123');
    const emailInput = await screen.getByPlaceholderText('Enter your email');
    await userEvent.type(emailInput, 'testemail@example.com');
    const passwordInput = await screen.getByPlaceholderText(
      'Enter your password'
    );
    await userEvent.type(passwordInput, 'test123456');
    const registerButton = await screen.getByRole('button', {
      name: 'Register',
    });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockregister).toBeCalledWith({
      name: 'testname123',
      email: 'testemail@example.com',
      password: 'test123456',
    });
  });
});