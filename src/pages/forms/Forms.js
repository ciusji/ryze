import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

  // useState 保存状态
  // 与在类中使用 setState 的异同点：
  // - 相同点：在一次渲染周期中调用多次 setState，数据只改变一次
  // - 不同点：类中的 setState 是合并，而函数组件中的 setState 是替换
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

  // 之前有很多副作用的操作，例如网路请求，修改 UI 等，一般都是在 class 组件的
  // componentDidMount 或者 componentDidUpdate 等生命周期中进行操作的。而在函数组件中
  // 是没有这些生命周期管理的，只能 return 想要的元素。现在可以用 useEffect 来执行一列副作用
  // 的操作了。
  // useEffect 的第二个参数是一个数组，里面放入在 useEffect 使用到的 state 值。
  // 只有当 count 发生变化时，才会执行这个 useEffect。
  useEffect(() => {
    document.title = count.toString();
  }, [count]);

  useEffect(() => {
    window.addEventListener('click', handleClick);

    // 生命周期结束后，进行移除注册事件等操作。(组件被销毁时，会自动执行这个函数)
    return () => {
      window.removeEventListener('click', handleClick);
    };
  });
  // 使用 useState 获取的 setState 方法更新数据时是异步的；而使用 useReducer 获取的 dispatch
  // 方法更新数据是同步的。
  const [state, dispatch] = React.useReducer(reducer, initialState, undefined);

  // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传递的参数（initialValue）
  // 返回的对象将保留在整个组件的生命周期中。

  // 演示不用 form 的方式
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
        fullWidth
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
        fullWidth
      />
      <br/>
      <Button
        type={"submit"}
        variant={"contained"}
        color={"primary"}
        onClick={onclick}
      > Submit </Button>
    </>
  );
}