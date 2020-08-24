import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Pagination from '@material-ui/lab/Pagination';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AccountCircle, Security } from "@material-ui/icons";

// styles
import useStyles from "./styles";

const initialState = {number: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {number: state.number + 1};
    case 'decrement':
      return {number: state.number - 1};
    default:
      throw new Error('not support');
  }
}

export default function Forms() {
  const classes = useStyles();

  const [count, setCount] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);

  const handleSetCount = () => {
    setCount(count + 1);
    localStorage.setItem('self_count', count.toString());
  };

  const handleSetUsername = (event) => {
    console.log("Username: " + event.target.value);
    setUsername(event.target.value);
  };

  const handleSetPassword = (event) => {
    console.log("Password: " + event.target.value);
    setPassword(event.target.value);
  };

  const handleClick = () => {
    console.log("%s, %s", username, password);
  };

  const handleClickSubmit = () => {
    if (Boolean(username) && Boolean(password)) {
      setIsSubmit(true);
    } else {
      setOpen(true);
    }
  };

  const handleClickClose = () => {
    setIsSubmit(false);
  }

  useEffect(() => {
    document.title = count.toString();
  }, [count]);

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      document.title = "Ryze";
    };
  });

  const [state, dispatch] = React.useReducer(reducer, initialState, undefined);

  return (
    <>
      <PageTitle title="Forms" />
      <p>Number: {state.number}</p>
      <Button variant={"outlined"} color={"secondary"} onClick={() => dispatch({type: 'increment'})} aria-label={"+"}>+</Button>
      <Button variant={"outlined"} color={"secondary"} onClick={() => dispatch({type: 'decrement'})} aria-label={"-"}>-</Button>
      <p>Count: {count}</p>
      <Button variant={"contained"} color={"primary"} onClick={handleSetCount}>Click Me</Button>
      <br/>
      <TextField
        id={"username"}
        label={"Username"}
        onChange={handleSetUsername}
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        margin="normal"

      />
      <br/>
      <TextField
        id={"password"}
        label={"Password"}
        onChange={handleSetPassword}
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
          startAdornment: (
            <InputAdornment position="start">
              <Security />
            </InputAdornment>
          ),
        }}
        margin="normal"
      />
      <br/>
      <Pagination
        variant="outlined"
        count={10}
        color="primary"
        onChange={(event, value) => {
          setPage(value);
        }}
      />
      <Button
        className={classes.submitButton}
        type={"submit"}
        variant={"contained"}
        color={"primary"}
        onClick={handleClickSubmit}
      > Submit </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setOpen(false)}
        >
          username or password can not be empty.
        </Alert>
      </Snackbar>
      <Dialog
        open={isSubmit}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id={"alert-dialog-title"}>
          Use current configuration?
        </DialogTitle>
        <DialogContent id={"alert-dialog-description"}>
          <div>
            <TextField color={"primary"} value={username} fullWidth />
            <TextField color={"primary"} value={password} fullWidth />
            <TextField color={"primary"} value={page} fullWidth />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSubmit(false)} color="primary">
            Disagree
          </Button>
          <Button onClick={() => setIsSubmit(false)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}