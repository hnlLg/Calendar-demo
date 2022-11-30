import React from 'react'
import enUS from "date-fns/locale/en-US";

export const defaultProps = {
    height: 600,
    month: {
      weekDays: [0, 1, 2, 3, 4, 5, 6],
      weekStartOn: 6,
      startHour: 9,
      endHour: 17,
      navigation: true,
    },
    week: {
      weekDays: [0, 1, 2, 3, 4, 5, 6],
      weekStartOn: 6,
      startHour: 9,
      endHour: 17,
      step: 60,
      navigation: true,
    },
    day: {
      startHour: 9,
      endHour: 17,
      step: 60,
      navigation: true,
    },
    view: "month",
    navigation: true,
    selectedDate: new Date(),
    events: [],
    remoteEvents: undefined,
    fields: [],
    loading: undefined,
    customEditor: undefined,
    onConfirm: undefined,
    onDelete: undefined,
    viewerExtraComponent: undefined,
    resources: [],
    resourceFields: {
      idField: "assignee",
      textField: "text",
      subTextField: "subtext",
      avatarField: "avatar",
      colorField: "color",
    },
    recourseHeaderComponent: undefined,
    locale: enUS,
  };


const CalendarContext = React.createContext(null);

export default CalendarContext