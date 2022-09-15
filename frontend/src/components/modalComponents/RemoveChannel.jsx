import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "react-bootstrap";
import { actions as modalActions } from "../../slices/modalSlice";
import { useApi } from "../../hooks";
import { toast } from "react-toastify";

const RemoveChannel = () => {
    const dispatch = useDispatch();
    const [isDisabled, setDisabled] = useState(false);
    const { removeChannel } = useApi();
    const channelBeingEdited = useSelector(state => state.modal.item);

    const handleResponse = (response) => {
        if (response.status === 'ok') {
            toast.success('Channel successfully removed');
            dispatch(modalActions.closeModalWindow());
        } else {
            toast.error('Connection error');
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
                    Remove channel
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <p className="lead">Are you sure you want to delete the channel?</p>
                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            className="me-3 btn modal-btn-cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className="btn modal-btn-submit"
                            onClick={handleRemoveChannel}
                        >
                            Confirm
                        </button>
                    </div>
            </Modal.Body>
        </Modal>
    );
};

export default RemoveChannel;
