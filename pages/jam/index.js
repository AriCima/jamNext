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
    const [jamsList, setJamsList] = useState([]);
    const { userId } = useSelector(state => state.userReducer);
    
    const router = useRouter();
    const { jamId } = router.query;
    
    const dispatch = useDispatch()

    const getUserJams = async () => {
        try{
            const jams = await DataService.getUserJams(userId)
            dispatch(setUserJams(jams)); 
            setJamsList(jams); 
        }catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        console.log('userId: ', userId);
        userId && getUserJams()
        /* if(userId) {
            getUserJams()
            // const unsubscribe = DataService.getUserJams(userId, {
            //     next: querySnapshot => {
            //         const jams = [];
            //         querySnapshot.docs.map(docSnapshot => {
            //             const j = docSnapshot.data();
            //             j.id = docSnapshot.id;
            //             jams.push(j);
            //         });
            //         setJamsList(jams);
            //     },
            //     error: () => console.log('failure')
            // // });
            // return unsubscribe;
        } */
    }, [userId]);
    
    const getJamInfo = async (jamId) => {
        const res = await DataService.getJamInfoById(jamId);
        setJamInfo(res); // Info en Redux
    };

    useEffect(() => {
        jamId && getJamInfo(jamId, userId);
    }, [jamId]);


    const renderJamsList = jamsList.length > 0;

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

