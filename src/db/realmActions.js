import getRealm from './realm';

export const getConversionHistory = async () => {
  const realm = await getRealm();
  const history = realm.objects('ConversionHistory');
  return history.sorted('timestamp', true);
};

export const addConversionToHistory = async (amount, fromCurrency) => {
  const realm = await getRealm();

  realm.write(() => {
    realm.create('ConversionHistory', {
      id: Date.now(),
      amount,
      fromCurrency,
      timestamp: new Date(),
    });
  });
};
