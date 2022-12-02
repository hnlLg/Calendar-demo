import {
  Button
} from "@mui/material";
import useCalendarState from "../../hooks/useCalendarState";
import HeaderDateBtn from "./HeaderDateBtn";

export const View = "month" | "week" | "day";

const Header = () => {
  const { selectedDate, handleState,translations, navigation } =
    useCalendarState();



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div >{navigation && <HeaderDateBtn selectedDate={selectedDate} />}</div>
      <div >
        <Button onClick={() => handleState(new Date(), "selectedDate")}>
          {translations.navigation.today}
        </Button>
      </div>
    </div>
  );
};

export default Header;
