export interface ArrestRecord {
  id: string
  report_offense_number: string
  arrest_date_time: string
  race: string
  sex: string
  age: string
  name: string
  offense_name: string
  offense_citation: string
  location_of_arrest: string
  arrest_officer: string
  court_information: string
  release_date_time: string
  release_how: string
  source_pdf: string
}

export interface ProcessedArrestRecord extends ArrestRecord {
  releaseMethod: string | null
  bail: number | null
}

export interface Metadata {
  lastUpdated: string
  recordCount: number
  dateRange: {
    from: string
    to: string
  }
}
