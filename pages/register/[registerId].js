import React from 'react';
import { useRouter } from 'next/router';

const RegisterId = () => {

    const router = useRouter();
    const {registerId} = router.query;

    return (
        <div>
            {registerId}
        </div>
    );
};

export default RegisterId;