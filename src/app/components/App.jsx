import React, { PropTypes } from 'react';
import Header from '../containers/header/Header';

function App({ children }) {
  const showHeader = () => {
    if (children.type.name !== 'Login') {
      return <Header />;
    }
  };

  return (
    <div>
      {showHeader()}
      {children}
    </div>
  );
}

App.propTypes = { children: PropTypes.object };

export default App;
