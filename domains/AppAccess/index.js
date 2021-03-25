import React, { useState } from 'react';

import Login from './Login';
import Register from './Register';
import Div from '../../styledComps/divs';

const AppAccess = () => {

    const [showRegister, setShowRegister] = useState(false);

    const changeView = (x) => {
        setShowRegister(x)
    }

    return (
        <Div w="80%" col>
            {showRegister ? <Register updateView={changeView}/> : <Login updateView={changeView}/>}
        </Div>

    )
}

export default AppAccess;