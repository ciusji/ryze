import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Pagination from '@material-ui/lab/Pagination';

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
    console.log("鼠标点击: %s, %s", username, password);
  };

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
        }}
        margin={"normal"}
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
        }}
        margin={"normal"}
      />
      <br/>
      <Pagination variant="outlined" count={10} color="primary" />
      <Button
        className={classes.submitButton}
        type={"submit"}
        variant={"contained"}
        color={"primary"}
        onClick={onclick}
      > Submit </Button>
    </>
  );
}