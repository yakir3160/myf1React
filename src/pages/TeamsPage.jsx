import { useF1Store } from "../store/useF1Store"
import { TeamCard } from "../components/TeamCard";


const TeamsPage = () => {
    const { teams } = useF1Store();
    return (
        <div className="space-y-4">
            {
                teams.teams?.map(team => (
                    <TeamCard key={team.teamId} Team={team} />
                ))
            }
        </div>
    )
}
export default TeamsPage