import { Fragment, useMemo, useState } from "react";
import { Popover, Typography, ButtonBase, useTheme, IconButton, Paper } from "@mui/material";
import { format } from "date-fns";
// import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
// import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
// import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
// import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
// import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
// import { PopperInner } from "../../styles/styles";
// import EventActions from "./Actions";
import { differenceInDaysOmitTime } from "../../helpers/generals";
import useCalendarState from "../../hooks/useCalendarState";


const EventItem = ({ event, multiday, hasPrev, hasNext, showdate }) => {
  const {
    direction,
    locale,
    hourFormat,
    eventRenderer,
    view,
    draggable,
  } = useCalendarState()
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const theme = useTheme();
  const hFormat = hourFormat === "12" ? "hh:mm a" : "HH:mm";

//   const NextArrow = direction === "rtl" ? ArrowLeftRoundedIcon : ArrowRightRoundedIcon;
//   const PrevArrow = direction === "rtl" ? ArrowRightRoundedIcon : ArrowLeftRoundedIcon;
  const hideDates = differenceInDaysOmitTime(event.start, event.end) <= 0 && event.allDay;

  const triggerViewer = (el) => {
    if (!el && deleteConfirm) {
      setDeleteConfirm(false);
    }
    setAnchorEl(el || null);
  };



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
            triggerViewer(e.currentTarget);
          }}
          disabled={event.disabled}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        >
          <div
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
