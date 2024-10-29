import { useEffect, useState } from "react"
import './index.scss'
import useMarvelServices  from '../../services/MarvelServices'
import { ComicsObj } from "../../types/interfaces/comics"
import Spinner from "../spinner"
import Error from "../error"


const ComicsList = () => {

    const [comicsList, setComicsList] = useState<ComicsObj[]>([])
    const [newItemLoading, setnewItemLoading] = useState(false)
    const [ofset, setOfset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)

    const {loading, error, getAllComics, clearError} = useMarvelServices()

    const onComicsListNewLoading = () => {
        setnewItemLoading(true)
    }

    const onComicsListLoad = (comics:ComicsObj[]) => {
        let ended = false;
        if (comics.length < 8) {
            ended = true;
        }

        setComicsList([...comicsList, ...comics])
        setnewItemLoading(loading)
        setOfset(ofset => ofset + 8)
        setComicsEnded(ended)
    }

    const onRequest = (ofset:number) => {
        onComicsListNewLoading()
        clearError()
        getAllComics(ofset)
            .then(onComicsListLoad)
    }

    useEffect(() => {
        onRequest(ofset)
    },[])

    

    const load = loading ? <Spinner/> : null
    const errorMes = error.value ? <Error info={error.info}/> : null

    return(
        <div className="comics__list">
            {errorMes}
            {load}
            <ul className="char__grid">
                {comicsList !== null ? comicsList.map((item) => {
                    const {id} = item
                    return (<ListItem key={id} {...item} />)
                }) : null}
            </ul>
            <button 
                disabled={newItemLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(ofset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ListItem = (item:ComicsObj) => {
    return(
        <li className="comics__item">
            <a href="#">
                <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                <div className="comics__item-name">{item.title}</div>
                <div className="comics__item-price">{item.price}</div>
            </a>
        </li>
    )
}

export default ComicsList
