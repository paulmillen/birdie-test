import { Box, CircularProgress } from '@mui/material'

export const PageLoadingSpinner: React.FC = () => (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
    </Box>
)