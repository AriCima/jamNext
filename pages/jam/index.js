import React, { useState, useEffect } from "react";

import { useSelector } from 'react-redux';

import { Div } from "../../styledComps";

import DataService from '../../services/DataService';
import Layout from '../../domains/Layout';
import NavBarJam from '../../domains/NavBarJam';
import LeftMenu from '../../domains/LeftMenu';



const Jams = () => {
    const { userId, userJams } = useSelector(state => state.userReducer);
    const renderJamsList = userJams.length > 0;

    return (
        <Layout leftMenu={<LeftMenu />}>
            <NavBarJam />
            <Div pad="50px" back="orange">
                {renderJamsList ? <p>select a Jam</p> : <p>You have no Jams yet, Create or Join</p>}
            </Div>
        </Layout>
    );
}

export default Jams;

