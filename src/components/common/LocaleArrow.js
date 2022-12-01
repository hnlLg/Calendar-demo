import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { IconButton } from "@mui/material";
import useCalendarState from "../../hooks/useCalendarState";


const LocaleArrow = ({ type, onClick }) => {
  const { direction } = useCalendarState()

  let Arrow = NavigateNextRoundedIcon;
  if (type === "prev") {
    Arrow = direction === "rtl" ? NavigateNextRoundedIcon : NavigateBeforeRoundedIcon;
  } else if (type === "next") {
    Arrow = direction === "rtl" ? NavigateBeforeRoundedIcon : NavigateNextRoundedIcon;
  }

  return (
    <IconButton
      style={{ padding: 2 }}
      onClick={onClick}
      onDragOver={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
    >
      <Arrow />
    </IconButton>
  );
};

export default LocaleArrow;
