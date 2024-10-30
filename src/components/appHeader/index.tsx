import './style.modules.scss'
import marvelLogo from '../../resources/2362648_5ad0c.png'

const AppHeader = () => {
    return(
        <>  
            <div className='app__header'>
                <img src={marvelLogo} alt="marvel-logo" className="app__header-img" />
            </div>
        </>
    )
}

export default AppHeader