

const NavTab = ({activeTab,setActiveTab}) =>{
    return(
        <div className="flex mb-4 bg-white rounded-xl shadow  overflow-hidden">
        <button
            className={`flex-1 py-2 px-4 ${activeTab === 'drivers' ? 'bg-red-600 text-white' : 'bg-white text-red-600 '}`}
            onClick={() => setActiveTab('drivers')}
        >
            Drivers
        </button>
        <button
            className={`flex-1 py-2 px-4 ${activeTab === 'teams' ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
            onClick={() => setActiveTab('teams')}
        >
            Teams
        </button>
    </div>
    )
}


export default NavTab