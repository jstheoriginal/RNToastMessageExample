import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleProp, ViewStyle, ColorValue, StyleSheet, Modal, ModalProps } from 'react-native';
import { ToastInstance } from './ToastWrapper';
import Toast from 'react-native-toast-message';

type BottomSheetModalProps = Partial<
  Omit<ModalProps, 'useNativeDriver' | 'hideModalContentWhileAnimating' | 'swipeDirection' | 'backdropOpacity'>
> & {
  defaultPadding?: boolean
  contentContainerStyle?: StyleProp<ViewStyle>
  lightTheme?: boolean
  borderRadius?: number
  backgroundColor?: ColorValue
  isVisible: boolean
}

function BottomSheetModal({
  defaultPadding,
  lightTheme,
  style,
  contentContainerStyle,
  children,
  isVisible,
  backgroundColor,
  borderRadius = 20,
  ...rest
}: BottomSheetModalProps) {

  return (
    <Modal
      // if `useNativeDriver` is true, `hideModalContentWhileAnimating` needs to also be true
      // https://github.com/react-native-modal/react-native-modal/issues/92
      // avoids flashing during animations on the backdrop
      // prevent backdrop flickering on close for iOS devices (sim seems fine)
      // this doesn't affect the animation in any way.
      // https://github.com/react-native-modal/react-native-modal/issues/268
      visible={isVisible}
      style={[style]}
      transparent
      // set the opacity on the colour itself
      animationType="fade"
      {...rest}>
        <View style={[styles.centeredView, contentContainerStyle]}><View style={styles.modalView}>{children}</View></View>
        <ToastInstance />
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5
  },
})

export default BottomSheetModal
