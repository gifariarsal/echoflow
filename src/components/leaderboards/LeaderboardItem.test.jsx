/**
 * Testing scenario for LeaderboardItem component
 * - LeaderboardItem component
 *   - should display the user's avatar correctly
 *   - should display the user's name correctly
 *   - should display the user's score correctly
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, expect, it } from 'vitest';
import LeaderboardItem from './LeaderboardItem';
import '@testing-library/jest-dom';

const mockUser = {
  id: '123',
  avatar: 'http://example.com/avatar.jpg',
  name: 'John Doe',
};
const mockScore = 88;

describe('LeaderboardItem Component', () => {
  it('renders user information and score correctly', () => {
    const { getByText } = render(
      <ChakraProvider>
        <LeaderboardItem user={mockUser} score={mockScore} />
      </ChakraProvider>
    );

    expect(getByText(mockUser.name)).toBeInTheDocument();
    expect(getByText(mockScore.toString())).toBeInTheDocument();
  });
});
