import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import classes from './selection.module.css';
import { setCredentials } from "../../store/authSlice";

function Header() {
  const userName = useSelector(state=> state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(setCredentials({user: null, token: null}));
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div className={classes['header']}>
      <p>
        Hi, {userName}
      </p>
      <button onClick={logOutHandler}>
        Log out
      </button>
    </div>
  )
}

export default Header