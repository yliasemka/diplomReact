import './index.scss'
import avengersLogo from '../../resources/Avengers_logo.png'

const AppHeader = () => {
    return(
        <>  
            <div className='header'>
                <img src={avengersLogo} alt="marvel-logo" className="header-img" />
            </div>
        </>
    )
}

export default AppHeader