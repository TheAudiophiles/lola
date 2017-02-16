import React from 'react';

/**
 * Our error page
 * Displays the error
 */
export default ({params}) => {
  // injected via react-router
  const { errorMsg } = params;
  return (
    <div className="error">
      <h2>An Error Occured</h2>
      <p>{errorMsg}</p>
    </div>
  );
}
