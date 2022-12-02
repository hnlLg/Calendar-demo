import { Fragment, useMemo, useRef } from "react";
import {  Typography, ButtonBase, useTheme, Paper } from "@mui/material";
import useCalendarState from "../../hooks/useCalendarState";


const EventItem = ({ event, hasPrev, hasNext }) => {
  const {
    eventRenderer,
    draggable,
  } = useCalendarState()
  const theme = useTheme();
  const ref = useRef()




  const renderEvent = useMemo(() => {
    if (typeof eventRenderer === "function") {
      const custom = eventRenderer(event);
      if (custom) {
        return custom;
      }
    }

    let item = (
      <div style={{ padding: 2 }}>
        <Typography variant="subtitle2" style={{ fontSize: 12, textAlign: 'left' }} noWrap>
          {event.title}
        </Typography>
      </div>
    );
    return item;
  }, [eventRenderer, event]);

  const isDraggable = useMemo(() => {
    if (event.disabled) return false;

    let canDrag = typeof draggable !== "undefined" ? draggable : true;
    if (typeof event.draggable !== "undefined") {
      canDrag = event.draggable;
    }

    return canDrag;
  }, [draggable, event.disabled, event.draggable]);

  return (
    <Fragment>
      <Paper
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          background: event.disabled ? "#d0d0d0" : event.color || theme.palette.primary.main,
          color: event.disabled ? "#808080" : theme.palette.primary.contrastText,
          cursor: event.disabled ? "not-allowed" : "pointer",
          overflow: "hidden",
        }}
      >
        <ButtonBase
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          disabled={event.disabled}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        >
          <div
            ref={ref}
            style={{
              height: "100%",
            }}
            draggable={isDraggable}
            onDragStart={(e) => {
              e.stopPropagation();
              e.dataTransfer.setData("text/plain", `${event.event_id}`);
              e.currentTarget.style.backgroundColor = theme.palette.error.main;
            }}
            onDragEnd={(e) => {
              e.currentTarget.style.backgroundColor = event.color || theme.palette.primary.main;
            }}
            onDragOver={(e) => {
              e.currentTarget.style.width = `${200}px`
              e.stopPropagation();
              e.preventDefault();
            }}
            onDragEnter={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {renderEvent}
          </div>
        </ButtonBase>
      </Paper>
    </Fragment>
  );
};

EventItem.defaultProps = {
  multiday: false,
  showdate: true,
};

export default EventItem;
