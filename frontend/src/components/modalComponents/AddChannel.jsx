import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as yup from 'yup';

import {
    //Button,
    Form,
    Modal,
    FloatingLabel,
} from "react-bootstrap";

import { selectors as channelsSelectors, actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as modalActions } from '../../slices/modalSlice.js';

import { useApi } from "../../hooks";

const AddChannel = () => {
    const dispatch = useDispatch();
    const [isDisabled, setDisabled] = useState(false);
    const { addChannel } = useApi();
    const channels = useSelector(channelsSelectors.selectAll);
    const channelsNames = channels.map(channel => channel.name);

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleResponse = (response) => {
        if (response.status === 'ok') {
            dispatch(channelsActions.changeChannel(response.data.id));
            dispatch(modalActions.closeModalWindow());
            toast.success('Channel successfully added');
        } else {
            toast.error('Connection error');
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: yup.object({
            name: yup.string()
                .required('Name is required')
                .notOneOf(channelsNames, 'channelAlreadyExists')
                .min(3, "Channel's name must be at least 3 characters")
                .max(20, "Channel's name must be at most 20 characters")
        }),
        onSubmit: () => {
            setDisabled(true);
            addChannel(formik.values, handleResponse);
            setDisabled(false);
        },
    });

    return (
        <Modal show animation={true} centered onHide={() => dispatch(modalActions.closeModalWindow())}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add channel
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Channel's name" controlId="name">
                            <Form.Control
                                ref={inputRef}
                                placeholder="Channel's name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.name ? formik.errors.name : null}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            onClick={() => dispatch(modalActions.closeModalWindow())}
                            className="me-3 btn modal-btn-cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className="btn modal-btn-submit"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default AddChannel;
