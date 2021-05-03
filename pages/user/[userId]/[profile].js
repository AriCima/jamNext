import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../domains/Layout';

const ProfileInfo = () => {
  const router = useRouter();
  const { userId, profile, name, surname } = router.query;
  console.log(userId, profile, name, surname);
  return (
    <Layout>
      <p>Hola que tal</p>
    </Layout>
  );
};

export default ProfileInfo;