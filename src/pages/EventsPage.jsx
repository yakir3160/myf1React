import { useDataContext } from "../contexts/data.context"





const EventsPage = () =>{
    const {drivers,teams} = useDataContext()
    return(
        <div>
            Events Page

            {
                teams.map(t => 
                    (
                        <span className="text-white">{t.team.teamName}</span>
                    )
                )
            }
        </div>
    )
}
export default EventsPage