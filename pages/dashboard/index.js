import React, { useState, useEffect } from "react";
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { Div, Aside } from "../../styledComps";

import DataService from '../../services/DataService';
import { setJamInfo } from '../../redux/actions';
import JamsList from '../../domains/JamsList';
import NavBarJam from '../../domains/NavBarJam';
import Layout from '../../domains/Layout';
// import Jam from '../Jam';

const Dashboard = ({ jamId, setUserJams, userId, setJamInfo }) => {
    const [jamsList, setJamsList] = useState([]);

    // Use an effect hook to subscribe to the jams list item stream and
    // automatically unsubscribe when the component unmounts.
    useEffect(() => {
        if(userId) {
            const unsubscribe = DataService.getUserJams(userId, {
                next: querySnapshot => {
                    const jams = [];
                    querySnapshot.docs.map(docSnapshot => {
                        const j = docSnapshot.data();
                        j.id = docSnapshot.id;
                        jams.push(j);
                    });
                    setUserJams(jams);
                    setJamsList(jams);
                },
                error: () => console.log('failure')
            });
            return unsubscribe;
        }
    }, [userId]);

    useEffect(() => {
        jamId && getJamInfo(jamId, userId);
    }, [jamId]);

    const getJamInfo = async (jamId) => {
        const res = await DataService.getJamInfoById(jamId);
        console.log('res: ', res);
        setJamInfo(res); // Info en Redux
    };

    const renderJam = jamId && !isEmpty(jamInfo);
    const renderJamsList = jamsList.length > 0;

    return (
        <Layout >
            <Div pad='50px' flexG="0">Menu Contextual</Div>
            {renderJam ? 
                // <Jam />
                <Div>Jam</Div>
                :
                <Div pad="50px" back="orange">
                    {renderJamsList ? <p>select a Jam</p> :  <p>You have no Jams yet, Create or Join</p>}
                </Div>
            }
        </Layout>
    );
}

const mapStateToProps = state => {
    const {jamId} = state.jamReducer;
    const { userId, userJams } = state.userReducer;

    return { jamId, userId, userJams };
};

export default connect(mapStateToProps, { setJamInfo }) (Dashboard);

