import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './style.modules.scss'
import MarvelServices from '../../../services/MarvelServices'
import { ComicsObj} from '../../../types/interfaces/comics';
import Spinner from '../../spinner'
import Error from '../../error'


const SingleComicsPage = () => {

    const {comicId} = useParams<string>()
    const [comicState, setComicState] = useState<ComicsObj | null>(null)
    const {loading, error, getComics, clearError} = MarvelServices()

    const onComicLoad = (comic:ComicsObj) => {
        setComicState(comic)
    }

    const onRequest = () => {
        const id = Number(comicId)
        clearError()
        getComics(id)
            .then(onComicLoad)
    }

    useEffect(() => {
        onRequest()
    }, [comicId])

    const load = loading ? <Spinner/> : null 
    const errorMes = error.value ? <Error info={error.info}/> : null
    const content = !(load || errorMes || !comicState) ? <View {...comicState}/> : null
    
    return (
        <>
            {load}
            {errorMes}
            {content}
        </>
    )
}

const View = (comic:ComicsObj) => {
    const {title,description, pageCount, thumbnail, language, price } = comic
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicsPage


