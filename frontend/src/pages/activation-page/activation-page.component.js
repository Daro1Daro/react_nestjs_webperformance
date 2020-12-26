import React from 'react';

import './activation-page.styles.scss';

const ActivationPage = ({ match: { params: { token } } }) => {
  console.log(token);

  return (
    <div>
      Activation Page
    </div>
  );
};

export default ActivationPage;
