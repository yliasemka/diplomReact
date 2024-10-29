import {useEffect, useState } from 'react'
import './style.modules.scss'
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner'
import Error from '../error'
import { CharObj, PropsChar } from '../../types/interfaces/character';


const CharList = (props:PropsChar) =>  {

    const [char, setChar] = useState<CharObj[] | null >(null)
    const [newLoading, setNewLoading] = useState<boolean>(false)
    const [offset, setOffSet] = useState<number>(210)
    const [charEnded, setCharended] = useState<boolean>(false)
    const [activeId, setActiveId] = useState<null | number>(null)
    

    const marvelResponse = useMarvelService()

    const {loading, error, getAllCharacters, _baseOffSet, clearError} = marvelResponse

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
        setNewLoading(false)
        setOffSet(offset => offset + 9)
        setCharended(ended)
    }
    
    useEffect(() => {
        onRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const onRequest = (offset:number = _baseOffSet) =>{
            onCharListNewLoading()
            clearError()
            getAllCharacters(offset)
                .then(onCharListLoading)
    }

    const setIsActive = (id: number | null) => {
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
    console.log('charList')
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
                disabled={error.value ? false : newLoading}
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}  


interface ListItemProps extends CharObj {
    isActive:boolean,
    setIsActive: (id:number | null ) => void,
    onCharSelected: (id:number | null) => void
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