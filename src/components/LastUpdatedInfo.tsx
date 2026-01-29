import Box from '@mui/material/Box'
import Typography, { type TypographyProps } from '@mui/material/Typography'
import type { Metadata } from '@/lib/types'

interface LastUpdatedInfoProps extends TypographyProps {
  metadata: Metadata
}

export function LastUpdatedInfo({ metadata, sx, ...props }: LastUpdatedInfoProps) {
  const lastUpdated = new Date(metadata.lastUpdated)

  return (
    <Typography
      sx={{
        color: 'text.secondary',
        fontSize: { xs: 11, sm: 12 },
        ...sx
      }}
      variant="body2"
      {...props}
    >
      <Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}>
        Last updated: {lastUpdated.toLocaleDateString('en-US', { timeZone: 'Pacific/Honolulu' })} at{' '}
        {lastUpdated.toLocaleTimeString('en-US', {
          timeZone: 'Pacific/Honolulu',
          timeZoneName: 'short'
        })}
      </Box>
      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, mx: 0.5 }}>
        •
      </Box>
      <Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}>
        {metadata.recordCount.toLocaleString()} records ({metadata.dateRange.from} to {metadata.dateRange.to})
      </Box>
    </Typography>
  )
}
