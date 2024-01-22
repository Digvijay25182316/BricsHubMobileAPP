import {useNavigation} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
const serverEndPoint = 'https://usermanagementbrics.onrender.com/api';

const navigate: any = useNavigation();

export const RegisterUser = async (
  bodydata: {name: string; email: string; wallet_address: string},
  headers: Headers,
) => {
  await fetch(`${serverEndPoint}/register`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodydata),
  })
    .then(data => {
      data.json();
      console.log(data.ok);
    })
    .then((data: any) => {
      data?.message &&
        ToastAndroid.showWithGravity(
          data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
    })
    .catch(err => console.log('this is error : ', err.message || err));
};
