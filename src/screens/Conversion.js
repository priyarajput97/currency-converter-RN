import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {EXCHANGE_RATES} from '../utils/constants.js';
import {theme} from '../utils/theme.js';
import ConversionsList from '../components/ConversionsList.js';

const ConversionScreen = () => {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [calculate, setCalculate] = useState(true);

  const currencyOptions = Object.keys(EXCHANGE_RATES);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={text => setAmount(text?.trim())}
          keyboardType="numeric"
          placeholder="Enter amount"
        />
        <Picker
          testID="currency-picker"
          selectedValue={selectedCurrency}
          style={styles.picker}
          dropdownIconColor={theme.dark}
          onValueChange={itemValue => setSelectedCurrency(itemValue)}>
          {currencyOptions.map(currency => (
            <Picker.Item
              key={currency}
              label={EXCHANGE_RATES[currency].shortForm}
              value={currency}
              testID={`currency-${currency}`}
            />
          ))}
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.convertButton}
        onPress={() => setCalculate(true)}>
        <Text style={styles.convertButtonText}>Convert</Text>
      </TouchableOpacity>

      <ConversionsList
        amount={amount}
        selectedCurrency={selectedCurrency}
        calculate={calculate}
        setCalculate={setCalculate}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.dark,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  input: {
    width: '70%',
    height: '100%',
    textAlign: 'left',
    fontSize: 18,
    color: theme.black,
    backgroundColor: theme.white,
    marginBottom: 10,
  },
  picker: {
    height: '100%',
    width: '30%',
    marginBottom: 10,
    color: theme.black,
  },
  convertButton: {
    width: '100%',
    padding: 15,
    backgroundColor: theme.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  convertButtonText: {
    fontSize: 18,
    color: theme.white,
  },
});

export default ConversionScreen;
