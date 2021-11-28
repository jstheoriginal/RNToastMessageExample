import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Alert, Button, ScrollView, StyleSheet, Switch, Text, View, Pressable } from 'react-native';
import BottomSheetModal from './BottomSheetModal';
import LevelsToast, {ToastWrapperShowParams} from './ToastWrapper'

function ToastMessagesDemo() {
  const navigation = useNavigation()
  const [autoHide, setAutoHide] = React.useState(false)
  const [position, setPosition] = React.useState<'top' | 'bottom'>('bottom')
  const [bottomModalIsVisible, setBottomModalIsVisible] = React.useState(false)

  const commonProps: Partial<ToastWrapperShowParams> = {
    autoHide,
    position,
  }

  const dismissBottomModal = () => setBottomModalIsVisible(false)

  return (
    <ScrollView>
      <View style={{padding: 16}}>
        <View style={styles.toggle}>
          <Text>Automatically hide after 3.5 seconds</Text>
          <Switch value={autoHide} onValueChange={() => setAutoHide(prev => !prev)} />
        </View>
        <View style={styles.toggle}>
          <Text>Show at top of screen</Text>
          <Switch
            value={position === 'top'}
            onValueChange={() => setPosition(prev => (prev === 'top' ? 'bottom' : 'top'))}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Show 1-line toast message"
            onPress={() => LevelsToast.show({...commonProps, text1: 'This toast has one line.'})}
          />
          <Button
            title="Show toast message after 1s delay"
            onPress={() => LevelsToast.show({...commonProps, delay: 1000, text1: 'This toast waited 1 second to show.'})}
          />
          <Button
            title="Show toast message with subtitle"
            onPress={() =>
              LevelsToast.show({
                ...commonProps,
                text1: 'Toasts can have both a title and subtitle. This is the title.',
                text2:
                  'This is the subtitle. Something like "Tap to go to your profile" could indicate what tapping on the toast would do.',
              })
            }
          />
          <Button
            title="Show toast message with an onPress"
            onPress={() =>
              LevelsToast.show({
                ...commonProps,
                text1: 'This toast has an on press action.',
                text2: 'Tap to show an alert.',
                onPress: () => Alert.alert('Whoa'),
              })
            }
          />
          <Button
            title="Show an error toast message"
            onPress={() =>
              LevelsToast.show({
                ...commonProps,
                type: 'error',
                text1: 'Something had an error. 😱',
                text2: 'Tap to retry.',
                onPress: () => Alert.alert("Pretend like I'm retrying"),
              })
            }
          />
          <Button title="Hide toast message" 
          onPress={() => LevelsToast.hide()} />
          <Button
            title="Show a toast message over a modal"
            onPress={() => {
              setBottomModalIsVisible(true)
              LevelsToast.show({
                delay: 1000,
                ...commonProps,
                text1: 'I show over a modally-presented native stack screen',
              })
            }}
          />
          <Button
            title="Show Modal2 screen & toast message"
            onPress={() => {
              navigation.navigate('Modal2')
              LevelsToast.show({
                delay: 1000,
                ...commonProps,
                text1: 'I show over a 2nd modally-presented native stack screen',
              })
            }}
          />
        </View>
      </View>

      <BottomSheetModal
        isVisible={bottomModalIsVisible}
        defaultPadding>
          <Button onPress={dismissBottomModal} title="Close" />
        <Text
          style={styles.modalMessage}>
          This modal will show, and the toast will still show over top! This is because BottomSheetModal also has a Toast instance within its Modal component, and the lib knows when to show a toast in a modal instance instead of the main app instance in ToastContainer. 🙌
        </Text>
      </BottomSheetModal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginVertical: 16,
  },
  button: {
    marginVertical: 8,
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalMessage: {
    marginTop: 10,
    marginBottom: 70,
  },
})

export default ToastMessagesDemo
