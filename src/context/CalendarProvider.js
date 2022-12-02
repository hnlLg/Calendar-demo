import { useReducer } from "react";
import { differenceInMinutes, addMinutes, isEqual } from "date-fns";
import { arraytizeFieldVal } from "../helpers/generals";
import CalendarContext, { defaultProps } from "./CalendarContext";
import { ACTION_TYPE, TYPE } from '../constants'

const initialValues = (initial) => {
  const initialView = initial.view && initial[initial.view] ? initial.view : 'month';
  return {
    ...initial,
    view: initialView,
    dialog: false,
    mounted: false,
    selectedRange: undefined,
    fields: [...defaultProps.fields, ...(initial.fields || [])],
  };
};

const CalendarProvider = ({ initial, children }) => {
  const { onEventDrop, loading } = initial

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ACTION_TYPE.UPDATE_PROPS:
        return {
          ...state,
          ...action.payload,
        };
      case ACTION_TYPE.SET:
        const { name, value } = action.payload;
        return {
          ...state,
          [name]: value,
        };
      default: {
        return state;
      }
    }
  }, initialValues(initial));

  // Get Calendar view
  const getViews = () => ['month']

  const handleState = (value, name) => {
    dispatch({ type: ACTION_TYPE.SET, payload: { name, value } });
  };

  // Handle add or update an event
  const confirmEvent = (event, action) => {
    let eventList;
    if (action === ACTION_TYPE.EDIT) {
      eventList = state.events.map((e) =>
        e.event_id === event.event_id ? { ...e, ...event } : e
      );
    } else {
      eventList = [...state.events, event];
    }
    handleState(eventList, "events");
  };

  // const triggerLoading = (status) => {
  //   // Trigger if not out-sourced by props
  //   if (typeof loading === TYPE.UNDEFINED) {
  //     dispatch({ type: ACTION_TYPE.TRIGGER_LOADING, payload: status });
  //   }
  // };

  const onDrop = async (
    eventId,
    startTime,
    resKey,
    resVal
  ) => {
    const droppedEvent = state.events.find((e) => {
      if (typeof e.event_id === TYPE.NUMBER) {
        return e.event_id === +eventId;
      }
      return e.event_id === eventId;
    });

    const diff = differenceInMinutes(droppedEvent.end, droppedEvent.start);
    const updatedEvent = {
      ...droppedEvent,
      start: startTime,
      end: addMinutes(startTime, diff),
    };

    if (!onEventDrop || typeof onEventDrop !== TYPE.FUNCTION) {
      return confirmEvent(updatedEvent, ACTION_TYPE.EDIT);
    }

  };

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        handleState,
        getViews,
        onDrop,
        dispatch
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarProvider