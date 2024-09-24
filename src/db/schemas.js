export const ConversionHistorySchema = {
  name: 'ConversionHistory',
  properties: {
    id: 'int',
    amount: 'string',
    fromCurrency: 'string',
    timestamp: 'date',
  },
  primaryKey: 'id',
};
