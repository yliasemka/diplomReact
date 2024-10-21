import './style.modules.scss'
import MarvelService from '../../services/MarvelServices'
import { Component} from 'react'
import Spinner from '../spinner'
import Error from '../error'
import Skeleton from '../skeleton'

interface CharInfoProps{
    charId:number | null
}



class CharInfo extends Component<CharInfoProps> {

    state ={
        char: null ,
        loading: false,
        error: {
            value:false,
            info : {
                message: '',
                status:'',
                code: 0
            }
        }
    }

    marvelResponse = new MarvelService()


    onError = (res:any) => {
        console.log(res)
        this.setState({loading:false, error:{value:true, info:res}})
    }

    onCharLoaded = (char:any) =>{
        console.log(char)
        this.setState({char, loading:false})
    }

    changeChar = () => {
        this.setState({loading:true});
        
    }

    changeCharInfo = (char:any) => {
        console.log(char)
        this.setState({char:char})
    }

    updateCharInfo = () => {
        const {charId} = this.props 
        if (!charId){
            return
        }
        this.changeChar()
        this.marvelResponse
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
        
    }   
    
    componentDidMount(): void {
        this.updateCharInfo()
    }
    
    componentDidUpdate(prevProps: Readonly<CharInfoProps>): void {
        if (this.props.charId !== prevProps.charId){
            this.updateCharInfo()
        }
    }

    render() {
        const {char, loading, error} = this.state
        const skeleton = char || loading || error.value ? null : <Skeleton/>
        const load = loading ? <Spinner/> : null
        const errorMessage = error.value ? <Error info={error.info}/> : null
        const content =  !(!char || load || errorMessage) ? <View char={char}/> : null
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {load}
                {content}
            </div>
        )
    }
}

const View = (char:any) => {
    const {char:{name, description,thumbnail,homepage, wiki, comics}} = char
    const comicsArr = comics.items
    let firstTenComics = comicsArr.slice(0, 10);
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
                {firstTenComics.map((item:any, id:number) => {
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