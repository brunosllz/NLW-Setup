import { View, Text, ScrollView, Alert } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

import { HabitDay, DAY_SIZE } from '../components/HabitDay'
import { Header } from '../components/Header'
import { useCallback, useState } from 'react'
import { api } from '../lib/axios'
import { Loading } from '../components/Loading'
import dayjs from 'dayjs'

interface Summary {
  id: string
  date: string
  amount: number
  completed: number
}

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const dateFromYearStart = generateDatesFromYearBeginning()
const minimumSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSizes - dateFromYearStart.length

export function Home() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<Summary[] | null>(null)

  const { navigate } = useNavigation()

  async function fetchData() {
    try {
      setLoading(true)

      const response = await api.get('/summary')

      setSummary(response.data)
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, []),
  )

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => {
          return (
            <Text
              key={`${weekDay}-${index}`}
              className="text-zinc-500 text-xl font-bold text-center mx-1"
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          )
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary && (
          <View className="flex-row flex-wrap">
            {dateFromYearStart.map((date) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(day.date, 'day')
              })

              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amountCompleted={dayWithHabits?.completed}
                  amountOfHabits={dayWithHabits?.amount}
                  onPress={() =>
                    navigate('habit', { date: date.toISOString() })
                  }
                />
              )
            })}

            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <View
                  key={index}
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
