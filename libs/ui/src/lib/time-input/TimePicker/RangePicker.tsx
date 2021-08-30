import generatePicker from 'antd/lib/date-picker/generatePicker'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
const _DatePicker = generatePicker(dayjsGenerateConfig)

export default _DatePicker.RangePicker
