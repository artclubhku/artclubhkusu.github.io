import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from 'react-admin-firebase';
import firebase from 'firebase';
import firebaseConfig from '../config';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const authProvider = FirebaseAuthProvider(firebaseConfig);
const dataProvider = FirebaseDataProvider(firebaseConfig, {
  logging: false,
  app: firebaseApp,
  persistence: 'local',
  dontAddIdFieldToDoc: true,
  lazyLoading: {
    enabled: true,
  },
  firestoreCostsLogger: {
    enabled: false,
  },
});

export { authProvider, dataProvider }
