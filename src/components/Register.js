import React, { useEffect, useState } from "react";
import { useRef } from "react";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/;
const PASS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Register = () => {
  const userref = useRef();
  const errref = useRef();

  const [username, setusername] = useState("");
  const [validName, setvalidName] = useState(false);
  const [userFocus, setuserFocus] = useState(false);

  const [Pass, setPass] = useState("");
  const [validPass, setvalidPass] = useState(false);
  const [passFocus, setpassFpass] = useState(false);

  const [match, setmatch] = useState("");
  const [validmatch, setvalidmatch] = useState(false);
  const [matchFocus, setmatchFocus] = useState(false);

  const [errMsg, seterrMsg] = useState("");
  const [success, setsuccess] = useState(false);

  //   useEffect(() => {
  //     userref.current.focus();

  //   }, []);
  useEffect(() => {
    const result = USER_REGEX.test(username);
    console.log(result);
    console.log(username);
    setvalidName(result);
  }, [username]);

  useEffect(() => {
    const result=PASS_REGEX.test(Pass);
    console.log(result);
    console.log(Pass);
    setvalidPass(result);
    const check=Pass===match;
    setvalidmatch(check);
    
  }, [Pass,match]);

  return <>Reg</>;
};
export default Register;
