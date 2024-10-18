import './style.modules.scss'
import avengersLogo from '../../resources/Avengers_logo.png'
import avengers from '../../resources/Avengers.png'

const AppBanner = () => {
    return (
        <div className="app__bunner">
            <img src={avengers} alt="Avengers"/>
            <div className="app_banner-text">
                New comics every week!
                Stay tuned!
            </div>
            <img src={avengersLogo} alt="AvengesLogo" />
        </div>
    )
}

export default AppBanner