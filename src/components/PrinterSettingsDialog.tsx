import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import PrintIcon from '@mui/icons-material/Print';
import { getPrinters, getPrinterSettings, savePrinterSettings, testPrint } from '../Services/Printer/printer';

type PrinterSettingsDialogProps = {
  open: boolean;
  onClose: () => void;
};

// Tela de Configuracoes: escolher a impressora POS do Windows e imprimir um teste.
export default function PrinterSettingsDialog({ open, onClose }: PrinterSettingsDialogProps) {
  const [printers, setPrinters] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    if (!open) return;
    (async () => {
      setLoading(true);
      try {
        const [list, current] = await Promise.all([getPrinters(), getPrinterSettings()]);
        setPrinters(list);
        setSelected(current ?? '');
      } finally {
        setLoading(false);
      }
    })();
  }, [open]);

  const handleChange = (event: SelectChangeEvent) => setSelected(event.target.value);

  const handleSave = async () => {
    setSaving(true);
    try {
      await savePrinterSettings(selected || null);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  // Salva a selecao atual e ja dispara o cupom de teste nela.
  const handleTest = async () => {
    setTesting(true);
    try {
      await savePrinterSettings(selected || null);
      await testPrint();
    } finally {
      setTesting(false);
    }
  };

  const busy = loading || saving || testing;

  return (
    <Dialog open={open} onClose={busy ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>Configurações da impressora</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Selecione a impressora (POS) usada para imprimir os cupons dos pedidos.
        </DialogContentText>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size="2rem" />
          </Box>
        ) : (
          <FormControl fullWidth>
            <InputLabel id="printer-select-label">Impressora</InputLabel>
            <Select
              labelId="printer-select-label"
              label="Impressora"
              value={selected}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Nenhuma</em>
              </MenuItem>
              {printers.map((p) => (
                <MenuItem key={p} value={p}>{p}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
        <Button
          onClick={handleTest}
          disabled={busy || !selected}
          startIcon={testing ? <CircularProgress size={16} color="inherit" /> : <PrintIcon />}
        >
          Imprimir teste
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={onClose} disabled={busy}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" disabled={busy}>
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
