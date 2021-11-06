import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleProp, ViewStyle, ColorValue, StyleSheet } from 'react-native';
import { ToastInstance } from './ToastWrapper';
import Modal, {ModalProps} from 'react-native-modal'

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
  backdropColor = 'rgba(0,0,0,0.3)',
  backgroundColor,
  borderRadius = 20,
  onSwipeComplete,
  ...rest
}: BottomSheetModalProps) {
  const padding = defaultPadding ? 16 : 0
  // if we have an onSwipeComplete callback, we'll assume swipe down is enabled
  const swipeDownEnabled = Boolean(onSwipeComplete)
  // to have the modal animate as the swipe happens, native animations don't currently work, so disable them
  // https://github.com/react-native-modal/react-native-modal/issues/163#issuecomment-409760695
  const useNativeAnimations = !swipeDownEnabled

  return (
    <Modal
      useNativeDriver={useNativeAnimations}
      // if `useNativeDriver` is true, `hideModalContentWhileAnimating` needs to also be true
      // https://github.com/react-native-modal/react-native-modal/issues/92
      hideModalContentWhileAnimating={useNativeAnimations}
      // avoids flashing during animations on the backdrop
      useNativeDriverForBackdrop
      // prevent backdrop flickering on close for iOS devices (sim seems fine)
      // this doesn't affect the animation in any way.
      // https://github.com/react-native-modal/react-native-modal/issues/268
      backdropTransitionOutTiming={0}
      isVisible={isVisible}
      style={[bottomSheetModalStyles.modal, style]}
      backdropColor={backdropColor}
      // set the opacity on the colour itself
      backdropOpacity={1}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={swipeDownEnabled ? ['down'] : undefined}
      onSwipeComplete={onSwipeComplete}
      {...rest}>
      <SafeAreaView
        edges={['bottom']}
        style={{
          backgroundColor: 'white',
          borderTopRightRadius: borderRadius,
          borderTopLeftRadius: borderRadius,
        }}>
        <View style={[{padding}, contentContainerStyle]}>{children}</View>
        <ToastInstance />
      </SafeAreaView>
    </Modal>
  )
}

const bottomSheetModalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    // Modal by default has margin applied to inset
    margin: 0,
  },
})

export default BottomSheetModal
