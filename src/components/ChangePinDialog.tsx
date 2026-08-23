import React, { useState, FormEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { changePin } from '../Services/Auth/login';
import { Toast } from '../utils/ToastUtils';

type ChangePinDialogProps = {
  open: boolean;
  onClose: () => void;
};

// Diálogo para trocar o PIN de acesso local (offline). Usa o endpoint
// POST /v1/auth/change-pin, que exige o PIN atual.
export default function ChangePinDialog({ open, onClose }: ChangePinDialogProps) {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    if (loading) return;
    reset();
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (newPin.length < 4) {
      setError('O novo PIN deve ter ao menos 4 dígitos.');
      return;
    }
    if (newPin !== confirmPin) {
      setError('A confirmação do novo PIN não confere.');
      return;
    }

    setLoading(true);
    try {
      await changePin(currentPin, newPin);
      Toast.success('PIN alterado com sucesso.');
      reset();
      onClose();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setError('O PIN atual está incorreto.');
      } else {
        const msg = err?.response?.data?.message || err?.response?.data?.errors;
        setError(msg || 'Não foi possível alterar o PIN. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Trocar PIN</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Informe o PIN atual e escolha um novo PIN de acesso (mínimo 4 dígitos).
        </DialogContentText>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="PIN atual"
            type="password"
            autoFocus
            fullWidth
            required
            inputProps={{ inputMode: 'numeric' }}
            value={currentPin}
            onChange={(e) => setCurrentPin(e.target.value)}
          />
          <TextField
            label="Novo PIN"
            type="password"
            fullWidth
            required
            inputProps={{ inputMode: 'numeric' }}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
          />
          <TextField
            label="Confirmar novo PIN"
            type="password"
            fullWidth
            required
            inputProps={{ inputMode: 'numeric' }}
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
