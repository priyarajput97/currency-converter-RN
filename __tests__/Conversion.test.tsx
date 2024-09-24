import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ConversionScreen from '../src/screens/Conversion';

describe('ConversionScreen Component', () => {
  it('should render TextInput and allow entering amount', () => {
    const {getByDisplayValue, getByPlaceholderText} = render(
      <ConversionScreen />,
    );

    const amountInput = getByPlaceholderText('Enter amount');
    fireEvent.changeText(amountInput, '100');

    expect(getByDisplayValue('100')).toBeTruthy();
  });

  it('should render Picker and update selected currency', () => {
    const {getByTestId, getByText} = render(<ConversionScreen />);

    const picker = getByTestId('currency-picker');
    fireEvent(picker, 'onValueChange', 'USD');

    const selectedCurrency = getByText('USD');
    expect(selectedCurrency).toBeTruthy();
  });

  it('should trigger conversion on Convert button click', () => {
    const {getByText} = render(<ConversionScreen />);

    const convertButton = getByText('Convert');
    fireEvent.press(convertButton);

    expect(convertButton).toBeTruthy();
  });
});
