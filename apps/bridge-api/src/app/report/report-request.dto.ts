export interface ReportInputDto {
  id: string
  start_date: string
  end_date: string
  location_ids?: Array<number>
  staff_ids?: Array<number>
  columns?: Array<string>
}

export interface TrendReportInputDto {
  start_date: string
  end_date: string
  location_ids?: Array<number>
  type: string
  columns: Array<string>
}
