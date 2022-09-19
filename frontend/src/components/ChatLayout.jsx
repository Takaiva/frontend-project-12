import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Col, InputGroup, Form } from 'react-bootstrap';

import filter from 'leo-profanity';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';

import { useAuth, useApi } from '../hooks/index.js';

function ChatHeader() {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  return (
      <div
          className="bg-light mb-4 p-3 pb-3 shadow-sm small"
          style={{ borderRadius: '0px 30px 0px 0px', borderTop: '1px solid white' }}
      >
          <p className="mb-0">
              <b>
                  {'# '}

                  {currentChannel ? currentChannel.name : null}
              </b>
          </p>

          <span className="text-muted">
              {t('chat.messagesCount', { count: currentChannelMessages.length })}
          </span>
      </div>
  );
}

function Message({ username, message }) {
  return (<div className="text-break mb-2">
      <b>
          {username}
      </b>

      {`: ${message}`}
  </div>);
}

function ChatBody() {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTo({
      top: 10000,
      behavior: 'smooth',
    });
  }, [currentChannelMessages]);

  return (
      <div
          className="chat-messages overflow-auto px-5"
          id="messages-box"
          ref={scrollRef}
      >
          {currentChannelMessages ? currentChannelMessages.map((message) => (
              <Message
                  key={message.id}
                  message={message.body}
                  username={message.username}
              />
          )) : null}
      </div>
  );
}

function ChatInputField() {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const inputRef = useRef();
  const { getUserName } = useAuth();
  const username = getUserName();
  const { sendMessage } = useApi();
  const messageData = {
    body: filter.clean(message),
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
      toast.error(t('errors.network'));
    }
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(messageData, handleResponse);
  };

  return (
      <div className="mt-auto px-5 py-3" >
          <Form
              className="py-1 rounded-2"
              noValidate
              onSubmit={handleSendMessage}
              style={{ border: '1px solid rgba(112, 110, 110, 0.4)' }}
          >
              <InputGroup className="has-validation">
                  <Form.Control
                      aria-label={t('chat.newMessageAriaLabel')}
                      className="border-0 p-0 ps-2 bg-light"
                      name="body"
                      onChange={handleMessage}
                      placeholder={t('chat.newMessagePlaceholder')}
                      ref={inputRef}
                      value={message}
                  />

                  <button
                      className="btn btn-group-vertical"
                      disabled={message === ''}
                      id="sendMessageButton"
                      type="submit"
                  >
                      <svg
                          fill="currentColor"
                          height="20"
                          viewBox="0 0 16 16"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <path
                              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                              fillRule="evenodd"
                          />
                      </svg>

                      <span className="visually-hidden">
                          {t('chat.sendMessageButton')}
                      </span>
                  </button>
              </InputGroup>
          </Form>
      </div>
  );
}

function ChatLayout() {
  return (<Col className="p-0 h-100">
      <div
          className="d-flex flex-column h-100 bg-light"
          style={{
            borderRadius: '0px 32px 8px 0px',
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
            borderRight: '1px solid white',
            borderLeft: '0px solid orange',
          }}
      >
          <ChatHeader />

          <ChatBody />

          <ChatInputField />
      </div>
          </Col>);
}

export default ChatLayout;
