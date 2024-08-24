import React, { useState } from 'react';
import { useWebRTC } from '../context/WebRTCContext';

const ManualP2P: React.FC = () => {
    const { createOffer, createAnswer, setRemoteDescription, addIceCandidate, peerConnection } = useWebRTC();
    const [offer, setOffer] = useState('');
    const [answer, setAnswer] = useState('');
    const [remoteOffer, setRemoteOffer] = useState('');
    const [remoteAnswer, setRemoteAnswer] = useState('');
    const [iceCandidate, setIceCandidate] = useState('');
    const [remoteIceCandidate, setRemoteIceCandidate] = useState('');

    const handleCreateOffer = async () => {
        await createOffer();
        const localDescription = peerConnection?.localDescription;
        if (localDescription) {
            setOffer(JSON.stringify(localDescription));
        }
    };

    const handleReceiveOffer = async () => {
        const parsedOffer = JSON.parse(remoteOffer);

        if (peerConnection?.signalingState === "stable") {
            await setRemoteDescription(parsedOffer);
            if (peerConnection.signalingState === "have-remote-offer") {
                await createAnswer();
                const localDescription = peerConnection?.localDescription;
                if (localDescription) {
                    setAnswer(JSON.stringify(localDescription));
                }
            } else {
                console.warn("Cannot create answer, signaling state is not have-remote-offer.");
            }
        } else {
            console.warn("Peer connection is not in a stable state to receive an offer.");
        }
    };


    const handleSetAnswer = async () => {
        const parsedAnswer = JSON.parse(remoteAnswer);

        if (peerConnection?.signalingState === "have-local-offer") {
            await setRemoteDescription(parsedAnswer);
        } else {
            console.warn("Peer connection is not in a state to set the remote answer.");
        }
    };

    const handleAddIceCandidate = async () => {
        await addIceCandidate(JSON.parse(remoteIceCandidate));
    };

    return (
        <div>
            <h3>Jugador A</h3>
            <button onClick={handleCreateOffer}>Crear Oferta</button>
            <textarea value={offer} readOnly />

            <h3>Jugador B</h3>
            <textarea
                placeholder="Pega la oferta de Jugador A aquí"
                value={remoteOffer}
                onChange={(e) => setRemoteOffer(e.target.value)}
            />
            <button onClick={handleReceiveOffer}>Aceptar Oferta y Crear Respuesta</button>
            <textarea value={answer} readOnly />

            <h3>Jugador A</h3>
            <textarea
                placeholder="Pega la respuesta de Jugador B aquí"
                value={remoteAnswer}
                onChange={(e) => setRemoteAnswer(e.target.value)}
            />
            <button onClick={handleSetAnswer}>Aceptar Respuesta</button>

            <h3>Intercambio de ICE Candidates</h3>
            <textarea
                placeholder="Pega el ICE candidate del otro jugador aquí"
                value={remoteIceCandidate}
                onChange={(e) => setRemoteIceCandidate(e.target.value)}
            />
            <button onClick={handleAddIceCandidate}>Agregar ICE Candidate</button>
        </div>
    );
};

export default ManualP2P;
