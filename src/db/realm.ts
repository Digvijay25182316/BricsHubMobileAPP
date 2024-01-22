import Realm, {ObjectSchema} from 'realm';

class Person extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  email!: string;
  address!: string;

  static schema: ObjectSchema = {
    name: 'Person',
    properties: {
      _id: 'Objectid',
    },
  };
}
