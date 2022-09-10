import React, { useRef, useEffect } from 'react';
import { useSelector } from "react-redux";
import {Col, InputGroup, Form, Button } from 'react-bootstrap';
import { selectors as channelsSelectors} from "../slices/channelsSlice.js";
import { selectors as messagesSelectors } from "../slices/chatFieldSlice.js";
//import { useAuth } from '../hooks/index.js';


const ChatHeader = () => {
    const currentChannelId = useSelector((state) => state.channels.currentChannelId);
    const channels = useSelector(channelsSelectors.selectAll);
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    const messages = useSelector(messagesSelectors.selectAll);
    const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
    return (
        <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="mb-0">
                <b>
                    {'# '}
                    {currentChannel ? currentChannel.name : null}
                </b>
            </p>
            <span className="text-muted">{`Overall messages: ${currentChannelMessages.length}`}</span>
        </div>
    );
};

const Message = ({ username, body }) => {
    return (
      <div className="text-break mb-2">
          <b>{username}</b>
          {': '}
          {body}
      </div>
    );
};

const ChatBody = () => {
    const messages = useSelector(messagesSelectors.selectAll);
    const currentChannelId = useSelector((state) => state.channels.currentChannelId);
    const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5">
            {currentChannelMessages && currentChannelMessages.map((m) => (
                <Message username={m.username} body={m.body} key={m.id} />
            ))}
        </div>
    );
};

const ChatField = () => {
    //const [message, setMessage] = useState('');
    const inputRef = useRef();
    //const { getUsername } = useAuth();
    //const username = getUsername();
    //const currentChannelId = useSelector((state) => state.channels.currentChannelId);

    useEffect(() => {
       inputRef.current.focus();
    });

  return (
      <div className="mt-auto px-5 py-3">
          <Form
              className="py-1 border rounder-2"
              noValidate
              //onSubmit

          >
              <InputGroup>
                  <Form.Control
                      name="body"
                      aria-label="New message"
                      placeholder="type in a message"
                      className="border-0 p-0 ps-2"
                      ref={inputRef}
                      //value
                      //onChange
                  />
                  <Button
                      type="submit"
                      className="rounder"
                      variant="outline-primary"
                      //disabled
                  >
                      <span >Send</span>
                  </Button>
              </InputGroup>
          </Form>
      </div>
  );
};

const ChatLayout = () => {
    return (
      <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100 bg-light">
              <ChatHeader />
              <ChatBody />
              <ChatField />
          </div>
      </Col>
    );
}

export default ChatLayout;
