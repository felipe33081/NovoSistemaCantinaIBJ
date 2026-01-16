import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Box
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface IConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    loading?: boolean;
}

export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    message,
    loading = false
}: IConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningAmberIcon color="warning" />
                {title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit" disabled={loading}>
                    Cancelar
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="error"
                    autoFocus
                    disabled={loading}
                >
                    {loading ? "Excluindo..." : "Excluir"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}