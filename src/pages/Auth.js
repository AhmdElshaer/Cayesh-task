import { useEffect } from "react";
import AuthForm from "../components/auth/AuthForm";
import { useNavigate } from 'react-router-dom';


function Auth() {
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      navigate('/selection');
    }
  },[navigate])
  
  return (
    <div className="auth">
      <AuthForm />
    </div>
  )
}

export default Auth