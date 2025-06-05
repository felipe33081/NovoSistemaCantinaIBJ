import { useState } from "react";

export function useTabs(initialTab: number = 0) {
    const [value, setValue] = useState(initialTab);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return {
        tabIndex: value,
        handleChangeTab,
        setTabIndex: setValue,
    };
}