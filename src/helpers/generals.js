import {
    addMinutes,
    differenceInDays,
    endOfDay,
    isSameDay,
    isWithinInterval,
    startOfDay,
  } from "date-fns";

  

  export const getResourcedEvents = (
    events,
    resource ,
    resourceFields, 
    fields
  ) => {
    const keyName = resourceFields.idField;
    const resourceField = fields.find((f) => f.name === keyName);
    const isMultiple = !!resourceField?.config?.multiple;
  
    const recousedEvents = [];
  
    for (const event of events) {
      // Handle single select & multiple select accordingly
      const arrytize = isMultiple && !Array.isArray(event[keyName]);
      const eventVal = arrytize ? [event[keyName]] : event[keyName];
      const isThisResource = isMultiple
        ? eventVal.includes(resource[keyName])
        : eventVal === resource[keyName];
  
      if (isThisResource) {
        recousedEvents.push({
          ...event,
          color: event.color || resource[resourceFields.colorField || ""],
        });
      }
    }
  
    return recousedEvents;
  };

  export const arraytizeFieldVal = (field, val, event) => {
    const arrytize = field.config?.multiple && !Array.isArray(event?.[field.name] || field.default);
    const value = arrytize ? (val ? [val] : []) : val;
    const validity = arrytize ? value.length : value;
    return { value, validity };
  };

  export const differenceInDaysOmitTime = (start, end) => {
    return differenceInDays(endOfDay(end), startOfDay(start));
  };