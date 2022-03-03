import Alert from 'react-bootstrap/Alert'

import React from 'react';

const AlertMessage = ({info}) => {
    return info === null ? null : (<Alert>{info.message}</Alert>)
}

export default AlertMessage;
