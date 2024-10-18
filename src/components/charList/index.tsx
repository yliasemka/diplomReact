import { Component } from 'react'
import './style.modules.scss'
import MarvelService from '../../services/MarvelServices'
import Spinner from '../spinner'



interface CharObj{
    char: {
        name: string;
        description: string;
        thumbnail: string,
        homepage: string,
        wiki:string
    }
    
}

class CharList extends Component {

    state ={
        char: [],
        loading: true,

    }

    marvelResponse = new MarvelService()

    onCharListLoaded = (char:any) => {
        this.setState({char:char, loading: false})
    }

    componentDidMount(): void {
        this.updateCharList()
    }

    updateCharList = () => {
        const ofset = Math.floor(Math.random() * (250 - 200) + 200)
        console.log(ofset)
        this.marvelResponse
        .getAllCharacters(ofset)
        .then(this.onCharListLoaded)
    }

    render() {
        const {char, loading} = this.state
        console.log(char)
        const load = loading ? <Spinner/> : null
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {load}
                    {char.map((item) => {
                        const {id} = item
                        return (<ListItem key={id} char={item}/>)
                    })}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }  
}

const ListItem = (char:CharObj) => {
    const {char:{name, thumbnail}} = char
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        return(
            <li className="char__item">
                <img src={thumbnail} style={{objectFit:'contain'}} alt={name}/>
                <div className="char__name">{name}</div>
            </li>
        )
    }
    return(
        <li className="char__item">
            <img src={thumbnail}  alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList