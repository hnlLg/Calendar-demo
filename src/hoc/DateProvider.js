import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useCalendarState from "../hooks/useCalendarState";


const DateProvider = ({ children }) => {
  const { locale } = useCalendarState();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      {children}
    </LocalizationProvider>
  );
};

export default DateProvider;
