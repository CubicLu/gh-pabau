import { uniqBy } from 'lodash'
import dayjs from 'dayjs'

const weekList = ['week1', 'week2', 'week3', 'week4', 'week5']

const dayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const statusDataByDayMonth = (range, DataSet, startDate) => {
  switch (range) {
    case 'All records':
      {
        const Final_data = []
        let data = []
        data = [
          ...new Set(DataSet.map((x) => x.dateRange[0].map((y) => y.label))),
        ]
        const max =
          data.find(
            (x: []) => x.length === Math.max(...data.map((el: []) => el.length))
          ) ?? []
        DataSet?.map((record) => {
          const result = []
          max?.map((item) =>
            result.push({
              label: item,
              value: 0,
            })
          )
          if (record.status && record.dateRange[0]) {
            record.dateRange[0].map((key) => {
              const index = result.findIndex((item) => item.label === key.label)
              if (index >= 0) {
                result[index].value += key.value
              }
              return key
            })
            Final_data.push({
              status: record.status,
              chartDataSet: result,
            })
          }
          return Final_data
        })
        return uniqBy(Final_data, 'status')
      }
      break
    case 'This Month':
      {
        const Final_data = []
        DataSet.map((record) => {
          const result = []
          weekList.map((item) =>
            result.push({
              label: item,
              value: 0,
            })
          )
          if (record.status && record.dateRange[0]) {
            record.dateRange[0].map((key) => {
              const date = dayjs(key.label).format('YYYY-MM-DD')
              const diff = dayjs(date).diff(startDate, 'day')
              switch (true) {
                case diff >= 0 && diff <= 6:
                  result[0].value += key.value
                  break
                case diff >= 7 && diff <= 13:
                  result[1].value += key.value
                  break
                case diff >= 14 && diff <= 20:
                  result[2].value += key.value
                  break
                case diff >= 21 && diff <= 27:
                  result[3].value += key.value
                  break
                case diff >= 28:
                  result[4].value += key.value
                  break
              }
              return key
            })
            Final_data.push({
              status: record.status,
              chartDataSet: result,
            })
          }
          return Final_data
        })
        return uniqBy(Final_data, 'status')
      }
      break
    case 'This Week':
      {
        const Final_data = []
        DataSet?.map((record) => {
          const result = []
          dayList?.map((item) =>
            result.push({
              label: item,
              value: 0,
            })
          )
          if (record.status && record.dateRange[0]) {
            record.dateRange[0].map((key) => {
              const index = result.findIndex((item) => item.label === key.label)
              if (index >= 0) {
                result[index].value += key.value
              }
              return key
            })
            Final_data.push({
              status: record.status,
              chartDataSet: result,
            })
          }
          return Final_data
        })
        return uniqBy(Final_data, 'status')
      }
      break
    case 'This Year':
      {
        const Final_data = []
        DataSet?.map((record) => {
          const result = []
          monthList?.map((item) =>
            result.push({
              label: item,
              value: 0,
            })
          )
          if (record.status && record.dateRange[0]) {
            record.dateRange[0].map((key) => {
              const index = result.findIndex((item) => item.label === key.label)
              if (index >= 0) {
                result[index].value += key.value
              }
              return key
            })
            Final_data.push({
              status: record.status,
              chartDataSet: result,
            })
          }
          return Final_data
        })
        return uniqBy(Final_data, 'status')
      }
      break
  }
}
