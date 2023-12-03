import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './menu.css'
import {useUser} from "../../contexts/UserContext";
import {get} from "../../utils/apiActions";

export function Menu() {

    const {user, logout} = useUser();

    const navigate = useNavigate()

    const menuItems = [
        { name: 'Home', path: '/main' },
        { name: 'Games', path: '/game' },

    ]


    if (!user) {
        menuItems.push({ name: 'Log In', path: '/login' })
        menuItems.push({ name: 'Register', path: '/register' })
    } else {
        if (user.role === 2) {
            menuItems.push({ name: 'Manage Users', path: '/manage-users' },
                { name: 'Add Game', path: '/gameAddition' },
                { name: 'Game List', path: '/gameList' })

        }
    }

    function logoutAction() {
        get('logout/', null).then(r => {
            console.log(r);
            window.location.reload();
            navigate('/')
        })
    }
    console.log(user)

    return (
        <div className='menu'>
            {menuItems.map(item =>
                <div className='menu_item' key={item.name}>
                    <Link to={item.path}>{item.name}</Link>
                </div>,
            )}

            {user && <div className='menu_item'>
                <button className='menu_btn' onClick={logoutAction}>Log Out</button>
            </div>}

        </div>

    )
}

export default Menu;