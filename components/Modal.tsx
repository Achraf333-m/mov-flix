import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '@/atoms/atom';
import ReactPlayer from 'react-player';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'transparent',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [Trailer, setTrailer] = useRecoilState(movieState);
  const trailerKey = useRecoilValue(movieState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setTrailer('')
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${trailerKey}`} playing={true} />
        </Box>
      </Modal>
    </div>
  );
}
