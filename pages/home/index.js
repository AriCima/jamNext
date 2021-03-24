import React, { useState } from 'react';

import Login from '../../domains/Login';
import Register from '../../domains/Register';
import Div from '../../styledComps/divs';

const Home = () => {

    const [showRegister, setShowRegister] = useState(false)

    const updateView = (view) => {
        view === 'register' ? setShowRegister(true) : setShowRegister(false)
    };

    return (
        <Div col>
            {showRegister ? <Register updateView={updateView(view)}/> : <Login updateView={updateView(view)}/>}
        </Div>

    )
}

export default Home;