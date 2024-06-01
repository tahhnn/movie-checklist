import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React, { useContext } from "react";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import { StoreContext } from "@/context";
type Props = {
  handleDelete: () => void;
};

const BoxDial = ({ handleDelete }: Props) => {
  const { setOnUpdate } = useContext<any>(StoreContext);
  const actions = [
    { icon: <AutoFixHighIcon />, name: "Fix", func: setOnUpdate },
    { icon: <DeleteIcon />, name: "Delete", func: handleDelete },
  ];
  return (
    <div>
      <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                action.func(true);
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  );
};

export default BoxDial;
