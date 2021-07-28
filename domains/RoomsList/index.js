import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import isEmpty from 'lodash/isEmpty';
import {
  Div, RoomCover, SubTitle, Txt,
} from '../../styledComps';

const RoomsList = (rooms) => {
  const router = useRouter();
  const { jamId } = router.query;

  return (

  );
};

export default RoomsList;
