import {useEffect, useState } from 'react'
import './style.modules.scss'
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner'
import Error from '../error'



interface CharObj{
        id:number,
        name: string;
        description: string;
        thumbnail: string,
        homepage: string,
        wiki:string

}
interface ErrorObj {
    value:boolean,
    info:{
        message:string,
        status:string,
        code:number
    }
}

interface InfoObj {
    message:string,
    status:string,
    code:number
}

interface PropsChar {
    onCharSelected: (id:number) => void
}

const CharList = (props:PropsChar) =>  {

    const [char, setChar] = useState<CharObj[] | null >(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<ErrorObj>({
        value:false,
        info : {
            message: '',
            status:'',
            code: 0
        }
    })
    const [newLoading, setNewLoading] = useState<boolean>()
    const [offset, setOffSet] = useState<number>(210)
    const [charEnded, setCharended] = useState<boolean>(false)
    const [activeId, setActiveId] = useState<null | number>(null)
    

    const marvelResponse = new MarvelService()

    const onCharListNewLoading = () => {
        setNewLoading(true);
    }

    const onCharListLoading = (newChar:CharObj[]) => {
        let ended = false
        if(newChar.length < 9){
            ended = true
        }
        if (char === null){
            setChar([...newChar])
        } else {
            setChar([...char, ...newChar])
        }
        
        setLoading(false)
        setNewLoading(false)
        setOffSet(offset => offset + 9)
        setCharended(ended)
    }

    const onError = (res:InfoObj) => {
        setLoading(false)
        setError({value:true, info:res})
    }

    useEffect(() => {
        onRequest()
    }, [])


    const onRequest = (offset:number = marvelResponse._baseOffSet) =>{
            onCharListNewLoading()
            marvelResponse
                .getAllCharacters(offset)
                .then(onCharListLoading)
                .catch(onError)
    }

    const setIsActive = (id: number) => {
        setActiveId(id)
    }

/*  const scrollList = () => {
        const windowHeight = document.documentElement.clientHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

        if (windowHeight + scrollTop >= documentHeight - 100 && !newLoading) {
            onRequest(offset)
        }
    }
    

    useEffect(() => {
        onRequest()
        window.addEventListener('scroll', scrollList)

        return (
            window.removeEventListener('scroll',scrollList)
        )
    }, [newLoading, offset]) */


    
    const load = loading ? <Spinner/> : null
    const errorMes = error.value ? <Error info={error.info}/> : null
    return (
        <div className="char__list">
            {errorMes}
            {load}
            <ul className="char__grid">
                {char !== null ? char.map((item) => {
                    const {id} = item
                    return (<ListItem key={id} {...item} onCharSelected={() => props.onCharSelected(id)} isActive={activeId === id} setIsActive={setIsActive}/>)
                }) : null}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newLoading}
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}  


interface ListItemProps extends CharObj {
    isActive:boolean,
    setIsActive: (id:number) => void,
    onCharSelected: (id:number) => void
}


const ListItem = (props:ListItemProps) => {

        const {id, name, thumbnail, onCharSelected, isActive, setIsActive} = props
        let imgStyle: React.CSSProperties = {objectFit : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {objectFit : 'contain'};
        }

        
        const select = () => {
            onCharSelected(id)
        }

        const handleClick = () => {
            select()
            setIsActive(id)
        }

        return(
            <li className={isActive ? "char__item_selected" : "char__item"}  onClick={handleClick}>
                <img src={thumbnail}  alt={name} style={imgStyle}/>
                <div className="char__name">{name}</div>
            </li>
        )
    }   

export default CharList