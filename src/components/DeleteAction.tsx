import React from 'react';
import { useState } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const DeleteAction = ({ onDelete }: { onDelete: () => void }) => {
    const [confirm, setConfirm] = useState(false);

    const handleFirstClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setConfirm(true);
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setConfirm(false);
    };

    const handleConfirm = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
        setConfirm(false);
    };

    if (confirm) {
        return (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Confirmar exclusão">
                    <IconButton color="success" size="small" onClick={handleConfirm}>
                        <CheckIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Cancelar">
                    <IconButton color="default" size="small" onClick={handleCancel}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        );
    }

    return (
        <Tooltip title="Excluir">
            <IconButton color="error" size="small" onClick={handleFirstClick}>
                <DeleteOutlineIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );
};