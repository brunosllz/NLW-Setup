import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'

interface CheckBoxProps extends TouchableOpacityProps {
  title: string
  checked?: boolean
}

export function CheckBox({ checked = false, title, ...rest }: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-gray-900 rounded-lg" />
      )}

      <Text className="text-white text-base ml-3">{title}</Text>
    </TouchableOpacity>
  )
}
