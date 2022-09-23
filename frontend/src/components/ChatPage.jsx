import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Row } from 'react-bootstrap';
import { useAuth } from '../hooks';
import fetchData from '../thunks/fetchData.js';
import Channels from './Channels.jsx';
import ChatLayout from './ChatLayout.jsx';

function ChatPage() {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const header = getAuthHeader();

  useEffect(() => {
    dispatch(fetchData(header));
  }, [header, dispatch]);

  return (
    <Container
      className="h-100 my-4 overflow-hidden rounded shadow"
      id="wallpaper"
    >
      <Row
        className="h-100 bg-light flex-md-row"
        style={{ borderRadius: '10px 35px 10px 35px', border: '3px solid #04DAF6' }}
      >
        <Channels />

        <ChatLayout />
      </Row>
    </Container>
  );
}

export default ChatPage;
