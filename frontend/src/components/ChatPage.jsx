import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { useAuth } from "../hooks";
import fetchData from '../thunks/fetchData.js';
import Channels from './Channels.jsx';
import ChatLayout from './ChatLayout.jsx';


const ChatPage = () => {
    const dispatch = useDispatch();
    const { getAuthHeader } = useAuth();
    const header = getAuthHeader();

    useEffect(() => {
        dispatch(fetchData(header));
    }, [header, dispatch]);

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow" id="wallpaper">
            <Row className="h-100 bg-light flex-md-row">
                <Channels />
                <ChatLayout />
            </Row>
        </Container>
    )
};

export default  ChatPage;


