import { Link } from 'react-router-dom'


const NavButton = ({ text, to }) => {
    return (
        <Link to={`/${to.toLowerCase()}`} >
            <button className=' hover:bg-black hover:text-red-600 px-4 py-5  '>
                {text}
            </button>
        </Link>
    )
}
export default NavButton