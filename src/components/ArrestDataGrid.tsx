'use client'

import { DataGridPro, type GridColDef } from '@mui/x-data-grid-pro'
import { useColorMode } from '@/app/providers'
import { Footer } from '@/components/Footer'
import { Toolbar } from '@/components/Toolbar'
import type { ArrestRecord, Metadata } from '@/lib/types'

function parseArrestDateTime(dateTimeString: string): number {
  if (!dateTimeString) return 0
  const [datePart, timePart] = dateTimeString.split(' ')
  const [month, day, year] = datePart.split('/').map(Number)
  const [hours, minutes] = (timePart || '00:00').split(':').map(Number)
  return new Date(year, month - 1, day, hours, minutes).getTime()
}

const columns: GridColDef<ArrestRecord>[] = [
  {
    field: 'arrest_date_time',
    headerName: 'Arrest Date/Time',
    width: 190,
    sortComparator: (value1, value2) => parseArrestDateTime(value1) - parseArrestDateTime(value2)
  },
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'race',
    headerName: 'Race',
    width: 110,
    valueFormatter: (value: string) => value?.replace(/,/g, ', ') || ''
  },
  { field: 'sex', headerName: 'Sex', width: 100 },
  { field: 'age', headerName: 'Age', width: 100 },
  { field: 'offense_name', headerName: 'Offense', width: 190 },
  { field: 'offense_citation', headerName: 'Citation', width: 130 },
  { field: 'location_of_arrest', headerName: 'Location', width: 160 },
  { field: 'arrest_officer', headerName: 'Officer', width: 120 },
  { field: 'court_information', headerName: 'Court Info', width: 170 },
  {
    field: 'release_date_time',
    headerName: 'Released',
    width: 140,
    sortComparator: (value1, value2) => parseArrestDateTime(value1) - parseArrestDateTime(value2)
  },
  { field: 'release_how', headerName: 'Release Method', width: 160 },
  { field: 'report_offense_number', headerName: 'Report #', width: 130 }
]

interface ArrestDataGridProps {
  data: ArrestRecord[]
  metadata: Metadata
}

export function ArrestDataGrid({ data, metadata }: ArrestDataGridProps) {
  const { mode, toggleColorMode } = useColorMode()

  const handleSetPaletteMode = (newMode: 'light' | 'dark') => {
    if (newMode !== mode) {
      toggleColorMode()
    }
  }

  return (
    <DataGridPro
      autosizeOptions={{ includeHeaders: true, includeOutliers: true, outliersFactor: 1 }}
      columns={columns}
      density="compact"
      disableMultipleRowSelection
      disableRowSelectionOnClick
      getRowId={row => row.id}
      ignoreDiacritics
      initialState={{
        pinnedColumns: { left: ['name'] },
        sorting: {
          sortModel: [{ field: 'arrest_date_time', sort: 'desc' }]
        }
      }}
      rows={data}
      slotProps={{
        columnsManagement: { disableShowHideToggle: true },
        toolbar: { showQuickFilter: true }
      }}
      slots={{
        footer: Footer,
        toolbar: props => (
          <Toolbar {...props} metadata={metadata} paletteMode={mode} setPaletteMode={handleSetPaletteMode} />
        )
      }}
      sx={{
        '& .MuiDataGrid-cell': {
          fontSize: '0.875rem'
        }
      }}
    />
  )
}
