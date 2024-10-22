import spider from './spider.gif'
import './style.modules.scss'

interface ErrorInfo {
    info: {
        message: string,
        status:string,
        code: number
    }
}

const Error = (info:ErrorInfo) => {
    const {info: {message, status, code} } = info
    return(
        <div className='error'>
            <img src={spider} alt="error_img" className="error_img" />
            <div className="error_label">
                <span className='error_number'>{code}</span>
                <span className="error_status">{message}</span>
                <span className="error_text">{status}</span>
            </div>
        </div>
        
    )
}

export default Error