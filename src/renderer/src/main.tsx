import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './context'





import { useState } from 'react';


const AppSelector: React.FC = () => {
    const [appPath, setAppPath] = useState<string | null>(null);

    const handleSelectApp = async () => {
        const selectedAppPath = await window.api.selectApp();
        if (selectedAppPath) {
            setAppPath(selectedAppPath);
            // Guardar la ruta seleccionada en la base de datos
            await window.api.insertDocument({ type: 'app', path: selectedAppPath });
        }
    };

    const handleOpenApp = async () => {
        if (appPath) {
            await window.api.openApp(appPath);
        } else {
            console.error('No hay ninguna aplicación seleccionada.');
        }
    };

    return (
        <div>
            <button onClick={handleSelectApp}>Seleccionar Aplicación</button>
            {appPath && (
                <>
                    <p>Ruta seleccionada: {appPath}</p>
                    <button onClick={handleOpenApp}>Abrir Aplicación</button>
                </>
            )}
        </div>
    );
};


export default AppSelector;


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <AppSelector />
    </React.StrictMode>
);