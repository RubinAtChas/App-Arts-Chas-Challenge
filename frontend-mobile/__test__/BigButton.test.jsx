import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BigButton from '../components/BigButton';

test('renderar knappen med korrekt titel och svarar på tryck', () => {
  const onPressMock = jest.fn();

  const { getByText } = render(<BigButton title="Tryck här" onPress={onPressMock} />);

  const button = getByText('Tryck här');
  expect(button).toBeTruthy();

  fireEvent.press(button);
  expect(onPressMock).toHaveBeenCalledTimes(1);
});
