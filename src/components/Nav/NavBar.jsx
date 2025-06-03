
import speedyImage from '@assets/speedy.png'
import NavButton from '@components/Nav/NavButton.jsx'
const NavBar = () => {
    return (
        <header className="bg-red-600 text-white h-16 flex items-center px-6 shadow-md rounded-b-xl">
            <button>
                <img src={speedyImage} alt="speedy" className='size-16' />
            </button>
            <div>
                <NavButton
                    text={'Standings'}
                />
                <NavButton
                    text={'Drivers'}
                />
                <NavButton
                    text={'Teams'}
                />
                <NavButton
                    text={'Events'}
                />
            </div>

        </header>
    )
}
export default NavBar