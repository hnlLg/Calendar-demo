import { CircularProgress, Typography } from "@mui/material";
// import { Month } from "./Month";
import { Table, Wrapper } from "../styles/styles";
import { Month } from "./Month";
import Header from "./Header/Header";

const SchedulerComponent = () => {
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
      <Header />
      <div className="rs__outer_table" data-testid="grid">
        <Table><Month /></Table>
      </div>
    </Wrapper>
  );
};

export default SchedulerComponent;
