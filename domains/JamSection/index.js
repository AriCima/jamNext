import React from 'react';
import { useSelector } from 'react-redux';

import { Div } from "../../styledComps";

const JamSection = () => {
    
    const { jamId } = useSelector(state => state.userReducer);
    console.log('jamId: ', jamId);

    return (
        <Div className="jam-content">
            {jamId}
        </Div>
    );
};

export default JamSection;
