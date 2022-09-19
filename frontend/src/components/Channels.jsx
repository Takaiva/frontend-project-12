import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  ButtonGroup, Nav, Col, Dropdown,
} from 'react-bootstrap';

import { actions as channelsActions, selectors } from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalSlice.js';

function Channel(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channel, currentChannelId } = props.data;
  const isActiveChannel = channel.id === currentChannelId ? 'activeChannel' : '';

  const notRemovableChannel = (
    <Nav.Item
      as="li"
      className="w-100"
      >
      <button
        className={`btn w-100 text-start text-truncate mt-1 pb-2 pt-2 bg-white ${isActiveChannel}`}
        id="channel"
        onClick={() => dispatch(channelsActions.changeChannel(channel.id))}
        type="button"
          >
        <span className="me-1">
          #
        </span>

        {channel.name}
      </button>
    </Nav.Item>
  );

  const removableChannel = (
    <Nav.Item
      as="li"
      className="w-100"
      >
      <Dropdown
        as={ButtonGroup}
        className={`d-flex mt-1 ${isActiveChannel}`}
        id="channel"
          >
        <button
          className="w-100 btn border-0 text-start pb-2 pt-2 bg-white text-truncate bg-transparent"
          onClick={() => dispatch(channelsActions.changeChannel(channel.id))}
          type="button"
              >
          <span className="me-1">
            #
          </span>

          {channel.name}
        </button>

        <Dropdown.Toggle
          aria-expanded="false"
          className="flex-grow-0 dropdown-toggle-split"
              >
          <span className="visually-hidden">
            {t('chat.editChannel')}
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(modalActions.openModalWindow({
            type: 'renameChannel',
            item: channel,
          }))}
                  >
            {t('chat.renameChannelItem')}
          </Dropdown.Item>

          <Dropdown.Item onClick={() => dispatch(modalActions.openModalWindow({
            type: 'removeChannel',
            item: channel,
          }))}
                  >
            {t('chat.removeChannelItem')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );

  return channel.removable ? removableChannel : notRemovableChannel;
}

function Channels() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
    <Col
      className="border-end pt-3 px-0 bg-light"
      md={2}
      style={{ borderRadius: '8px 0px 0px 34px', border: '1px solid white' }}
      xs={4}
      >
      <div
        className="d-flex flex-wrap mb-2 ps-xxl-4 ps-xl-3 pb-3 pe-2 shadow-sm align-items-center justify-content-between"
          >
        <span style={{ fontSize: '1.8rem' }}>
          {t('chat.channels')}
        </span>

        <button
          className="p-0 add-channel bg-light"
          onClick={() => dispatch(modalActions.openModalWindow({ type: 'addingChannel', item: null }))}
          style={{ width: '2.2rem' }}
          type="button"
              >
          +
        </button>
      </div>

      <div>
        <Nav
          as="ul"
          className="px-2"
          fill
          variant="pills"
              >
          {channels.map((channel) => (
            <Channel
              data={{ channel, currentChannelId }}
              key={channel.id}
                      />
          ))}
        </Nav>
      </div>
    </Col>
  );
}

export default Channels;
