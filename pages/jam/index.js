import React, { useState, useEffect } from "react";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserJams } from '../../redux/actions/userActions';

import { useRouter } from 'next/router';

import { Div } from "../../styledComps";

import DataService from '../../services/DataService';
import Layout from '../../domains/Layout';
import NavBarJam from '../../domains/NavBarJam';

const Jams = () => {
    const { userId, userJams } = useSelector(state => state.userReducer);
    // const { jamId } = useSelector(state => state.jamReducer);

    // const getJamInfo = async (jamId) => {
    //     const res = await DataService.getJamInfoById(jamId);
    //     setJamInfo(res); // Info en Redux
    // };

    // useEffect(() => {
    //     jamId && getJamInfo(jamId, userId);
    // }, [jamId]);


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

