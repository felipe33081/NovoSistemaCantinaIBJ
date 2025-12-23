import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { CustomTabsProps } from "../utils/interfaces/interfaces";
import { Environment } from "../environments/Index";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const CustomTabs: React.FC<CustomTabsProps> = ({ value, onChange, labels }) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant="fullWidth"
      TabIndicatorProps={{
        style: {
          top: 0,
          bottom: "unset",
          height: "3px",
          backgroundColor: Environment.MAIN_COLOR,
        },
      }}
      sx={{
        "& .MuiTab-root": { 
          fontWeight: 500,
          px: 4,
        },
        "& .MuiTab-root:last-of-type": {
          borderRight: "none",
        },
        "& .Mui-selected": {
          backgroundColor: 'background.paper',
          color: Environment.MAIN_COLOR,
        },
      }}
    >
      {labels.map((label, index) => (
        <Tab key={index} label={label} {...a11yProps(index)} />
      ))}
    </Tabs>
  );
};