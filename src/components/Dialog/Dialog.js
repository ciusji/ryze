import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from 'prop-types';

// local style
// import useStyle from "./styles";

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, accounts } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Set Backup Account</DialogTitle>
      <List>
        {accounts.map((account) => (
          <ListItem button onClick={() => handleListItemClick(account)} key={account}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={account} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

// func | string | bool | array | number | object
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
}
