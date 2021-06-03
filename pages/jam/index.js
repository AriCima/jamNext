import React from "react";
import { useSelector } from 'react-redux';

import { Div } from "../../styledComps";
import Layout from '../../domains/Layout';
import NavBarJam from '../../domains/NavBarJam';



const Jams = () => {
    const { userJams } = useSelector(state => state.userReducer);
    const renderJamsList = userJams.length > 0;

    return (
        <Layout>
            <NavBarJam />
            <Div pad="50px" back="orange">
                {renderJamsList ? <p>select a Jam</p> : <p>You have no Jams yet, Create or Join</p>}
            </Div>
        </Layout>
    );
}

export default Jams;

