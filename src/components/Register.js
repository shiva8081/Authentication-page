import React, { useEffect, useState, useRef } from "react";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{4,14}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const [match, setMatch] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = PASS_REGEX.test(password);
    setValidPass(result);
    const check = password === match;
    setValidMatch(check);
  }, [password, match]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, match]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PASS_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid entry");
      return;
    }
    try {
      const res = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user: username, pwd: password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(res.data);
      setSuccess(true);
      //clear all input
      setUsername('');
      setMatch('');
      setPassword('')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div>
          <h1>Registered</h1>
          <a href="#">Sign In</a>
        </div>
      ) : (
        <div>
          {errMsg && (
            <p ref={errRef} aria-live="assertive" className="text-red-600">
              {errMsg}
            </p>
          )}
          <h1 className="text-center font-semibold font-serif text-5xl bg-blue-300">
            Register
          </h1>
          <div className="bg-blue-300 h-screen flex flex-col justify-center items-center">
            <div className="bg-gray-400 flex flex-col justify-center items-center mt-7 w-1/2">
              <form className="flex flex-col m-3" onSubmit={handleSubmit}>
                <label htmlFor="username">Username :</label>
                <input
                  id="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter the username"
                  ref={userRef}
                  autoComplete="off"
                  required
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                />
                {userFocus && username && !validName && (
                  <p id="uidnote" className="text-red-600">
                    5 to 15 characters. Must start with a letter and contain
                    only letters, numbers, underscores, or hyphens.
                  </p>
                )}
                <label htmlFor="password">Password :</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={validPass ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                />
                {passFocus && password && !validPass && (
                  <p id="pwdnote" className="text-red-600">
                    8 to 24 characters. Must include uppercase and lowercase
                    letters, a number, and a special character.
                  </p>
                )}
                <label htmlFor="cnfmpass">Confirm Password :</label>
                <input
                  type="password"
                  id="cnfmpass"
                  placeholder="Confirm password"
                  onChange={(e) => setMatch(e.target.value)}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="cnfmnote"
                />
                {matchFocus && match && !validMatch && (
                  <p id="cnfmnote" className="text-red-600">
                    Must match the password.
                  </p>
                )}
                <button
                  className={`mt-3 border bg-slate-50 ${!validName || !validPass || !validMatch ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!validName || !validPass || !validMatch}
                >
                  Register
                </button>
              </form>
              <p>
                <span>
                  <a href="#">Already registered?</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
