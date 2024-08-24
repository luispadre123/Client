import React, { useState } from 'react';
// import Login from '../views/Login';
import Register from '../views/Register';
import CustomTitleBar from './CustomTitleBar';
import LoginJAPG from '../views/Login/index';


const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <>
            <CustomTitleBar />
            <LoginJAPG></LoginJAPG>
        </>
    );
};

export default Auth;
