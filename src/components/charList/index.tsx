import { Component } from 'react'
import './style.modules.scss'
import MarvelService from '../../services/MarvelServices'
import Spinner from '../spinner'



interface CharObj{
    char: {
        id:number,
        name: string;
        description: string;
        thumbnail: string,
        homepage: string,
        wiki:string
    }
    
}

interface PropsChar {
    onCharSelected: (id:number) => void
}

class CharList extends Component<PropsChar> {

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
        this.marvelResponse
        .getAllCharacters(ofset)
        .then(this.onCharListLoaded)
    }


    render() {
        const {char, loading} = this.state
        const { onCharSelected } = this.props
        const load = loading ? <Spinner/> : null
        return (
            <div className="char__list">
                {load}
                <ul className="char__grid">
                    {char.map((item) => {
                        const {id} = item
                        return (<ListItem key={id} char={item} onCharSelected={() => onCharSelected(id)}/>)
                    })}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }  
}

interface ListItemProps extends CharObj {
    onCharSelected: (id:number) => void
}


const ListItem = ({char:{id, name, thumbnail}, onCharSelected}:ListItemProps) => {
    let imgStyle: React.CSSProperties = {objectFit : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit : 'contain'};
    }
    return(
        <li className="char__item"  onClick={() => onCharSelected(id)}>
            <img src={thumbnail}  alt={name} style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList