import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, FormControl, InputLabel, Select, MenuItem, Box,
    Typography
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { postOrderFinish } from '../../Services/Order/order'; // Ajuste o caminho
import { PaymentOfTypeEnum } from '../../utils/enums/enums';
import CurrencyInput from '../CurrencyInput';

interface IOrderFinishDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    orderId: number;
    totalValue: number;
}

export default function OrderFinishDialog({
    open,
    onClose,
    onSuccess,
    orderId,
    totalValue
}: IOrderFinishDialogProps) {
    const [paymentOfType, setPaymentOfType] = useState<number | string>(4);
    const [paymentValue, setPaymentValue] = useState<number>(totalValue || 0);
    const [loading, setLoading] = useState(false);

    const showPaymentValue = true;

    const handleFinish = async () => {
        if (paymentOfType === '') return;

        setLoading(true);
        const payload = {
            paymentOfType: Number(paymentOfType),
            paymentValue: Number(paymentValue)
        };

        try {
            await postOrderFinish(orderId, payload);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Erro ao finalizar pedido", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Finalizar Pedido</DialogTitle>
            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    mb={3}
                    mt={1}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.mode === 'dark'
                            ? theme.palette.grey[800]
                            : theme.palette.grey[100],

                        borderRadius: 2,
                        p: 2
                    })}
                >
                    <Typography variant="subtitle2" color="textSecondary">
                        Valor total do pedido
                    </Typography>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                        {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={3} mt={1}>
                    <FormControl fullWidth>
                        <InputLabel id="payment-type-label">Tipo de Pagamento</InputLabel>
                        <Select
                            labelId="payment-type-label"
                            value={paymentOfType}
                            label="Tipo de Pagamento"
                            onChange={(e) => setPaymentOfType(e.target.value)}
                        >
                            <MenuItem value={PaymentOfTypeEnum.Debitor}>Fiado (Em conta)</MenuItem>
                            <MenuItem value={PaymentOfTypeEnum.Money}>Dinheiro</MenuItem>
                            <MenuItem value={PaymentOfTypeEnum.PIX}>PIX</MenuItem>
                            <MenuItem value={PaymentOfTypeEnum.ExtraMoney}>Saldo em Conta</MenuItem>
                            <MenuItem value={PaymentOfTypeEnum.DebitCard}>Cartão de Débito</MenuItem>
                            <MenuItem value={PaymentOfTypeEnum.CreditCard}>Cartão de Crédito</MenuItem>
                        </Select>
                    </FormControl>

                    {showPaymentValue && (
                        <CurrencyInput
                            name="paymentValue"
                            label="Valor do Pagamento"
                            value={paymentValue}
                            onChange={(e) => setPaymentValue(Number(e.target.value))}
                        />
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} startIcon={<CloseIcon />} color="inherit">
                    Cancelar
                </Button>
                <Button
                    onClick={handleFinish}
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleOutlineIcon />}
                    disabled={loading || paymentOfType === ''}
                >
                    {loading ? "Finalizando..." : "Finalizar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}