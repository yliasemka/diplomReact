import { useEffect, useState} from 'react'
import './style.modules.scss'
import mjolnir from '../../resources/mjolnir.png'
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner';
import Error from '../error';
import { CharObj, CharOdjId} from '../../types/interfaces';




const RandomChar = () => {
    
    const [char, setChar] = useState<CharObj | null>(null)
    const marvelResponse = MarvelService() 
    const {loading, error, getCharacter, clearError} = marvelResponse

    const onCharLoaded = (char:CharObj | null) =>{
        setChar(char)
    }

    useEffect(() => {
        updateChar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateChar = () => {
        const id:number = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        clearError()
        getCharacter(id)
            .then(onCharLoaded)
    }

    const load = loading ? <Spinner/> : null
    console.log(error)
    const errorMessage = error.value ? <Error info={error.info}/> : null
    const content =  !(load || errorMessage) ? <View {...char}/> : null
    return (
        <div className="randomchar">
            {errorMessage}
            {load}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner"  onClick={updateChar}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = (char:CharOdjId) => {
    const {name, description,thumbnail,homepage, wiki} = char
    let imgStyle:  React.CSSProperties = {objectFit : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit : 'contain'};
    }
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" style={imgStyle} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? `${description.slice(0,190)}...` : 'Information not found'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki}className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
    
}

export default RandomChar