import { Fragment, useState } from "react";
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
  startOfDay,
  isSameDay,
  endOfDay,
  isWithinInterval,
} from "date-fns";
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

  const renderCells = () => {
    const rows = [];

    for (const startDay of eachWeekStart) {
      const cells = weekDays.map((d) => {
        const today = addDays(startDay, d);
        const start = new Date(`${format(setHours(today, startHour), `yyyy/MM/dd ${hFormat}`)}`);
        const end = new Date(`${format(setHours(today, endHour), `yyyy/MM/dd ${hFormat}`)}`);

        const eachFirstDayInCalcRow = eachWeekStart.some((date) => isSameDay(date, today)) ? today : null;
        const todayEvents = events
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
          <span
            style={{
              height: CELL_HEIGHT + (extendHeight[startDay] || 0),
              backgroundColor: isToday(today) ? '#2933C514' : "transparent",
              borderTop: isToday(today) && '3px solid #2933C5'
            }}
            className="rs__cell"
            key={d.toString()}
          >
            <Cell
              start={start}
              end={end}
              day={selectedDate}
              height={CELL_HEIGHT}
              cellRenderer={cellRenderer}
            />
            <Fragment>
              <Avatar
                style={{
                  height: 17,
                  width: 'auto',
                  position: "absolute",
                  top: 6.5,
                  left: 5.5,
                  background: "transparent",
                }}
              >
                <Typography
                  // color={!isSameMonth(today, monthStart) ? "#ccc" : "textPrimary"}
                  color={isToday(today) && "#2933C5 !important"}
                  className="rs__hover__op"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {format(today, "d")}
                </Typography>
              </Avatar>
              <MonthEvents
                events={events}
                todayEvents={todayEvents}
                today={today}
                eachWeekStart={eachWeekStart}
                daysList={daysList}
                onViewMore={(n) => setExtendHeight({ ...extendHeight, [startDay]: (extendHeight[startDay] || 0) + n * 28 })}
                onViewLess={(x) => console.log(x)}
                cellHeight={CELL_HEIGHT + (extendHeight[startDay] || 0)}
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
