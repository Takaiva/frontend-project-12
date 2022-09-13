import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Col, InputGroup, Form,
    //Button,
} from 'react-bootstrap';
import {
    selectors as channelsSelectors,
} from "../slices/channelsSlice.js";
import {
    selectors as messagesSelectors,
} from "../slices/messagesSlice.js";
import { useAuth, useApi } from '../hooks/index.js';


const ChatHeader = () => {
    const currentChannelId = useSelector((state) => state.channels.currentChannelId);
    const channels = useSelector(channelsSelectors.selectAll);
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    const messages = useSelector(messagesSelectors.selectAll);
    const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
    return (
        <div
            className="bg-light mb-4 p-3 pb-3 shadow-sm small"
            style={{"borderRadius": "0px 30px 0px 0px", "borderTop": "1px solid white"}}
        >
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
          {`: ${body}`}
      </div>
    );
};

const ChatBody = () => {
    const messages = useSelector(messagesSelectors.selectAll);
    const currentChannelId = useSelector((state) => state.channels.currentChannelId);
    const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
    const scrollRef = useRef();
    console.log(messages);
    console.log(currentChannelId);

    useEffect(() => {
        scrollRef.current.scrollTo({
            top: 10000,
            behavior: 'smooth',
        });
    }, [currentChannelMessages]);

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5" ref={scrollRef}>
            {currentChannelMessages && currentChannelMessages.map((message) => (
                <Message username={message.username} body={message.body} key={message.id} />
            ))}
        </div>
    );
};

const ChatInputField = () => {
    const [message, setMessage] = useState('');
    const channelId = useSelector((state) => state.channels.currentChannelId);
    const inputRef = useRef();
    const { getUserName } = useAuth();
    const username = getUserName();
    const { sendMessage } = useApi();
    const messageData = {
        body: message,
        username,
        channelId,
    };

    useEffect(() => {
       inputRef.current.focus();
    });

    const handleResponse = (response) => {
        if (response.status === 'ok') {
            setMessage('');
        } else {
            toast.error('Connection error');
        }
    }

    const handleMessage = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        sendMessage(messageData, handleResponse);
    }

  return (
      <div className="mt-auto px-5 py-3" >
          <Form
              className="py-1 rounded-2"
              style={{ "border": "1px solid rgba(112, 110, 110, 0.4)" }}
              noValidate
              onSubmit={handleSendMessage}
          >
              <InputGroup className="has-validation">
                  <Form.Control
                      name="body"
                      aria-label="New message"
                      placeholder="type in a message"
                      className="border-0 p-0 ps-2 bg-light"
                      ref={inputRef}
                      value={message}
                      onChange={handleMessage}
                  />
                  <button
                      type="submit"
                      id='sendMessage'
                      className="btn btn-group-vertical"
                      disabled={message === ''}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                          <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                      </svg>
                      <span className="visually-hidden">Send</span>
                  </button>
              </InputGroup>
          </Form>
      </div>
  );
};

const ChatLayout = () => {
    return (
      <Col className="p-0 h-100">
          <div
              className="d-flex flex-column h-100 bg-light"
              style={{
                  "borderRadius": "0px 32px 8px 0px",
                  "borderTop": "1px solid white",
                  "borderBottom": "1px solid white",
                  "borderRight": "1px solid white",
                  "borderLeft": "0px solid orange"
              }}
          >
              <ChatHeader />
              <ChatBody />
              <ChatInputField />
          </div>
      </Col>
    );
}

export default ChatLayout;
