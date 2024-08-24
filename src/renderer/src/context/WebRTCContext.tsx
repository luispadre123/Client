import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WebRTCContextType {
    peerConnection: RTCPeerConnection | null;
    createOffer: () => Promise<void>;
    createAnswer: () => Promise<void>;
    setRemoteDescription: (description: RTCSessionDescriptionInit) => Promise<void>;
    addIceCandidate: (candidate: RTCIceCandidateInit) => Promise<void>;
}

const WebRTCContext = createContext<WebRTCContextType | undefined>(undefined);

export const WebRTCProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

    useEffect(() => {
        const iceServers = window.api.getIceServers();
        const pc = new RTCPeerConnection({ iceServers });

        setPeerConnection(pc);

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('New ICE candidate:', event.candidate);
                // Aquí envías la ICE candidate al otro peer
            }
        };

        pc.ontrack = (event) => {
            console.log('New track received:', event.streams);
            // Aquí puedes manejar la recepción de streams de media (video, audio)
        };

        return () => {
            pc.close();
        };
    }, []);

    const createOffer = async () => {
        if (peerConnection) {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            console.log('Offer created:', offer);
            // Aquí envías la oferta al otro peer
        }
    };

    const createAnswer = async () => {
        if (peerConnection) {
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            console.log('Answer created:', answer);
            // Aquí envías la respuesta al otro peer
        }
    };

    const setRemoteDescription = async (description: RTCSessionDescriptionInit) => {
        if (peerConnection) {
            if (peerConnection.signalingState === "have-local-offer" || peerConnection.signalingState === "have-remote-offer") {
                await peerConnection.setRemoteDescription(description);
                console.log('Remote description set:', description);
            } else {
                console.warn(`Cannot set remote description in state: ${peerConnection.signalingState}`);
            }
        }
    };


    const addIceCandidate = async (candidate: RTCIceCandidateInit) => {
        if (peerConnection) {
            await peerConnection.addIceCandidate(candidate);
            console.log('ICE candidate added:', candidate);
        }
    };

    return (
        <WebRTCContext.Provider value={{ peerConnection, createOffer, createAnswer, setRemoteDescription, addIceCandidate }}>
            {children}
        </WebRTCContext.Provider>
    );
};

export const useWebRTC = (): WebRTCContextType => {
    const context = useContext(WebRTCContext);
    if (!context) {
        throw new Error('useWebRTC must be used within a WebRTCProvider');
    }
    return context;
};
