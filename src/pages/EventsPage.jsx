import { useF1Store } from "../store/useF1Store"



const EventsPage = () =>{
    const {teams} = useF1Store();
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