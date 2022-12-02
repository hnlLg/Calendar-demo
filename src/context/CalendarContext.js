import React from 'react'
import enUS from "date-fns/locale/en-US";

export const defaultProps = {
  height: 600,
  month: {
    weekDays: [0, 1, 2, 3, 4, 5, 6],
    weekStartOn: 0,
    startHour: 9,
    endHour: 17,
    navigation: true,
  },
  view: "month",
  navigation: true,
  selectedDate: new Date(),
  events: [],
  loading: undefined,
  locale: enUS,
  editable: true,
  translations: {
    navigation: {
      today: "Today",
    },
    form: {
      addTitle: "Add Event",
      editTitle: "Edit Event",
      confirm: "Confirm",
      delete: "Delete",
      cancel: "Cancel",
    },
    event: {
      title: "Title",
      start: "Start",
      end: "End",
      allDay: "All Day",
    },
    moreEvents: "More...",
  },
  hourFormat: "12",
  draggable: true,
};

const CalendarContext = React.createContext({
  ...defaultProps,
  mounted: false,
  dialog: false,
  selectedRange: undefined,
  selectedEvent: undefined,
  selectedResource: undefined,
  handleState: () => { },
  getViews: () => [],
  confirmEvent: () => { },
  onDrop: () => { },
});

export default CalendarContext