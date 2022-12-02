import { Fragment, useState } from "react";
import {
  closestTo,
  isBefore,
  startOfDay,
  endOfDay,
  isAfter,
  isSameDay,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import { Typography } from "@mui/material";
import EventItem from "./EventItem";
import { MONTH_NUMBER_HEIGHT, MULTI_DAY_EVENT_HEIGHT } from "../../helpers/constant";
import { differenceInDaysOmitTime } from "../../helpers/generals";
import useCalendarState from "../../hooks/useCalendarState";


const MonthEvents = ({
  events,
  todayEvents,
  today,
  eachWeekStart,
  daysList,
  onViewMore,
  cellHeight,
  prevNextEvents,
  // limitEvent
}) => {
  console.log(todayEvents)
  const LIMIT = Math.round((cellHeight - MONTH_NUMBER_HEIGHT) / MULTI_DAY_EVENT_HEIGHT - 1);
  const { translations } = useCalendarState()
  const eachFirstDayInCalcRow = eachWeekStart.some((date) => isSameDay(date, today)) ? today : null;

  // const todayEvents = events
  //   .filter((e) =>
  //     eachFirstDayInCalcRow &&
  //       isWithinInterval(eachFirstDayInCalcRow, {
  //         start: startOfDay(e.start),
  //         end: endOfDay(e.end),
  //       })
  //       ? true
  //       : isSameDay(e.start, today)
  //   )
  //   .sort((a, b) => b.end.getTime() - a.end.getTime());

  // if (todayEvents.length) {
  //   console.log(todayEvents, 'today')
  // }

  return (
    <Fragment>
      {todayEvents.map((event, i) => {
        const fromPrevWeek =
          !!eachFirstDayInCalcRow && isBefore(event.start, eachFirstDayInCalcRow);
        const start = fromPrevWeek && eachFirstDayInCalcRow ? eachFirstDayInCalcRow : event.start;

        let eventLength = differenceInDaysOmitTime(start, event.end) + 1;
        const toNextWeek = eventLength >= daysList.length;
        if (toNextWeek) {
          // Rethink it
          const NotAccurateWeekStart = startOfWeek(event.start);
          const closestStart = closestTo(NotAccurateWeekStart, eachWeekStart);
          if (closestStart) {
            eventLength =
              daysList.length -
              (!eachFirstDayInCalcRow ? differenceInDaysOmitTime(event.start, closestStart) : 0);
          }
        }

        const prevNextEvents = events.filter((e) => {
          return (
            !eachFirstDayInCalcRow &&
            e.event_id !== event.event_id &&
            LIMIT > i &&
            isBefore(e.start, startOfDay(today)) &&
            isAfter(e.end, startOfDay(today))
          );
        });
        let index = i;

        if (prevNextEvents.length) {
          index += prevNextEvents.length;
          // if (index > LIMIT) {
          //   index = LIMIT;
          // }
        }
        const topSpace = index * MULTI_DAY_EVENT_HEIGHT + MONTH_NUMBER_HEIGHT;

        return index > LIMIT ? (
          ""
        ) : index === LIMIT ? (
          <Typography
            key={i}
            width="100%"
            className="rs__multi_day rs__hover__op"
            style={{ top: topSpace, fontSize: 11 }}
            onClick={(e) => {
              e.stopPropagation();
              onViewMore(event.start);
            }}
          >
            {`${Math.abs(todayEvents.length - i)} ${translations.moreEvents}`}
          </Typography>
        ) : (
          <div
            key={i}
            className="rs__multi_day"
            style={{
              top: topSpace,
              width: `${100 * eventLength}%`,
            }}
          >
            <EventItem
              event={event}
              showdate={false}
              multiday={differenceInDaysOmitTime(event.start, event.end) > 0}
              hasPrev={fromPrevWeek}
              hasNext={toNextWeek}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

export default MonthEvents;
