import React, { useState, useEffect } from "react";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserJams } from '../../redux/actions/userActions';
import Link from 'next/Link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';

import { Div, Txt, ProfileBox, MenuItem } from "../../styledComps";

import DataService from '../../services/DataService';
import Layout from '../../domains/Layout';
import NavBarJam from '../../domains/NavBarJam';
import JamsList from "../../domains/JamsList";
import { resetUserInfo } from '../../redux/actions/userActions';

const NavBarIcon = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin: 0;
  color: rgba(85, 187, 151, 1);
  &:hover{
    color: rgba(85, 187, 151, 0.6);
  }
`;

const LeftMenu = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCreate, setShowCreate] = useState(true);

    const dispatch = useDispatch()

    const signOut = (e) => {
        e.preventDefault();
        firebase.auth().signOut()
        .then(() => {
          // alert('See you later');
          // localStorage.setItem('userId', '');
          console.log('Logout')
          dispatch(resetUserInfo());
          router.push('/');
        })
        .catch(() => {
          alert("Ups! Seems you'll have to stay longer")// An error happened.
        });
      };
    
      const showProfileMenu = () => {
        setShowProfile(!showProfile);
      };

    return (
        <div>
            <Div className="AppNavBar" minH="60px" mgL="10px" mgR="10px" flexG="0" just="space-between" align="center">
                <NavBarIcon className="Join-button" fSize="36px"
                onClick={() => {
                    setShowModal(true);
                    setShowCreate(false);
                }}
                >
                    <FontAwesomeIcon icon={faCheck}/>
                </NavBarIcon>
                <NavBarIcon className="Create-button" cfSize="36px"
                onClick={() => {
                    setShowModal(true);
                    setShowCreate(true);
                }}
                >
                    <FontAwesomeIcon icon={faPlus}/>
                </NavBarIcon>
                <NavBarIcon className="Profile-button" fSize="36px"onClick={() => showProfileMenu()}>
                    <FontAwesomeIcon icon={faUser}/>
                </NavBarIcon>
            </Div>
            <ProfileBox back="lightgray" show={showProfile} w="100%" col mgT="0" just="flex-start" align="flex-start">
                <Div w={'100%'} just="flex-end">
                    <Div transf='rotate(45deg)' mgR="20px"
                        onClick={e => showProfileMenu(e)}
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

            <Div className="JamsList" col back="blue" h="100%" w="100%">
                <JamsList/>
            </Div>
    </div>
  )
}

export default LeftMenu;