import React from 'react';
import logo from './login.svg';
import { Banner } from 'rebass';

function Login() {
  return (
    <Banner
      backgroundImage="https://d262ilb51hltx0.cloudfront.net/max/2000/1*DZwdGMaeu-rvTroJYui6Uw.jpeg"
    >
      <div className="container">
        <a
          href="/auth/spotify"
          dangerouslySetInnerHTML={{__html: logo}}>
        </a>
      </div>

    </Banner>
  );
}

export default Login;
