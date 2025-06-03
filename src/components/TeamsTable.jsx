import { useF1Store } from "../store/useF1Store";

const TeamsTable = () => {

    const { teams } = useF1Store();

    return (
        <div className="w-full">
            <strong className="text-red-700">Teams</strong>
            <ul className="space-y-2 bg-gray-100 rounded-lg p-2">
                <div className="w-full flex flex-row">
                    <strong>Pos</strong>
                    <div className="w-full flex justify-between px-2 pl-5">
                        <strong>Team</strong>
                        <strong>Points</strong>
                    </div>
                </div>
                {teams?.map((t, index) => (
                    <li
                        key={t.teamId}
                        className="text-black w-full rounded-lg border border-red-900 bg-white flex flex-row space-x-4"
                    >
                        <strong className="bg-gray-200 px-2 rounded-lg">{index + 1}</strong>
                        {console.log(t)}
                        <div className="w-full flex justify-between px-2">
                            <span>{t.team.teamName}</span>
                            <strong className="text-lg">{t.points}</strong>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamsTable;
