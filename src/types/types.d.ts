declare module '@walletconnect/modal-react-native';
declare module 'react-native-fetch-blob';
declare module 'react-native-vector-icons/*';

interface Audit {
  projectID: string | undefined;
  plotID: string | undefined;
  latitude: string | undefined;
  longitude: string | undefined;
  AuditID: string | undefined;
}

type Profile = {
  name: string;
  email: string;
  wallet_address: string;
  createdAt: string;
};

type notification = {
  category: string;
  message: string;
  createdAt: string;
};
