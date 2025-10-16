import { Paper, Box, FormControlLabel, Checkbox, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React from "react";
import { CustomTabPanel, CustomTabs } from "../CustomTabPanel";
import UserAddGroupDrawer from "../../pages/User/CreateEdit/UserAddGroupDrawer";
import FormTextField from "../FormTextField";
import { PhoneMaskInput } from "../PhoneMaskField";
import { DataTableShort } from "../DataTableShort";
import { UserTabsPanelProps } from "../../utils/interfaces/interfaces";

export const UserTabsPanel = ({
  id,
  tabIndex,
  setTabIndex,
  name,
  email,
  phoneNumber,
  userStatus,
  emailVerified,
  setName,
  setEmail,
  setPhone,
  setEmailVerified,
  handleRefresh,
  rows,
  totalRows,
  loading,
  columns,
  openAddGroupDrawer,
  setOpenAddGroupDrawer,
}: UserTabsPanelProps) => {
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "8px",
        overflow: "hidden",
        mt: 2,
      }}
    >
      <CustomTabs
        value={tabIndex}
        onChange={handleChangeTab}
        labels={["Informações", "Grupos"]}
      />

      <UserAddGroupDrawer
        id={id ?? ""}
        open={openAddGroupDrawer}
        onClose={() => setOpenAddGroupDrawer(false)}
        onSuccess={() => {
          handleRefresh();
          setOpenAddGroupDrawer(false);
        }}
      />

      <CustomTabPanel value={tabIndex} index={0}>
        <Box component="form" display="flex" flexDirection="column" gap={3}>
          <FormTextField
            id="name"
            name="name"
            label="Nome"
            type="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <FormTextField
            id="email"
            name="email"
            label="Email"
            type="email"
            required
            placeholder="email@host.com"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            value={email}
          />
          <Box component="form" display="flex" gap={3}>
            <PhoneMaskInput
              id="phoneNumber"
              label="Telefone"
              fullWidth
              required
              placeholder="(00) 00000-0000"
              onChange={(e) => setPhone(e.target.value)}
              sx={{ mb: 3 }}
              value={phoneNumber}
            />
            <FormTextField
              id="userStatus"
              name="userStatus"
              label="Status"
              disabled
              value={userStatus}
            />
          </Box>

          <FormControlLabel
            sx={{ mt: -4 }}
            control={
              <Checkbox
                checked={emailVerified}
                onChange={(e) => setEmailVerified(e.target.checked)}
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                sx={{
                  color: "#023e8a",
                  "&.Mui-checked": {
                    borderColor: "white",
                    color: "#023e8a",
                    backgroundColor: "white",
                  },
                }}
              />
            }
            label="E-mail verificado"
          />
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={tabIndex} index={1}>
        <DataTableShort
          rows={rows}
          columns={columns}
          totalRows={totalRows}
          loading={loading}
        />

        <Button
          className="save-button"
          onClick={() => setOpenAddGroupDrawer(true)}
          variant="contained"
          sx={{ mt: 2 }}
        >
          <AddIcon />
          Novo Grupo
        </Button>
      </CustomTabPanel>
    </Paper>
  );
};
