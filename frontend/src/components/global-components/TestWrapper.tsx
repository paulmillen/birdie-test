import { QueryClient, QueryClientProvider } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb'

export const TestWrapper: React.FC = ({ children }) => (
  <LocalizationProvider adapterLocale={'en-gb'} dateAdapter={AdapterDayjs}>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </LocalizationProvider>
)