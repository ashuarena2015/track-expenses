import React, { useState } from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

export default function Navigation() {

    const router = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    const items = [
        { label: 'Dashboard', icon: <DashboardCustomizeIcon />, route: '/' },
        { label: 'Expenses', icon: <CurrencyRupeeOutlinedIcon />, route: '/expenses' },
        { label: 'Signup', icon: <Person2OutlinedIcon />, route: 'signup' }
    ];

    const redirectToPage = (tab) => {
      setActiveTab(tab?.index);
      router(`${tab?.value?.route}`);
    }

    return (
      <TabMenu
        model={items}
        activeIndex={activeTab}
        onTabChange={redirectToPage}
      />
    )
}
