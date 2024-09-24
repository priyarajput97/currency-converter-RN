import {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getConversionHistory} from '../db/realmActions';
import {theme} from '../utils/theme';
import {EXCHANGE_RATES} from '../utils/constants';
import {useFocusEffect} from '@react-navigation/native';
import ConversionsList from '../components/ConversionsList';

const HistoryScreen = () => {
  const [conversions, setConversions] = useState([]);
  const [calculate, setCalculate] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getConversionsFromDb();
      setCalculate(false)
    }, []),
  );

  const getConversionsFromDb = async () => {
    const history = await getConversionHistory();
    setConversions(history);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {conversions?.length > 0 ? (
        conversions.map(({id, amount, fromCurrency}) => (
          <View key={id}>
            <TouchableOpacity
              style={styles.historyContainer}
              onPress={() => setCalculate(id === calculate ? false : id)}>
              <Text style={styles.historyText}>
                {EXCHANGE_RATES[fromCurrency]?.symbol} {amount}
              </Text>
              <Text style={styles.historyText}>{fromCurrency}</Text>
            </TouchableOpacity>
            {id === calculate && (
              <View style={styles.historyConversionContainer}>
                <ConversionsList
                  amount={amount}
                  selectedCurrency={fromCurrency}
                  calculate={calculate}
                  setCalculate={setCalculate}
                  isHistory={true}
                />
              </View>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noRecordText}>No Records</Text>
      )}
    </ScrollView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: theme.white,
    padding: 20,
  },
  historyContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: theme.dark,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyText: {
    fontSize: 20,
    color: theme.dark,
    fontWeight: '500',
    textAlign: 'center',
  },
  historyConversionContainer: {
    padding: 10,
    borderColor: theme.dark,
    borderWidth: 1,
    borderRadius: 10,
  },
  noRecordText: {
    color: theme.black,
    fontSize: 20,
  },
});
