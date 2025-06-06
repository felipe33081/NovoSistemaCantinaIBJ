import React, { useState } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import { addUserGroupEdit } from '../../../Services/User/user';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UserAddGroupDrawerProps } from '../../../utils/interfaces/interfaces';

export default function UserAddGroupDrawer({
    id,
    open,
    onClose,
    onSuccess
}: UserAddGroupDrawerProps) {
    const [groupName, setGroupName] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            groupName,
        };
        try {
            await addUserGroupEdit(id ?? '', data);
            onSuccess();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Novo Grupo"
            actions={
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSubmit}>Adicionar</Button>
                </Box>
            }   
        >
            <Box component="form" display="flex" flexDirection="column" mt={2}>
                <InputLabel id="groupName">Grupos</InputLabel>
                <FormControl fullWidth>
                    <Select
                        labelId="groupName"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    >
                        <MenuItem value={"MasterAdmin"}>Administrador Master</MenuItem>
                        <MenuItem value={"Admin"}>Administrador</MenuItem>
                        <MenuItem value={"User"}>Usuário</MenuItem>
                    </Select>
                </FormControl>
            </Box>

        </DrawerWrapper>
    )
}