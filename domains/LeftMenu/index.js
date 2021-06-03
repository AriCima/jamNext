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
        <Div className="LeftMenu" col >
            <LeftNavBar openModal={openModal} showCreate={showCreate}/>
            {showProfile && <ProfileMenu showProfileMenu={showProfileMenu}/>}
            <JamsList/>
        </Div>
    )
}

export default LeftMenu;