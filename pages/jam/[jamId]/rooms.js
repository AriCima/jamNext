import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setJamInfo } from '../../../redux/actions';

import Layout from '../../../domains/Layout';
import { Div, Txt, SubTitle} from "../../../styledComps";
import NavBarJam  from '../../../domains/NavBarJam';
import DataService from '../../../services/DataService';


const Rooms = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const { jamId } = router.query;
    const { jamName } = useSelector(state => state.jamReducer);

    const getJamInfo = async (jamId) => {
        const res = await DataService.getJamInfoById(jamId);
        dispatch(setJamInfo(res));
    };

    useEffect(() => {
        jamId && getJamInfo(jamId);
    }, [jamId]);

    return (
        <Layout>
            <NavBarJam />
            <Div col pad="50px" back="orange">
                <SubTitle>Rooms</SubTitle>
                <Txt>JamName: {jamName}</Txt>
                <Txt>JamId: {jamId}</Txt>
            </Div>
        </Layout>
    );
};

export default Rooms;