import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { forgotPassword } from '../../api/auth';

const ForgotPasswordModal = ({ open, onClose }) => {
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotMessage('Please enter your email.');
      return;
    }
    const credentials = {
      email: forgotEmail,
    };
    setForgotMessage('Sending reset link...');
    try {
      const response = await forgotPassword(credentials);
      setForgotMessage(response.data.message || 'Check your email for reset instructions.');
    } catch (error) {
      console.error('Error sending reset link:', error);
      setForgotMessage('Failed to send reset link. Please try again.');
    }
    setForgotEmail('');
    setTimeout(() => {
      setForgotMessage('');
      onClose();
    }, 3000);
  }


  const handleClose = () => {
    setForgotMessage('');
    setForgotEmail('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Reset Password
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          margin="normal"
        />
        {forgotMessage && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {forgotMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleForgotPassword} variant="contained" color="error" fullWidth>
          Send Reset Link
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordModal;
