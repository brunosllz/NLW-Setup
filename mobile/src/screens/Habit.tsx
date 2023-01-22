import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import { ScrollView, View, Text } from 'react-native'
import { BackButton } from '../components/BackButton'
import { CheckBox } from '../components/CheckBox'
import { ProgressBar } from '../components/ProgressBar'

interface Params {
  date: string
}

export function Habit() {
  const route = useRoute()
  const { date } = route.params as Params

  const parseDate = dayjs(date)
  const dayOfWeek = parseDate.format('dddd')
  const dayAndMonth = parseDate.format('DD/MM')

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={30} />

        <View className="mt-6">
          <CheckBox title="Beber 2l de agua" checked={false} />
        </View>
      </ScrollView>
    </View>
  )
}
