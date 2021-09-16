import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import RegisterForm from '../../domains/RegisterForm';

const RegisterId = () => {
  const { userId } = useSelector((state) => state.userReducer);
  const router = useRouter();
  const { registerId } = router.query;

  const getInvitationInfo = () => {
    console.log(registerId);
  };

  useEffect(() => {
    userId && getInvitationInfo(registerId);
  }, [userId, registerId]);

  return (
    <div>
      {userId ? (
        registerId
      ) : (
        <RegisterForm />
      )}
    </div>
  );
};

export default RegisterId;
