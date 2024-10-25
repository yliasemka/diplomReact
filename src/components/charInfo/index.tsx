import './style.modules.scss'
import MarvelService from '../../services/MarvelServices'
import {useEffect, useState} from 'react'
import Spinner from '../spinner'
import Error from '../error'
import Skeleton from '../skeleton'

interface CharInfoProps{
    charId:number | null
}

interface ErrorObj {
    value:boolean,
    info:{
        message:string,
        status:string,
        code:number
    }
}

interface ComicsProps {
    items:Comics[]
}

interface Comics {
    resourceURL:string,
    name:string
}

interface CharObj{
    id?:number | null,
    name: string;
    description: string;
    thumbnail: string,
    homepage: string,
    wiki:string
    comics: ComicsProps
}


interface InfoObj {
    message:string,
    status:string,
    code:number
}

const CharInfo = (props:CharInfoProps) => {

    const [char, setChar] = useState<CharObj | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<ErrorObj>({
        value:false,
        info : {
            message: '',
            status:'',
            code: 0
        }
        }
    )


    const marvelResponse = new MarvelService()


    const onError = (res:InfoObj) => {
        setLoading(false)
        setError({value:true, info:res})
    }

    const onCharLoaded = (char:CharObj | null) =>{
        setChar(char)
        setLoading(false)
    }

    const changeChar = () => {
        setLoading(true)
    }

    const updateCharInfo = () => {
        
        const {charId} = props 
        if (!charId){
            return
        }
        changeChar()
        marvelResponse
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }   

    useEffect(() => {
        console.log("use effect")
        updateCharInfo()
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