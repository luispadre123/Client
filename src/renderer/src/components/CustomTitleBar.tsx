import React, { useState, useEffect } from 'react';

const CustomTitleBar: React.FC = () => {
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const handleMaximize = () => setIsMaximized(true);
        const handleUnmaximize = () => setIsMaximized(false);

        if (window.api) {
            window.api.onWindowMaximize(handleMaximize);
            window.api.onWindowUnmaximize(handleUnmaximize);
        }

        return () => {
            if (window.api) {
                window.api.offWindowMaximize(handleMaximize);
                window.api.offWindowUnmaximize(handleUnmaximize);
            }
        };
    }, []);

    const minimizeWindow = () => {
        if (window.api && window.api.minimizeWindow) {
            window.api.minimizeWindow();
        }
    };

    const closeWindow = () => {
        if (window.api && window.api.closeWindow) {
            window.api.closeWindow();
        }
    };

    const toggleMaximizeWindow = () => {
        if (window.api && window.api.maximizeWindow) {
            if (isMaximized) {
                window.api.unmaximizeWindow();
            } else {
                window.api.maximizeWindow();
            }
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#2C2C2C',
            padding: '5px 10px',
            color: '#FFF',
            // WebkitAppRegion: 'drag',
            // userSelect: 'none',
            // position: "absolute",
            // width: "100vw",
            // top:0
        }}>
            <div style={{ WebkitAppRegion: 'no-drag' }}>
                <h3 style={{ margin: 0, color: '#FFF', fontSize: '16px', fontWeight: 'normal' }}>Mi Aplicación</h3>
            </div>
            <div style={{ display: 'flex', gap: '8px', WebkitAppRegion: 'no-drag' }}>
                <button
                    className="ui icon button"
                    onClick={minimizeWindow}
                    style={{
                        backgroundColor: 'transparent',
                        color: '#FFF',
                        border: 'none',
                        padding: '5px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#555'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <i className="si-minus"></i>
                </button>
                <button
                    className="ui icon button"
                    onClick={toggleMaximizeWindow}
                    style={{
                        backgroundColor: 'transparent',
                        color: '#FFF',
                        border: 'none',
                        padding: '5px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#555'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <i className={isMaximized ? "si-arrows-minimize" : "si-arrows-maximize"}></i>
                </button>
                <button
                    className="ui icon button"
                    onClick={closeWindow}
                    style={{
                        backgroundColor: 'transparent',
                        color: '#FFF',
                        border: 'none',
                        padding: '5px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E81123'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <i className="si-close"></i>
                </button>
            </div>
        </div>
    );
};

export default CustomTitleBar;
