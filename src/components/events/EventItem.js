import { Fragment, useMemo, useRef } from "react";
import { ButtonBase, useTheme, Paper } from "@mui/material";
import useCalendarState from "../../hooks/useCalendarState";
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { withStyles } from "@mui/styles";
import {
  differenceInDays
} from "date-fns";
import clsx from 'clsx'
// import { COLORS, TYPE } from '../../helpers/constant'

const style = {
  eventContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    '@media screen and (min-width: 1800px)': {
      maxWidth: 300
    }
  },
  avatarGroup: {
    marginLeft: 5,
    marginRight: 5
  },
  eventTitle: {
    textAlign: 'left',
    lineHeight: 1,
    fontSize: 14,
    fontWeight: 400
  }
}

const EventItem = ({ classes, event, hasPrev, hasNext, multiday }) => {
  const {
    eventRenderer,
    draggable,
  } = useCalendarState()
  const theme = useTheme();
  const ref = useRef()

  const mapTypeToColor = () => {
    // return COLORS[type][data.color]
  }

  const renderEvent = useMemo(() => {
    if (typeof eventRenderer === "function") {
      const custom = eventRenderer(event);
      if (custom) {
        return custom;
      }
    }

    const diffDays = differenceInDays(event.end, event.start)

    let item = (
      // <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <div className={clsx(classes.eventContainer, { [classes.timeRangeEvent]: diffDays })} >
        {/* {!hasPrev &&
          (
            <> */}
        <AvatarGroup
          max={1}
          spacing={10}
          className={classes.avatarGroup}
          componentsProps={{ additionalAvatar: { style: { width: 16, height: 16 } } }}
        >
          {/* {data.products.map((product, index) => ( */}
          <Avatar sx={{ width: 16, height: 16 }} alt="Remy Sharp" src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png' />
          <Avatar sx={{ width: 16, height: 16 }} alt="Remy Sharp" src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png' />
          <Avatar sx={{ width: 16, height: 16 }} alt="Remy Sharp" src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png' />
          {/* ))} */}
        </AvatarGroup>
        <div className={classes.eventTitle} noWrap>
          {new Date(event.start).getUTCDate().toString()} {hasPrev.toString()}
        </div>
        {/* </>
          )} */}
      </div >
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

export default withStyles(style)(EventItem);
