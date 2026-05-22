import React, { useEffect, useRef, useState } from 'react';

import Client from '../components/Client';
import Editor from '../components/Editor';

import { initSocket } from '../socket';

import ACTIONS from '../Actions';

import toast from 'react-hot-toast';

import {
    useLocation,
    useNavigate,
    useParams,
    Navigate,
} from 'react-router-dom';

const EditorPage = () => {

    const socketRef = useRef(null);

    const codeRef = useRef(null);

    const location = useLocation();

    const navigate = useNavigate();

    const { roomId } = useParams();

    const [clients, setClients] = useState([]);

    useEffect(() => {

        const init = async () => {

            socketRef.current = await initSocket();

            const handleErrors = (e) => {

                console.log('Socket Error', e);

                toast.error('Socket connection failed');

                navigate('/');
            };

            socketRef.current.on(
                'connect_error',
                handleErrors
            );

            socketRef.current.on(
                'connect_failed',
                handleErrors
            );

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                userName: location.state?.userName,
            });

            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, userName, socketId }) => {

                    if (
                        userName !== location.state?.userName
                    ) {
                        toast.success(
                            `${userName} joined the room`
                        );
                    }

                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                      code : codeRef.current,
                      socketId,
                    })
                }
            );

            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, userName }) => {

                    toast.success(
                        `${userName} left the room`
                    );

                    setClients((prev) => {

                        return prev.filter(
                            (client) =>
                                client.socketId !== socketId
                        );
                    });
                }
            );
        };

        init();

        return () => {

            if (socketRef.current) {

                socketRef.current.disconnect();

                socketRef.current.off(ACTIONS.JOINED);

                socketRef.current.off(ACTIONS.DISCONNECTED);
            }
        };

    }, []);

    async function copyRoomId() {

        try {

            await navigator.clipboard.writeText(roomId);

            toast.success('Room ID Copied');

        } catch (err) {

            toast.error('Unable to copy Room ID');
        }
    }

    function leaveRoom() {
        navigate('/');
    }

    if (!location.state) {
        return <Navigate to="/" />;
    }

    return (

        <div className='mainWrap'>

            <div className='aside'>

                <div className='asideInner'>

                    <div className='logo'>
                        <img
                            className='logoImage'
                            src='/code-sync.png'
                            alt='logo'
                        />
                    </div>

                    <h3>Connected</h3>

                    <div className='clientsList'>

                        {
                            clients.map((client) => (

                                <Client
                                    key={client.socketId}
                                    user={client.userName}
                                />
                            ))
                        }

                    </div>

                </div>

                <button
                    className='btn copyBtn'
                    onClick={copyRoomId}
                >
                    Copy ROOM ID
                </button>

                <button
                    className='btn leaveBtn'
                    onClick={leaveRoom}
                >
                    Leave
                </button>

            </div>

            <div className='editorWrap'>
                <Editor socketRef = {socketRef}  roomId = {roomId} onCodeChange = {(code) => {
                  codeRef.current = code;
                }} />
            </div>

        </div>
    );
};

export default EditorPage;