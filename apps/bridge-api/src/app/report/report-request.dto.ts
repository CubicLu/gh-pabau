export interface ReportInputDto {
  id: string
  start_date: string
  end_date: string
  location_id?: number
  staffs?: Array<number>
  columns?: Array<string>
}

export interface TrendReportInputDto {
  start_date: string
  end_date: string
  location_id?: number
  type: string
  columns: Array<string>
}
