import React from 'react';
import logo from './login.svg';

function Login() {
  return (
    <div className="container login">
      <a
        href="/auth/spotify"
        dangerouslySetInnerHTML={{__html: logo}}>
      </a>
    </div>
  );
}

export default Login;
