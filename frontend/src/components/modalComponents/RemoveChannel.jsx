import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Modal } from "react-bootstrap";

import { actions as modalActions } from "../../slices/modalSlice";
import { useApi } from "../../hooks";

const RemoveChannel = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isDisabled, setDisabled] = useState(false);
    const { removeChannel } = useApi();
    const channelBeingEdited = useSelector(state => state.modal.item);

    const handleResponse = (response) => {
        if (response.status === 'ok') {
            toast.success(t('notifications.removeChannelSuccess'));
            dispatch(modalActions.closeModalWindow());
        } else {
            toast.error(t('errors.network'));
        }
    };

    const handleRemoveChannel = (event) => {
        event.preventDefault();
        setDisabled(true);
        removeChannel(channelBeingEdited, handleResponse);
        setDisabled(false);
    }

    return (
        <Modal show animation={true} centered onHide={() => dispatch(modalActions.closeModalWindow())}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {t('modals.removeChannelHeader')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <p className="lead">{t('modals.removeChannelBody')}</p>
                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            className="me-3 btn modal-btn-cancel"
                            onClick={() => dispatch(modalActions.closeModalWindow())}
                        >
                            {t('modals.cancelButton')}
                        </button>
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className="btn modal-btn-submit"
                            onClick={handleRemoveChannel}
                        >
                            {t('modals.removeChannelButton')}
                        </button>
                    </div>
            </Modal.Body>
        </Modal>
    );
};

export default RemoveChannel;
