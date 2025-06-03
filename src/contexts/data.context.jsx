import {createContext,use,useContext,useState } from "react";
import { driversData,teamsData } from "../mockData";
export const dataContext = createContext();

export const DataProvider = ({children}) => {
    const [drivers, setDrivers] = useState(driversData)
    const [teams, setTeams] = useState(teamsData);

    return(
        <dataContext.Provider value={{drivers,setDrivers,teams,setTeams}}>
            {children}
        </dataContext.Provider>
    )
}

export const useDataContext = () => {
    const context = useContext(dataContext)
    if(!context)
        throw new Error ('useDataContext  accessible only within the context')
    return context
}