import { Fragment, useState } from "react";
import {
  Button,
  useTheme,
  useMediaQuery,
  Popover,
  MenuList,
  MenuItem,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useCalendarState from "../../hooks/useCalendarState";
import HeaderDateBtn from "./HeaderDateBtn";

export const View = "month" | "week" | "day";

const Header = () => {
  const { selectedDate, view, week, handleState, getViews, translations, navigation, day, month } =
    useCalendarState();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const views = getViews();

  const toggleMoreMenu = (el) => {
    setAnchorEl(el || null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div data-testid="date-navigator">{navigation && <HeaderDateBtn selectedDate={selectedDate} onChange={handleState}  />}</div>
      <div data-testid="view-navigator">
        <Button onClick={() => handleState(new Date(), "selectedDate")}>
          {translations.navigation.today}
        </Button>
        {/* {views.length > 1 &&
          (isDesktop ? (
            views.map((v) => (
              <Button
                key={v}
                color={v === view ? "primary" : "inherit"}
                onClick={() => handleState(v, "view")}
                onDragOver={(e) => {
                  e.preventDefault();
                  handleState(v, "view");
                }}
              >
                {translations.navigation[v]}
              </Button>
            ))
          ) : (
            <Fragment>
              <IconButton
                style={{ padding: 5 }}
                onClick={(e) => {
                  toggleMoreMenu(e.currentTarget);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                  toggleMoreMenu();
                }}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuList autoFocusItem={!!anchorEl} disablePadding>
                  {views.map((v) => (
                    <MenuItem
                      key={v}
                      selected={v === view}
                      onClick={() => {
                        toggleMoreMenu();
                        handleState(v, "view");
                      }}
                    >
                      {translations.navigation[v]}
                    </MenuItem>
                  ))}
                </MenuList>
              </Popover>
            </Fragment>
          ))} */}
      </div>
    </div>
  );
};

export default Header;
