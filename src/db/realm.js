import Realm from 'realm';
import {ConversionHistorySchema} from './schemas';

const getRealm = async () => {
  return await Realm.open({
    schema: [ConversionHistorySchema],
    schemaVersion: 2,
  });
};

export default getRealm;
