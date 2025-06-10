

const NavTab = ({activeTab,setActiveTab}) =>{
    return(
        <div className="flex mb-6 bg-white rounded-xl shadow overflow-hidden">
            <button
                className={`flex-1 py-3 px-6 font-medium transition-all duration-200 flex items-center justify-center
                    ${activeTab === 'drivers' 
                        ? 'bg-red-600 text-white shadow-inner' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('drivers')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Drivers
            </button>
            <button
                className={`flex-1 py-3 px-6 font-medium transition-all duration-200 flex items-center justify-center
                    ${activeTab === 'teams' 
                        ? 'bg-red-600 text-white shadow-inner' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('teams')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Teams
            </button>
        </div>
    )
}


export default NavTab