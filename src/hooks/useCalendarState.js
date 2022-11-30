import { useContext } from "react";
import CalendarContext from "../context/CalendarContext";

const useCalendarState = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('Wrap inside the provider, please');
  }
  return context;
};

export default useCalendarState;
