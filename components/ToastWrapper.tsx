import React, {ReactNode} from 'react'
import {Pressable, StyleSheet, View, Dimensions, Text} from 'react-native'
import Toast, {BaseToastProps, ToastProps, ToastShowParams} from 'react-native-toast-message'
import { MaterialIcons } from '@expo/vector-icons'

const {width: windowWidth} = Dimensions.get('window')

export type ToastType = 'default' | 'error'

type ToastConfig = Record<ToastType, (props: BaseToastProps) => ReactNode>

export const toastConfig: ToastConfig = {
  error: props => <ToastComponent type="error" {...props} />,
  default: props => <ToastComponent type="default" {...props} />,
}

type Props = BaseToastProps & {type?: ToastType}

/**
 * This component wouldn't be used directly, but instead is used by the toastConfig,
 * which is used by the underlying Toast library.
 */
function ToastComponent({
  type = 'error',
  text1NumberOfLines,
  text1,
  text1Style,
  text2,
  text2NumberOfLines,
  text2Style,
  onPress,
}: Props) {
  const isErrorType = type === 'error'
  const backgroundColor = isErrorType ? 'red' : 'gray'

  return (
    <Pressable onPress={onPress} style={styles.toastTouchable}>
      <View style={[styles.toastContainer, {backgroundColor}]}>
        <View style={styles.textContainer}>
          <Text
            style={[
              {
                color:'white',
              },
              text1Style,
            ]}
            numberOfLines={text1NumberOfLines}>
            {text1}
          </Text>
          {Boolean(text2) && (
            <Text
              style={[
                styles.text2,
                {
                  color: 'rgba(255,255,255,0.68)',
                },
                text2Style,
              ]}
              numberOfLines={text2NumberOfLines}>
              {text2}
            </Text>
          )}
        </View>
        <Pressable onPress={() => Toast.hide()} style={styles.closeButton}>
          <View style={styles.closeButtonContainer}>
            <MaterialIcons name="close" color={'white'} size={16} style={styles.closeIcon} />
          </View>
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  toastTouchable: {
    // the lib uses absolute centered components, so flex doesn't work
    width: windowWidth - 12 * 2,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  toastContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 5,
    paddingVertical: 12,
    minHeight: 50,
    borderRadius: 16,
    overflow: 'hidden',
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  text2: {
    marginTop: 4,
  },

  closeButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  closeButtonContainer: {
    height: 30,
    width: 30,
    justifyContent: 'center',
  },
  closeIcon: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})

export type ToastWrapperShowParams = ToastShowParams & {
  // the length of time to delay showing the toast.
  // typically you'd want to set this to some value if you're dismissing a
  // full screen modal at the same time as a toast is being shown so the
  // toast shows above the tab bar.
  delay?: number
  type?: ToastType
}

/**
 * Uses the standard ToastShowOptions plus these additional ones outlined.
 * To see the default standard Toast options, see Toast in ToastContainer.
 *
 * @param options.delay whether to delay the showing by the number of ms provided
 * @param options.type default is 'default' type
 */
const show = ({delay, type = 'default', ...rest}: ToastWrapperShowParams) => {
  if (delay) {
    setTimeout(() => {
      Toast.show({type, ...rest})
    }, delay)
  } else {
    Toast.show({type, ...rest})
  }
}

const hide = () => {
  Toast.hide()
}

const ToastWrapper = {
  show,
  hide,
}

export function ToastInstance(props: ToastProps) {
  return (
    <Toast
      type="default"
      autoHide
      position="bottom"
      visibilityTime={3500}
      config={toastConfig}
      keyboardOffset={12}
      {...props}
    />
  )
}

export default ToastWrapper
