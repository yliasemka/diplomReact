import { NavLink } from 'react-router-dom'
import './style.modules.scss'
import ActiveLink from '../../services/utils'

const AppNavigation = () => {
    return (
        <nav className="app__menu">
            <ul>
                <li><NavLink
                end
                style={({isActive}) => (ActiveLink(isActive))}
                to='/'
                >Characters</NavLink></li>
                <li><NavLink
                style={({isActive}) => (ActiveLink(isActive))}
                to='/comics'
                >Comics</NavLink></li>
                <li><a href="#">Movies</a></li>
                <li><a href="#">More</a></li>
            </ul>
        </nav>
    )
}

export default AppNavigation