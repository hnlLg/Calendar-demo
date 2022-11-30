import { CircularProgress, Typography } from "@mui/material";
// import { Month } from "./Month";
import { Table, Wrapper } from "../styles/styles";
import useCalendarState from "../hooks/useCalendarState";
import { Month } from "./Month";

const SchedulerComponent = () => {
  const data = useCalendarState();
  return (
    <Wrapper data-testid="rs-wrapper">
      {false && (
        <div className="rs__table_loading">
          <span>
            <CircularProgress size={50} />
            <Typography align="center">Loading...</Typography>
          </span>
        </div>
      )}
      <div className="rs__outer_table" data-testid="grid">
        <Table><Month /></Table>
      </div>
    </Wrapper>
  );
};

export default SchedulerComponent;
