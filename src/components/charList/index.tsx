import { Component } from 'react'
import './style.modules.scss'
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner'
import Error from '../error'



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

interface ListState {
    char: CharObj[],
    loading:boolean,
    error: {
        value:boolean,
        info:{
            message:string,
            status:string,
            code:number
        }
    },
    newLoading:boolean,
    offset: number,
    charEnded: boolean,
    activId: number | null
}

interface PropsChar {
    onCharSelected: (id:number) => void
}

class CharList extends Component<PropsChar, ListState> {

    state ={
        char: [],
        loading: true,
        error: {
            value:false,
            info : {
                message: '',
                status:'',
                code: 0
            }
        },
        newLoading: false,
        offset:210,
        charEnded:false,
        activId: null

    }

    

    marvelResponse = new MarvelService()

    onCharListNewLoading = () => {
        this.setState({newLoading:true})
    }

    onCharListLoading = (newChar:CharObj[]) => {

        let ended = false
        if(newChar.length < 9){
            ended = true
        }

        this.setState(({offset, char}) => ({
            char: [...char,...newChar], 
            loading: false, 
            newLoading:false,
            offset:offset + 9,
            charEnded: ended
        }))
    }
    onError = (res:any) => {
        this.setState({loading:false, error:{value:true, info:res}})
    }

    componentDidMount(): void {
        this.onRequest()
    }
    


    onRequest = (offset:number = this.marvelResponse._baseOffSet) =>{
        this.onCharListNewLoading()
        this.marvelResponse
            .getAllCharacters(offset)
            .then(this.onCharListLoading)
            .catch(this.onError)
        
    }

    setIsActive = (id: number) => {
        this.setState({activId:id})
    }

    /* componentDidMount(): void {
        this.onRequest()
        window.addEventListener('scroll', this.scrollList)
    }

    scrollList = () => {
        const windowHeight = document.documentElement.clientHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

        if (windowHeight + scrollTop >= documentHeight - 100 && !this.state.newLoading) {
            this.onRequest(this.state.offset)
        }
    }
    
    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.scrollList)
    } */



    render() {

        const {char, loading, error, newLoading, offset, charEnded, activId} = this.state
        const { onCharSelected } = this.props
        const load = loading ? <Spinner/> : null
        const errorMes = error.value ? <Error info={error.info}/> : null
        console.log("activeid",activId)
        return (
            <div className="char__list">
                {errorMes}
                {load}
                <ul className="char__grid">
                    {char.map((item) => {
                        const {id} = item
                        console.log(id)
                        return (<ListItem key={id} char={item} onCharSelected={() => onCharSelected(id)} isActive={activId === id} setIsActive={this.setIsActive}/>)
                    })}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{'display': charEnded ? 'none': 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }  
}

interface ListItemProps extends CharObj {
    isActive:boolean,
    setIsActive: (id:number) => void,
    onCharSelected: (id:number) => void
}

interface ListItemState {
    click:boolean
}

class ListItem extends Component<ListItemProps, ListItemState> {

    
    render() {

        const {char:{id, name, thumbnail}, onCharSelected, isActive, setIsActive} = this.props
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
}   

export default CharList