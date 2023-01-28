import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb'

export const TestWrapper: React.FC = ({ children }) => (
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <LocalizationProvider adapterLocale={'en-gb'} dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </QueryClientProvider>
  </BrowserRouter>
)