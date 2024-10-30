import errorGif from './404.webp'
import './style.modules.scss'


const Page404 = () => {
    return(
        <div className="error__page">
            <div className="error__page-content">
                <h1 className="error__page-header">404 PAGE NOT FOUND</h1>
                <h2 className="error__page-subheader">You are not worthly</h2>
                <p className="error__page-text">Check that you typed the address correctly, 
                go back to your previous page or try 
                using our site search to find something specific.</p>
            </div>
            <div className="error__page-img">
                <img src={errorGif} alt="error-gif" className="error__page-gif" />
            </div>
        </div>
    )
}

export default Page404