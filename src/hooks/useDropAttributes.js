import { alpha, useTheme } from "@mui/material";
import useCalendarState from "./useCalendarState";


export const useDropAttributes = ({ start, end, resourceKey, resourceVal }) => {
  const { triggerDialog, onDrop } = useCalendarState()
  const theme = useTheme();

  return {
    onClick: () => {
      triggerDialog(true, {
        start,
        end,
        [resourceKey]: resourceVal,
      });
    },
    onDragOver: (e) => {
      e.currentTarget.style.backgroundColor = alpha(theme.palette.secondary.main, 0.3);
      e.preventDefault();
    },
    onDragEnter: (e) => {
      e.currentTarget.style.backgroundColor = alpha(theme.palette.secondary.main, 0.3);
    },
    onDragLeave: (e) => {
      e.currentTarget.style.backgroundColor = "";
    },
    onDrop: (e) => {
      e.preventDefault();
      e.currentTarget.style.backgroundColor = "";
      const eventId = e.dataTransfer.getData("text");
      onDrop(eventId, start, resourceKey, resourceVal);
    },
    [resourceKey]: resourceVal,
  };
};
