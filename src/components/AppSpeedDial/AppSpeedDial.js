import React, { useState } from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

// styles
import useStyles from "./styles";

export default function AppSpeedDial() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleSetOpen = () => {
    setOpen(true);
  }

  const handleSetClose = () => {
    setOpen(false);
  }

  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <FavoriteIcon />, name: 'Like' },
  ];

  return (
     <div className={classes.root}>
       <SpeedDial
         ariaLabel="speed-dial"
         className={classes.speedDial}
         icon={<SpeedDialIcon openIcon={<EditIcon />} />}
         onClose={handleSetClose}
         onOpen={handleSetOpen}
         open={open}
        >
         {actions.map((action) => (
           <SpeedDialAction
             title="speed-dial-action"
             key={action.name}
             icon={action.icon}
             tooltipTitle={action.name}
             // onClick={}
            />
         ))}
       </SpeedDial>
     </div>
  );
}