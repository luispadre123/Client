import React, { useEffect, useState } from 'react';
import Register from '../views/Register';
import CustomTitleBar from './CustomTitleBar';
import LoginJAPG from '../views/Login/index';

const Auth: React.FC = () => {
    const [isRegister, setIsRegister] = useState(false);

    const toggleForm = () => {
        setIsRegister((prevIsRegister) => !prevIsRegister);
    };

    useEffect(() => {
        if (window.api.resizeWindow) {
            if (isRegister) {
                window.api.resizeWindow(460, 690);
            } else {
                window.api.resizeWindow(400, 480);
            }
        }
    }, [isRegister]);

    return (
        <>
            <CustomTitleBar />
            <LoginJAPG toggleForm={toggleForm} isRegister={isRegister}></LoginJAPG>
        </>
    );
};

export default Auth;
