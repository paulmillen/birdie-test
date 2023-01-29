import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en-gb';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

export const TestWrapper: React.FC = ({ children }) => (
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <LocalizationProvider adapterLocale={'en-gb'} dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </QueryClientProvider>
  </BrowserRouter>
)