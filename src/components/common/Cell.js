import { Button } from "@mui/material";
import { useDropAttributes } from "../../hooks/useDropAttributes";



const Cell = ({
  day,
  start,
  end,
  resourceKey,
  resourceVal,
  cellRenderer,
  height,
  children,
}) => {
  const props = useDropAttributes({ start, end, resourceKey, resourceVal });

  if (cellRenderer) {
    return cellRenderer({
      day,
      start,
      end,
      height,
      ...props,
    });
  }
  return (
    <Button fullWidth {...props}>
      {children}
    </Button>
  );
};

export default Cell;
