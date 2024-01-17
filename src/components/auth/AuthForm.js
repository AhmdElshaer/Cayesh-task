import { useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../store/authSlice";
import { ValidatePassword, ValidateUserName } from "../../services/Validations";
import eye from '../../assets/eye.svg';
import classes from './authForm.module.css';

function AuthForm() {
  const [showpass, setShowPass] = useState("password");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePassword = () => {
    const validate = ValidatePassword(password);
    setpasswordError(!validate);
  };

  const handleUserName = () => {
    const validate = ValidateUserName(userName);
    setuserNameError(!validate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      userNameError !== true &&
      passwordError !== true &&
      userName.trim().length !== 0 &&
      password.trim().length !== 0
    ) {
      // const user = await login({username: userName, token: password}).unwrap();
      dispatch(setCredentials({user: userName, token: password}));
      localStorage.setItem('token', {password});
      navigate('/selection');
    } else {
      if (userName.trim().length === 0) {
        setuserNameError(true);
      }
      if (password.trim().length === 0) {
        setpasswordError(true);
      }
    }
    setLoading(false);
  };
  return (
    <form className={classes['auth_form']}>
      
      <div className={classes['input_parent']}>
        <label htmlFor="email">User Name</label>
        <div className={classes['email_wrapper']}>
          <input
            id="email"
            type="text"
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            onBlur={handleUserName}
            value={userName}
            placeholder="Enter Your Name without spaces"
            required
          />
        </div>
        {userNameError && (
          <p className={classes['error_message']}>
            Please Enter a valid userName !
          </p>
        )}
      </div>

      <div className={classes['input_parent']}>
        <label htmlFor="password">Password</label>
        <div className={classes['input_wrapper']}>
          <input
            id="password"
            type={`${showpass}`}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            onBlur={handlePassword}
            value={password}
            placeholder="************"
            required
          />
          <img
            src={eye}
            alt="see password"
            height={16}
            className={classes['show_pass']}
            onClick={() => {
              showpass === "password"
                ? setShowPass("text")
                : setShowPass("password");
            }}
          />
        </div>
        {passwordError && (
          <p className={classes['error_message']}>
            Please Enter a valid Password !
          </p>
        )}
      </div>
      
      <button onClick={handleSubmit} disabled={loading}>Log In</button>
      </form>
  )
}

export default AuthForm;