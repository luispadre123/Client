import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../components/Auth";
import GameLobby from "../views/Loby";
import {useAuth} from "../context/Auth.Context.tsx";


const AppRouter: React.FC = () => {
    const { data } = useAuth();  // Aquí `useAuth` está seguro porque `AppRouter` está envuelto en `AuthContextProvider`

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={data.token && data.token !== "undefined" ? <GameLobby /> : <Auth />}
                />
                <Route path="/create-room" element={<div>Create Room</div>} />
                <Route path="/join-room" element={<div>Join Room</div>} />
                <Route path="/settings" element={<div>Settings</div>} />
                {/* Puedes agregar el Example como ruta o en otro lugar */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
