import './style.modules.scss'
import MarvelService from '../../services/MarvelServices'
import {useEffect, useState} from 'react'
import Spinner from '../spinner'
import Error from '../error'
import Skeleton from '../skeleton'
import { CharInfoProps, CharObj} from '../../types/interfaces/character'
import { Comics } from '../../types/interfaces/comics'

const CharInfo = (props:CharInfoProps) => {

    const [char, setChar] = useState<CharObj | null>(null)
    const marvelResponse = MarvelService()
    const {loading, error, getCharacter,clearError} = marvelResponse

    const onCharLoaded = (char:CharObj | null) =>{
        setChar(char)
    }

    const updateCharInfo = () => {
        
        const {charId} = props 
        if (!charId){
            return
        }
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
    }   

    useEffect(() => {
        updateCharInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId])

    const skeleton = char || loading || error.value ? null : <Skeleton/>
    const load = loading ? <Spinner/> : null
    const errorMessage = error.value ? <Error info={error.info}/> : null
    const content =  !(!char || load || errorMessage) ? <View {...char}/> : null
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {load}
            {content}
        </div>
    )
}

const View = (props:CharObj) => {
    const {name, description,thumbnail,homepage, wiki, comics} = props
    const comicsArr = comics.items
    const firstTenComics = comicsArr.slice(0, 10);
    let imgStyle:  React.CSSProperties = {objectFit : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit : 'contain'};
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {firstTenComics.length > 0 ? null : "Not found comics with this character"}
                {firstTenComics.map((item:Comics, id:number) => {
                    return(
                        <li key={id} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </>
        
    )
}

export default CharInfo