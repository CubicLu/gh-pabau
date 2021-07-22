import generatePicker from 'antd/lib/date-picker/generatePicker'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import 'antd/lib/date-picker/style/index'
const _DatePicker = generatePicker(dayjsGenerateConfig)

export default _DatePicker.RangePicker
