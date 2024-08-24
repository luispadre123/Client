import React, { useState } from 'react';
import Login from '../views/Login';
import Register from '../views/Register';
import CustomTitleBar from './CustomTitleBar';
import ManualP2P from "./ManualP2P.tsx";


const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <>
            <CustomTitleBar />
            <ManualP2P/>
            {/*<div className="ui middle aligned center aligned grid">*/}
            {/*    <div className="column" style={{ maxWidth: 450 }}>*/}
            {/*        {isLogin ? (*/}
            {/*            <>*/}
            {/*                <Login >*/}
            {/*                <div className="ui message">*/}
            {/*                    ¿Nuevo aquí? <a href="#" onClick={toggleAuthMode}>Regístrate</a>*/}
            {/*                </div>*/}
            {/*                </Login>*/}
            {/*                */}
            {/*            </>*/}
            {/*        ) : (*/}
            {/*            <>*/}
            {/*                <Register >*/}
            {/*                <div className="ui message">*/}
            {/*                    ¿Ya tienes una cuenta? <a href="#" onClick={toggleAuthMode}>Inicia Sesión</a>*/}
            {/*                </div>*/}
            {/*                </Register>*/}
            {/*            </>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default Auth;
