import React, { useState } from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import { useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';

export default function Navigation() {

    const router = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const { loginUser, isLoading } = useSelector(state => state.usersReducer);

    const tabSkeleton = <Skeleton width="5rem" />;

    const items = [
        { label: isLoading ? tabSkeleton : 'Dashboard', icon: 'pi pi-objects-column', route: '/' },
        { label: isLoading ? tabSkeleton : 'Expenses', icon: 'pi pi-indian-rupee', route: '/expenses' },
        { label: isLoading ? tabSkeleton : 'Signup', icon: 'pi pi-user', route: 'signup', visible: !isLoading && !loginUser?.username }
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
