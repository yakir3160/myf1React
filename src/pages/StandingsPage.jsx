import { useEffect, useState } from 'react';
import NavTab from '@components/Nav/NavTab';
import TeamsTable from '@components/TeamsTable';
import DriversTable from "@components/DriversTable"
import { useFetchData } from '@hooks/useFetchData';
import { useF1Store } from '@store/useF1Store';

const StandingsPage = () => {
    const [activeTab, setActiveTab] = useState('drivers');


    useFetchData(); // Fetch data on initial render
    const {isLoading } = useF1Store();

    return (
        <div className="p-6 text-black   mx-auto bg-gray-100 rounded-xl shadow-md ">
            {/* Navigation Tabs */}
            <NavTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {/* Content based on active tab */}
            {isLoading ? <div className="text-center text-gray-500">Loading...</div>
                :
                <div className="bg-white p-4  rounded-xl shadow min-h-64">
                    {activeTab === 'drivers' && <DriversTable />}
                    {activeTab === 'teams' && <TeamsTable />}
                </div>
            }

        </div>
    );
}

export default StandingsPage


