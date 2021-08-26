import React, { useState } from "react";
import { Div } from "../../styledComps";

import LeftNavBar from '../../domains/LeftNavBar';
import ProfileMenu from '../../domains/ProfileMenu';
import JamsList from "../../domains/JamsList";

const LeftMenu = ({openModal, showCreate}) => {
    const [showProfile, setShowProfile] = useState(false);

    const showProfileMenu = () => {
        setShowProfile(!showProfile);
    };
    return (
        <Div shad="8px 0 21px -13px #DFDFDF" className="LeftMenu" col flexG="0.2">
            <LeftNavBar openModal={openModal} showCreate={showCreate}/>
            {showProfile && <ProfileMenu showProfileMenu={showProfileMenu}/>}
            <JamsList/>
        </Div>
    )
}

export default LeftMenu;