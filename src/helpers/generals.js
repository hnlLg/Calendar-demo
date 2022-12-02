import {
    addMinutes,
    differenceInDays,
    endOfDay,
    isSameDay,
    isWithinInterval,
    startOfDay,
  } from "date-fns";

  

  export const arraytizeFieldVal = (field, val, event) => {
    const arrytize = field.config?.multiple && !Array.isArray(event?.[field.name] || field.default);
    const value = arrytize ? (val ? [val] : []) : val;
    const validity = arrytize ? value.length : value;
    return { value, validity };
  };

  export const differenceInDaysOmitTime = (start, end) => {
    return differenceInDays(endOfDay(end), startOfDay(start));
  };