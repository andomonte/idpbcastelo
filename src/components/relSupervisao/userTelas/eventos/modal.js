import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import UploadFile from './uploadFile';

export default function SimpleModal() {
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <UploadFile />
        </div>
      </Modal>
    </div>
  );
}
