import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import { connect } from 'react-redux';
import { Div } from "../../styledComps";

import DataService from '../../services/DataService';
import { setJamInfo } from '../../redux/actions';
import Layout from '../../domains/Layout';

const JamsId = ({ userId, setJamInfo }) => {

    const router = useRouter();
    const { jamId } = router.query;

    const getJamInfo = async (jamId) => {
        const res = await DataService.getJamInfoById(jamId);
        setJamInfo(res);
    };

    useEffect(() => {
        jamId && getJamInfo(jamId);
    }, [jamId]);



    return (
        <Layout>
            <Div back="lightgray" h="60px" flexG="0" just="center" align="center">Menu Contextual</Div>
            <Div pad="50px" back="orange">
                Contenido del Jam
            </Div>
        </Layout>
    );
}

const mapStateToProps = state => {
    const {jamDesc} = state.jamReducer;
    const { userId, userJams } = state.userReducer;

    return { jamDesc, userId, userJams };
};

export default connect(mapStateToProps, { setJamInfo }) (JamsId);

