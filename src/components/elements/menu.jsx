import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './menu.css'

export function Menu(props) {

    console.log(props);

    const navigate = useNavigate()

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Games', path: '/game' },
    ]


    if (!props.user?.permissions) {
        menuItems.push({ name: 'Log In', path: '/login' })
        menuItems.push({ name: 'Register', path: '/register' })
    }

    function logout() {
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(response => {
            if (response.ok) {
                console.log('logout success')
                props.setUser(null)
                navigate('/')
            } else {
                console.log('logout failed')
                window.alert('Logout failed')
            }
        })
    }

    return (
        <div className='menu'>
            {menuItems.map(item =>
                <div className='menu_item' key={item.name}>
                    <Link to={item.path}>{item.name}</Link>
                </div>,
            )}

            {props.user?.permissions && <div className='menu_item'>
                <button className='menu_btn' onClick={logout}>Log Out</button>
            </div>}

        </div>

    )
}

export default Menu;