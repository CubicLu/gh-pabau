import { weekList, dayList, monthList } from './mock'
import { groupBy, uniqBy } from 'lodash'
import dayjs from 'dayjs'

export const groupByDateRange = (data, dataRange) => {
  switch (dataRange) {
    case 'All records': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('year').format('YYYY')
      )
      return data1
    }
    case 'This Year': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('month').format('MMM')
      )
      return data1
    }
    case 'Last Year': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('month').format('MMM')
      )
      return data1
    }
    case 'This Month': {
      const data1 = groupBy(data, (item) => dayjs(`${item}`).startOf('week'))
      return data1
    }
    case 'Last Month': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('week').format('YYYY-MM-DD')
      )
      return data1
    }
    case 'This Week': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd')
      )

      return data1
    }
    case 'Last Week': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd')
      )
      return data1
    }
    case 'Today': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd')
      )
      return data1
    }
    case 'Yesterday': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd')
      )
      return data1
    }
  }
}

export const statusDataByDayMonth = (range, DataSet, startDate) => {
  switch (range) {
    case 'All records':
      {
        const Final_data = []
        let data = []
        data = [
          ...new Set(
            DataSet.map((x) => Object.keys(x.dateRange).map((y) => y))
          ),
        ]
        const max =
          data.find(
            (x: []) => x.length === Math.max(...data.map((el: []) => el.length))
          ) ?? []
        DataSet.map((record) => {
          const result = []
          max?.map((item) =>
            result.push({
              label: item,
              value: 0,
            })
          )

          if (record.status && record.dateRange) {
            Object.keys(record.dateRange).map((key) => {
              const index = result.findIndex((item) => item.label === key)
              if (index >= 0) {
                result[index].value = record.dateRange[key].length
              }
              return key
            })
            Final_data.push({
              status: record.status,
              data: result,
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
          weekList?.map((item) =>
            result.push({
              label: item.label,
              value: 0,
            })
          )
          if (record.status && record.dateRange) {
            Object.keys(record.dateRange).map((key) => {
              const diff = dayjs(key).diff(startDate, 'day')
              switch (true) {
                case diff >= 0 && diff <= 6:
                  result[0].value = record.dateRange[key].length
                  break
                case diff >= 7 && diff <= 13:
                  result[1].value = record.dateRange[key].length
                  break
                case diff >= 14 && diff <= 20:
                  result[2].value = record.dateRange[key].length
                  break
                case diff >= 21 && diff <= 27:
                  result[3].value = record.dateRange[key].length
                  break
                case diff >= 28:
                  result[4].value = record.dateRange[key].length
                  break
              }
              return key
            })
            Final_data.push({
              status: record.status,
              data: result,
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
        DataSet.map((record) => {
          const result = []
          dayList?.map((item) =>
            result.push({
              label: item.label,
              value: 0,
            })
          )
          if (record.status && record.dateRange) {
            Object.keys(record.dateRange).map((key) => {
              const index = result.findIndex((item) => item.label === key)
              if (index >= 0) {
                result[index].value = record.dateRange[key].length
              }
              return key
            })
            Final_data.push({
              status: record.status,
              data: result,
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
        DataSet.map((record) => {
          const result = []
          monthList?.map((item) =>
            result.push({
              label: item.label,
              value: 0,
            })
          )
          if (record.status && record.dateRange) {
            Object.keys(record.dateRange).map((key) => {
              const index = result.findIndex((item) => item.label === key)
              if (index >= 0) {
                result[index].value = record.dateRange[key].length
              }
              return key
            })
            Final_data.push({
              status: record.status,
              data: result,
            })
          }
          return Final_data
        })
        return uniqBy(Final_data, 'status')
      }
      break
  }
}
