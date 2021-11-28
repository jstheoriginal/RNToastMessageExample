import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ToastInstance } from '../components/ToastWrapper';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import ToastMessagesDemo from '../components/ToastMessagesDemo';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Modal1'>
}

export default function Modal1Screen({navigation}: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Demo Inside Modal 1',
      headerRight: () => <MaterialIcons name="close" onPress={navigation.goBack} size={22} />
    })
  })
  return (
    <View style={styles.container}>
      <ToastMessagesDemo />
      <ToastInstance setRef={Toast.setModalRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
