import { useEffect, useCallback, Fragment, useState } from "react";
import { Avatar, Typography, useTheme } from "@mui/material";
import {
  addDays,
  eachWeekOfInterval,
  format,
  isSameMonth,
  isToday,
  setHours,
  endOfMonth,
  startOfMonth,
  closestTo,
  startOfDay,
  isBefore,
  isAfter,
  isSameDay,
  endOfDay,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
// import MonthEvents from "../components/events/MonthEvents";
// import { WithResources } from "../components/common/WithResources";
import Cell from "../components/common/Cell";
import { TableGrid } from "../styles/styles";
import useCalendarState from "../hooks/useCalendarState";
import MonthEvents from "./events/MonthEvents";


const Month = () => {
  const {
    month,
    selectedDate,
    height,
    events,
    handleGotoDay,
    remoteEvents,
    getRemoteEvents,
    triggerLoading,
    handleState,
    resourceFields,
    locale,
    hourFormat,
  } = useCalendarState();
  const { weekStartOn, weekDays, startHour, endHour, cellRenderer } = month
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const eachWeekStart = eachWeekOfInterval(
    {
      start: monthStart,
      end: monthEnd,
    },
    { weekStartsOn: weekStartOn }
  );
  const hFormat = hourFormat === "12" ? "hh:mm a" : "HH:mm";
  const daysList = weekDays.map((d) => addDays(eachWeekStart[0], d));
  const CELL_HEIGHT = height / eachWeekStart.length;
  const theme = useTheme();
  const [extendHeight, setExtendHeight] = useState({})

  const fetchEvents = useCallback(async () => {
    try {
      triggerLoading(true);
      const start = eachWeekStart[0];
      const end = addDays(eachWeekStart[eachWeekStart.length - 1], daysList.length);
      const events = await (async () => {
        // Remove `remoteEvents` in future release
        if (remoteEvents) {
          return await remoteEvents(`?start=${start}&end=${end}`);
        } else {
          return await getRemoteEvents({
            start,
            end,
            view: "month",
          });
        }
      })();
      if (events && events?.length) {
        handleState(events, "events");
      }
    } catch (error) {
      throw error;
    } finally {
      triggerLoading(false);
    }
    // eslint-disable-next-line
  }, [selectedDate, remoteEvents, getRemoteEvents]);

  useEffect(() => {
    if ((remoteEvents || getRemoteEvents) instanceof Function) {
      fetchEvents();
    }
    // eslint-disable-next-line
  }, [fetchEvents]);

  const renderCells = (resource) => {
    let recousedEvents = events;
    const rows = [];

    for (const startDay of eachWeekStart) {
      const cells = weekDays.map((d) => {
        const today = addDays(startDay, d);
        const start = new Date(`${format(setHours(today, startHour), `yyyy/MM/dd ${hFormat}`)}`);
        const end = new Date(`${format(setHours(today, endHour), `yyyy/MM/dd ${hFormat}`)}`);
        // const field = resourceFields.idField;

        const eachFirstDayInCalcRow = eachWeekStart.some((date) => isSameDay(date, today)) ? today : null;
        const todayEvents = recousedEvents
          .filter((e) =>
            eachFirstDayInCalcRow &&
              isWithinInterval(eachFirstDayInCalcRow, {
                start: startOfDay(e.start),
                end: endOfDay(e.end),
              })
              ? true
              : isSameDay(e.start, today)
          )
          .sort((a, b) => b.end.getTime() - a.end.getTime());

        return (
          <span style={{ height: CELL_HEIGHT }} key={d.toString()} className="rs__cell">
            <Cell
              start={start}
              end={end}
              day={selectedDate}
              // height={CELL_HEIGHT}
              //   resourceKey={field}
              //   resourceVal={resource ? resource[field] : null}
              cellRenderer={cellRenderer}
            />
            <Fragment>
              <Avatar
                style={{
                  width: 27,
                  height: 27,
                  position: "absolute",
                  top: 0,
                  background: isToday(today) ? theme.palette.secondary.main : "transparent",
                  color: isToday(today) ? theme.palette.secondary.contrastText : "",
                  marginBottom: 2,
                }}
              >
                <Typography
                  color={!isSameMonth(today, monthStart) ? "#ccc" : "textPrimary"}
                  className="rs__hover__op"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGotoDay(today);
                  }}
                >
                  {format(today, "dd")}
                </Typography>
              </Avatar>
              <MonthEvents
                events={recousedEvents}
                todayEvents={todayEvents}
                today={today}
                eachWeekStart={eachWeekStart}
                daysList={daysList}
                onViewMore={(today) => setExtendHeight({ ...extendHeight, [today]: todayEvents.length })}
                onViewLess={(x) => console.log(x)}
                cellHeight={CELL_HEIGHT}
              />
            </Fragment>
          </span>
        );
      });
      rows.push(<Fragment key={startDay.toString()}>{cells}</Fragment>);
    }
    return rows;
  };

  const renderTable = (resource) => {
    console.log('resource', resource)
    return (
      <TableGrid days={daysList.length} indent="0">
        {daysList.map((date, i) => (
          <span key={i} className="rs__cell rs__header">
            <Typography align="center" variant="body2">
              {format(date, "EE", { locale: locale })}
            </Typography>
          </span>
        ))}

        {renderCells(resource)}
      </TableGrid>
    );
  };
  return renderTable();

  //   return resources.length ? <WithResources renderChildren={renderTable} /> : renderTable();
};

export { Month };
