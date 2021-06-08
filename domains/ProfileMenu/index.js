import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { resetUserInfo } from '../../redux/actions/userActions';
import { Div, Txt, ProfileBox, MenuItem } from "../../styledComps";

const ProfileMenu = ({showProfileMenu}) => {
    const [showProfile, setShowProfile] = useState(false);

    const dispatch = useDispatch();

    const signOut = (e) => {
        e.preventDefault();
        firebase.auth().signOut()
        .then(() => {
          console.log('Logout')
          dispatch(resetUserInfo());
          router.push('/');
        })
        .catch(() => {
          alert("Ups! Seems you'll have to stay longer")// An error happened.
        });
    };

    return (
        <ProfileBox back="lightgray" show={showProfile} w="100%" col mgT="0" just="flex-start" align="flex-start">
            <Div w={'100%'} just="flex-end">
                <Div transf='rotate(45deg)' mgR="20px"
                    onClick={() => showProfileMenu()}
                >
                    <Txt fSize="28px" bold >+</Txt>
                </Div>
            </Div>
        
            <Link href="/user/user-1">
                <MenuItem pad={'10px 0'} w="100%" just="flex-start" align="center">
                    <Txt mgL="10px">Profile Info</Txt>
                </MenuItem>
            </Link>

            <Link href="/user/user-1/company">
                <MenuItem pad={'10px 0'} w="100%" just="flex-start" align="center">
                    <Txt mgL="10px">Company</Txt>
                </MenuItem>
            </Link>

            <MenuItem pad={'10px 0'} w="100%" just="flex-start" align="center"
                onClick={signOut}
            >
                <Txt mgL="10px">LogOut</Txt>
            </MenuItem>
        </ProfileBox>
    );
};

export default ProfileMenu;