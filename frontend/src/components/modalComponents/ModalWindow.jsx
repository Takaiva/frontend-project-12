import React from 'react';
import { useSelector } from 'react-redux';
import AddChannel from "./AddChannel.jsx";
import RenameChannel from "./RenameChannel.jsx";
import RemoveChannel from "./RemoveChannel.jsx";

const modals = {
  addingChannel: AddChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
};

const ModalWindow = () => {
  const modalType = useSelector((state) => state.modal.type);
  const Modal = modals[modalType];
  if (!Modal) {
    return null;
  }
  return (
        <Modal />
  );
};

export default ModalWindow;
