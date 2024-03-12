import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const {loginWithRedirect} = useAuth0();
  const navigate = useNavigate();

  return (
    <>
      {/* <h1>React Google Login</h1>
      <GoogleLogin onSuccess={(response) => console.log(response)} onError={(err) => console.log(err)} /> */}
      <h1>Login Auth0</h1>
      <button onClick={() => loginWithRedirect({prompt: 'login'})}>Log in</button>
    </>
  )
}

export default Login