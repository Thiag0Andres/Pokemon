import Toast from 'react-native-simple-toast';

export default {
  show: (message: string) => Toast.show(message, Toast.LONG),
};
