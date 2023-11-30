import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './menu.css'
import {useUser} from "../../contexts/UserContext";

export function Menu() {

    const {user, logout} = useUser();

    const navigate = useNavigate()

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Games', path: '/game' },
    ]


    if (!user) {
        menuItems.push({ name: 'Log In', path: '/login' })
        menuItems.push({ name: 'Register', path: '/register' })
    } else {
        if (user.role === 2) {
            menuItems.push({ name: 'Manage Users', path: '/manage-users' })
        }
    }

    function logoutAction() {
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(response => {
            if (response.ok) {
                console.log('logout success')
                logout()
                navigate('/')
            } else {
                console.log('logout failed')
                window.alert('Logout failed')
            }
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