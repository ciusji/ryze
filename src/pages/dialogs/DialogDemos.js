import React, { useState } from "react";
import Button from "@material-ui/core/Button";

// self component
import { Typography } from "../../components/Wrappers";
import SimpleDialog from "../../components/Dialog";
import PageTitle from "../../components/PageTitle";

const emails = ['username@gmail.com', 'user02@gmail.com', "okr908@gmail.com"];

export default function DialogDemos() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <PageTitle title="Dialogs" button="Dialog Demo" />
      <Typography>Selected: {selectedValue}</Typography>
      <br/>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}>
        Open the dialog
      </Button>
      <SimpleDialog
        open={open}
        selectedValue={setSelectedValue}
        onClose={handleClose}
        accounts={emails}
      />
    </>
  );
}