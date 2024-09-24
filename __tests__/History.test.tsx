import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import HistoryScreen from '../src/screens/History';
import {getConversionHistory} from '../src/db/realmActions';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('../src/db/realmActions', () => ({
  getConversionHistory: jest.fn(),
}));

describe('HistoryScreen Component', () => {
  beforeEach(() => {
    (getConversionHistory as jest.Mock).mockResolvedValue([]);
  });

  const renderWithNavigation = (component: JSX.Element) => {
    return render(
      <NavigationContainer>
        {component}
      </NavigationContainer>
    );
  };


  it('should display "No Records" message when there is no conversion history', async () => {
    const {getByText} = renderWithNavigation(<HistoryScreen />);

    const noRecordMessage = await waitFor(() => getByText('No Records'));
    expect(noRecordMessage).toBeTruthy();
  });

  it('should render conversion history when data is available', async () => {
    (getConversionHistory as jest.Mock).mockResolvedValue([
      {id: 1, amount: 100, fromCurrency: 'USD'},
    ]);

    const {getByText} = renderWithNavigation(<HistoryScreen />);

    const historyItem = await waitFor(() => getByText('$ 100'));
    expect(historyItem).toBeTruthy();
    expect(getByText('USD')).toBeTruthy();
  });
});
