import React, {useState, useEffect} from 'react';
import {EXCHANGE_RATES} from '../utils/constants';
import {addConversionToHistory} from '../db/realmActions';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '../utils/theme';

const ConversionsList = ({
  amount,
  selectedCurrency,
  calculate,
  setCalculate,
  isHistory = false,
}) => {
  const [conversions, setConversions] = useState([]);
  const currencyOptions = Object.keys(EXCHANGE_RATES);

  useEffect(() => {
    if (calculate) {
      convertCurrency();
      if (!isHistory) setCalculate(false);
    }
  }, [calculate]);

  const convertCurrency = () => {
    const selectedRate = EXCHANGE_RATES[selectedCurrency].rate;

    const conversions = currencyOptions
      .map(currency => {
        if (currency === selectedCurrency) return null;
        const convertedAmount = (
          (amount / selectedRate) *
          EXCHANGE_RATES[currency].rate
        ).toFixed(2);
        return {
          currency,
          symbol: EXCHANGE_RATES[currency].symbol,
          convertedAmount,
        };
      })
      .filter(Boolean);
    setConversions(conversions);

    if (amount && !isHistory) {
      addConversionToHistory(amount, selectedCurrency);
    }
  };

  return (
    <View>
      {conversions.map(({currency, symbol, convertedAmount}) => (
        <View key={currency} style={styles.resultContainer}>
          <Text style={styles.resultText}>{currency}</Text>
          <Text style={styles.resultText}>
            {symbol} {convertedAmount}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ConversionsList;

const styles = StyleSheet.create({
  resultContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: theme.light,
    marginVertical: 5,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultText: {
    fontSize: 20,
    color: theme.dark,
    fontWeight: '500',
    textAlign: 'center',
  },
});
