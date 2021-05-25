import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { Div } from "../../styledComps";

import DataService from '../../services/DataService';
import { setJamInfo } from '../../redux/actions';
import Layout from '../../domains/Layout';
import NavBarJam  from '../../domains/NavBarJam';
import JamSection from '../../domains/JamSection';

const JamsId = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const { jamId } = router.query;

    const getJamInfo = async (jamId) => {
        const res = await DataService.getJamInfoById(jamId);
        console.log('res: ', res);
        dispatch(setJamInfo(res));
    };

    useEffect(() => {
        jamId && getJamInfo(jamId);
    }, [jamId]);


    const section = "overview";

    return (
        <Layout>
            <NavBarJam />
            <JamSection section={section}/>
        </Layout>
    );
}


export default JamsId;

