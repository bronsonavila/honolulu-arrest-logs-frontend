'use client'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import LightModeIcon from '@mui/icons-material/LightMode'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  useGridApiContext
} from '@mui/x-data-grid-pro'
import { LastUpdatedInfo } from '@/components/LastUpdatedInfo'
import type { Metadata } from '@/lib/types'

interface ToolbarProps {
  metadata: Metadata
  paletteMode: 'light' | 'dark'
  setPaletteMode: (mode: 'light' | 'dark') => void
}

export function Toolbar({ metadata, paletteMode, setPaletteMode }: ToolbarProps) {
  const apiRef = useGridApiContext()

  const handlePaletteModeToggle = () => setPaletteMode(paletteMode === 'light' ? 'dark' : 'light')

  const handleExportCsv = () => {
    apiRef.current.exportDataAsCsv({
      getRowsToExport: () => apiRef.current.getAllRowIds()
    })
  }

  return (
    <GridToolbarContainer sx={{ pb: 0.5 }}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Box>
          <Typography sx={{ fontSize: { xs: 18, sm: 20 }, pl: 0.75 }} variant="h6">
            Honolulu Arrest Logs
          </Typography>

          <LastUpdatedInfo
            metadata={metadata}
            sx={{
              pl: 0.75,
              display: { xs: 'none', sm: 'block' }
            }}
          />
        </Box>

        <Box sx={{ alignItems: 'center', display: 'flex', gap: 0.5, pr: 0.25 }}>
          <DarkModeIcon
            sx={{ fontSize: { xs: 16, sm: 20 }, opacity: paletteMode === 'dark' ? 1 : 0.25 }}
          />

          <Switch
            checked={paletteMode === 'light'}
            inputProps={{
              'aria-label': `Switch to ${paletteMode === 'light' ? 'dark' : 'light'} mode`
            }}
            onChange={handlePaletteModeToggle}
            size="small"
          />

          <LightModeIcon
            sx={{ fontSize: { xs: 16, sm: 20 }, opacity: paletteMode === 'light' ? 1 : 0.25 }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'space-between',
          pl: 0.25,
          width: '100%'
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <GridToolbarColumnsButton />

          <GridToolbarFilterButton />

          <Button onClick={handleExportCsv} size="small" startIcon={<FileDownloadIcon />}>
            Export
          </Button>
        </Box>

        <GridToolbarQuickFilter
          quickFilterParser={(searchInput: string) =>
            searchInput
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
          sx={{
            width: { xs: 200, sm: 300, md: 350, lg: 400 },
            '& .MuiInputBase-root': { fontSize: { xs: 14, md: 16 } }
          }}
        />
      </Box>
    </GridToolbarContainer>
  )
}
