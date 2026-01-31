import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export default function Loading() {
  return (
    <Box
      sx={{
        padding: 8,
        textAlign: 'center',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress size={48} sx={{ marginBottom: 3 }} />

      <Typography color="text.secondary">Loading arrest records...</Typography>
    </Box>
  )
}
