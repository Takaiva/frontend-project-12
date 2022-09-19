import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Form, Modal, FloatingLabel } from 'react-bootstrap';

import { selectors as channelsSelectors, actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as modalActions } from '../../slices/modalSlice.js';

import { useApi } from '../../hooks';

function AddChannel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = useState(false);
  const { addChannel } = useApi();
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleResponse = (response) => {
    if (response.status === 'ok') {
      dispatch(channelsActions.changeChannel(response.data.id));
      dispatch(modalActions.closeModalWindow());
      toast.success(t('notifications.addChannelSuccess'));
    } else {
      toast.error(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .required(t('modals.errors.required'))
        .notOneOf(channelsNames, t('modals.errors.alreadyExists'))
        .min(3, t('modals.errors.minLength'))
        .max(20, t('modals.errors.maxLength')),
    }),
    onSubmit: () => {
      setDisabled(true);
      addChannel(formik.values, handleResponse);
      setDisabled(false);
    },
  });

  return (
    <Modal
      animation
      centered
      onHide={() => dispatch(modalActions.closeModalWindow())}
      show
      >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.addChannelHeader')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body >
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="name"
              label={t('modals.addChannelPlaceholder')}
                      >
              <Form.Control
                isInvalid={!!formik.errors.name}
                name="name"
                onChange={formik.handleChange}
                placeholder={t('modals.addChannelPlaceholder')}
                ref={inputRef}
                value={formik.values.name}
                          />

              <Form.Control.Feedback type="invalid">
                {formik.errors.name ? formik.errors.name : null}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <button
              className="me-3 btn modal-btn-cancel"
              onClick={() => dispatch(modalActions.closeModalWindow())}
              type="button"
                      >
              {t('modals.cancelButton')}
            </button>

            <button
              className="btn modal-btn-submit"
              disabled={isDisabled}
              type="submit"
                      >
              {t('modals.submitButton')}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddChannel;
