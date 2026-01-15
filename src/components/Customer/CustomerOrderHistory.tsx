import React from 'react';
import {
    Box, Typography, Accordion, AccordionSummary, AccordionDetails,
    Chip, Divider, List, ListItem, ListItemText, Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventIcon from '@mui/icons-material/Event';
import { ICustomerOrderHistoryProps } from '../../utils/interfaces/interfaces';

export const CustomerOrderHistory = ({ orders }: ICustomerOrderHistoryProps) => {

    if (!orders || orders.length === 0) {
        return (
            <Box p={4} textAlign="center" color="text.secondary">
                <Typography>Nenhum pedido encontrado para este cliente.</Typography>
            </Box>
        );
    }

    const sortedOrders = [...orders].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

    return (
        <Box sx={{ maxHeight: '500px', overflowY: 'auto', pr: 1 }}>
            {sortedOrders.map((order) => (
                <Accordion key={order.id} disableGutters elevation={0}
                    sx={(theme) => ({
                        border: `1px solid ${theme.palette.divider}`,
                        mb: 1,
                        borderRadius: 1,
                        backgroundColor: theme.palette.background.paper,
                        '&:before': { display: 'none' }
                    })}>

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={(theme) => ({
                            transition: 'background-color 0.2s',
                            '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.03)'
                                    : theme.palette.grey[100]
                            }
                        })}
                    >
                        <Box display="flex" width="100%" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>

                            <Box display="flex" alignItems="center" gap={1}>
                                <Chip label={`#${order.id}`} size="small" variant="outlined" />
                                <Box display="flex" alignItems="center" color="text.secondary">
                                    <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
                                    <Typography variant="body2">{formatDate(order.createdAt)}</Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" gap={2}>
                                <Chip
                                    label={order.statusDisplay}
                                    color={order.status === 2 ? 'success' : 'warning'}
                                    size="small"
                                />
                                <Typography fontWeight="bold" color='text.primary'>
                                    {formatCurrency(order.totalValue)}
                                </Typography>
                            </Box>
                        </Box>
                    </AccordionSummary>

                    <AccordionDetails
                        sx={(theme) => ({
                            backgroundColor: theme.palette.mode === 'dark'
                                ? 'rgba(0, 0, 0, 0.2)'
                                : theme.palette.grey[50]
                        })}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" gutterBottom>Itens do Pedido:</Typography>
                                <List dense disablePadding>
                                    {order.products.map((prod: any, index: number) => (
                                        <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                                            <ListItemText
                                                primary={`${prod.quantity}x ${prod.productDisplay}`}
                                                primaryTypographyProps={{ variant: 'body2' }}
                                            />
                                            <Typography variant="body2" fontWeight="bold">
                                                {formatCurrency(prod.price * prod.quantity)}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box display="flex" flexDirection="column" gap={1} alignItems="flex-end">
                                    <Typography variant="subtitle2">Resumo Financeiro</Typography>
                                    <Box display="flex" justifyContent="space-between" width="100%" maxWidth="200px">
                                        <Typography variant="caption">Pagamento:</Typography>
                                        <Typography variant="caption">{order.paymentOfTypeDisplay}</Typography>
                                    </Box>
                                    <Divider sx={{ width: '100%', maxWidth: '200px' }} />
                                    <Box display="flex" justifyContent="space-between" width="100%" maxWidth="200px">
                                        <Typography variant="body2" fontWeight="bold">Total:</Typography>
                                        <Typography variant="body2" fontWeight="bold" color="primary">
                                            {formatCurrency(order.totalValue)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};