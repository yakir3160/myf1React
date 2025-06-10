import { useEffect, useState } from 'react';
import NavTab from '@components/Nav/NavTab';
import TeamsTable from '@components/TeamsTable';
import DriversTable from "@components/DriversTable"
import { useFetchData } from '@hooks/useFetchData';
import { useF1Store } from '@store/useF1Store';

const StandingsPage = () => {
    const [activeTab, setActiveTab] = useState('drivers');


    useFetchData(); 
    const { isLoading, error } = useF1Store();

    return (
        <div className="p-6 text-black max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Championship Standings</h1>
                <p className="text-2xl font-italic">Current F1 2025 season standings</p>
            </div>
            
            {/* Navigation Tabs */}
            <NavTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            
            {/* Content based on active tab */}
            {isLoading ? (
                <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center justify-center min-h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
                    <p className="text-gray-600">Loading standings data...</p>
                </div>
            ) : error ? (
                <div className="bg-white p-8 rounded-xl shadow min-h-64">
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                        <p className="font-medium">Error loading data</p>
                        <p className="text-sm mt-1">{error}</p>
                        <button 
                            onClick={() => useFetchData()} 
                            className="mt-3 bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-xl shadow min-h-64 border border-gray-100">
                    {activeTab === 'drivers' && <DriversTable />}
                    {activeTab === 'teams' && <TeamsTable />}
                </div>
            )}


        </div>
    );
}

export default StandingsPage


