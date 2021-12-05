import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ToastInstance } from '../components/ToastWrapper';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Modal2'>
}

export default function Modal2Screen({navigation}: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <MaterialIcons name="close" onPress={navigation.goBack} size={22} />
    })
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal 2</Text>
      <ToastInstance />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
