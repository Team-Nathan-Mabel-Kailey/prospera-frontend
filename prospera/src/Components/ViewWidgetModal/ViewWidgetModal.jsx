import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const ViewWidgetModal = ({ isOpen, onClose, widget }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // Safely access widget properties
  const widgetType = widget ? widget.type : 'No widget selected';
  // console.log(widgetType);

  return (
    <div>
        <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2>Viewing {widgetType} Info</h2>
                {widget ? (
                    <div>
                        <p>Type: {widget.type}</p>
                        <p>Color: {widget.color}</p>
                        <p>Dimensions: {widget.w}x{widget.h}</p>
                        <p>Position: ({widget.x}, {widget.y})</p>
                    </div>
                ) : (
                    <p>No widget data available</p>
                )}
            </Box>
        </Modal>
    </div>
  );
};

export default ViewWidgetModal;
