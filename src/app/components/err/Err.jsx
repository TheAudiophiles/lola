import React from 'react';
import { Banner } from 'rebass';

/**
 * Our error page
 * Displays the error
 */
export default ({params}) => {
  // injected via react-router
  const { errorMsg } = params;
  return (
    <Banner>
      <div className="error">
        <h2>An Error Occured</h2>
        <p>{errorMsg}</p>
      </div>
    </Banner>
  );
}
