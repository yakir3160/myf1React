import { useF1Store } from "../store/useF1Store"


const DriversTable = () => {

    const { drivers} = useF1Store();

    return (
        <div className="w-full">
            <strong className="text-red-700">Drivers</strong>
            <ul className="space-y-2 bg-gray-100 rounded-lg p-2">
                <div className="w-full flex flex-row">
                    <strong>Pos</strong>
                    <div className="w-full flex justify-between px-2 pl-5 ">
                        <strong>Name</strong>
                        <strong>Team</strong>
                        <strong>Points</strong>
                    </div>

                </div>
                {
                    drivers.map((d, index) => (
                        <li key={d.driver.name} className="text-black w-full rounded-lg  border border-red-900
                         bg-white flex flex-row space-x-4">
                            <strong className="bg-gray-200 px-2 rounded-lg">{index + 1}</strong>              
                            <div className="w-full flex justify-between px-2 ">
                                <span className="w-full">{d.driver.name} {d.driver.surname}  </span>
                                <span className="w-full text-center">{d.team.teamName}</span>
                                <strong className="text-lg w-full text-right">{d.points}</strong>
                            </div>

                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default DriversTable