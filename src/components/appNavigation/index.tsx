import './style.modules.scss'

const AppNavigation = () => {
    return (
        <nav className="app__menu">
            <ul>
                <li><a href="#">Characters</a></li>
                
                <li><a href="#">Comics</a></li>
                <li><a href="#">Movies</a></li>
                
                <li><a href="#">More</a></li>
            </ul>
        </nav>
    )
}

export default AppNavigation