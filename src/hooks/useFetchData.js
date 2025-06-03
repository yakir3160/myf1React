import { useF1Store } from "../store/useF1Store";
import { useEffect } from "react";


export const useFetchData = () => {
    const { setDrivers, setTeams, setIsLoading, setError } = useF1Store();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [driversResponse, teamsResponse] = await Promise.all([
                    fetch("https://f1api.dev/api/current/drivers-championship"),
                    fetch("https://f1api.dev/api/current/constructors-championship")
                ]);

                const driversData = await driversResponse.json();
                const teamsData = await teamsResponse.json();
                console.log("Drivers Data:", driversData.drivers_championship);
                console.log("Teams Data:", teamsData.constructors_championship);        
                      
                setDrivers(driversData.drivers_championship); 
                setTeams(teamsData.constructors_championship); 
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
};