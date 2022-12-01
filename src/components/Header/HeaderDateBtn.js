import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { format, getMonth, setMonth } from "date-fns";
import useCalendarState from "../../hooks/useCalendarState";
import DateProvider from "../../hoc/DateProvider";
import LocaleArrow from "../common/LocaleArrow";


const HeaderDateBtn = ({ selectedDate, onChange }) => {
  const { locale, navigationPickerProps } = useCalendarState()
  const [open, setOpen] = useState(false);
  const currentMonth = getMonth(selectedDate);

  const toggleDialog = () => setOpen(!open);

  const handleChange = (e) => {
    console.log(e);
    onChange(e || new Date(), "selectedDate");
  };
  const handlePrev = () => {
    const prevMonth = currentMonth - 1;
    onChange(setMonth(selectedDate, prevMonth), "selectedDate");
  };
  const handleNext = () => {
    const nextMonth = currentMonth + 1;
    onChange(setMonth(selectedDate, nextMonth), "selectedDate");
  };
  return (
    <>
      <LocaleArrow type="prev" onClick={handlePrev} />
      <DateProvider>
        <DatePicker
          {...navigationPickerProps}
          open={open}
          onClose={toggleDialog}
          openTo="month"
          views={["year", "month"]}
          value={selectedDate}
          onChange={handleChange}
          renderInput={(params) => (
            <Button ref={params.inputRef} style={{ padding: 4 }} onClick={toggleDialog}>
              {format(selectedDate, "MMMM yyyy", { locale: locale })}
            </Button>
          )}
        />
      </DateProvider>
      <LocaleArrow type="next" onClick={handleNext} />
    </>
  );
};

export default HeaderDateBtn;
