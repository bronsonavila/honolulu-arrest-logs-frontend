'use client'

import { Tooltip } from '@mui/material'
import { DataGridPro, type GridColDef } from '@mui/x-data-grid-pro'
import { useColorMode } from '@/app/providers'
import { Footer } from '@/components/Footer'
import { Toolbar } from '@/components/Toolbar'
import type { Metadata, ProcessedArrestRecord } from '@/lib/types'

function parseArrestDateTime(dateTimeString: string): number {
  if (!dateTimeString) return 0
  const [datePart, timePart] = dateTimeString.split(' ')
  const [month, day, year] = datePart.split('/').map(Number)
  const [hours, minutes] = (timePart || '00:00').split(':').map(Number)
  return new Date(year, month - 1, day, hours, minutes).getTime()
}

const releaseMethodDescriptions: Record<string, string> = {
  RBL: 'Released; bail and/or bond posted.',
  RNC: 'Released with no charge; no formal charges filed.',
  RPC: 'Released; prosecution declined. Used for Family Court and Circuit Court cases reviewed by prosecutors before being sent for a court hearing.',
  RPI: 'Released pending further investigation.',
  ROR: 'Released on own recognizance.',
  TOT: 'Turned over or transferred to another agency.',
  ISC: 'Intake Service Center; refers to detainees who are transferred to OCCC after their court appearance.',
  DCT: 'Taken to District Court for arraignment.',
  CCT: 'Taken to Circuit Court for arraignment.',
  FCT: 'Taken to Family Court.',
  PVC: 'Prosecution via complaint; the person is being processed for identification purposes, and court proceedings are complete.'
}

const columns: GridColDef<ProcessedArrestRecord>[] = [
  {
    field: 'arrest_date_time',
    headerName: 'Arrest Date/Time',
    width: 190,
    sortComparator: (value1, value2) => parseArrestDateTime(value1) - parseArrestDateTime(value2)
  },
  { field: 'name', headerName: 'Name', width: 140 },
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
  {
    field: 'releaseMethod',
    headerName: 'Release Method',
    width: 180,
    renderCell: params => {
      const value = params.value

      if (!value) return null

      const code = value.slice(0, 3).toUpperCase()
      const description = releaseMethodDescriptions[code]

      if (!description) return value

      return (
        <Tooltip title={description} placement="top">
          <span>{value}</span>
        </Tooltip>
      )
    }
  },
  {
    field: 'bail',
    headerName: 'Bail',
    width: 100,
    type: 'number'
  },
  { field: 'report_offense_number', headerName: 'Report #', width: 130 }
]

interface ArrestDataGridProps {
  data: ProcessedArrestRecord[]
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
        footer: props => <Footer {...props} metadata={metadata} />,
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
