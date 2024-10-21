import { Component} from 'react'
import './style.modules.scss'
import mjolnir from '../../resources/mjolnir.png'
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner';
import Error from '../error';

interface CharObj{
    name: string;
    description: string;
    thumbnail: string,
    homepage: string,
    wiki:string
}


class  RandomChar extends Component<{}> {
    

    state = {
        char:{
            name: '',
            description: '',
            thumbnail: '',
            homepage: '',
            wiki:''
        },
        loading: true,
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

    componentDidMount(): void {
        this.updateChar()
    }

    componentDidUpdate(): void {
    }

    componentWillUnmount(): void {
    }



    onError = (res:any) => {
        console.log(res)
        this.setState({loading:false, error:{value:true, info:res}})
    }

    onCharLoaded = (char:CharObj) =>{
        this.setState({char, loading:false})
    }

    changeChar = () => {
        this.setState({loading:true});
        
    }

    updateChar = () => {
        console.log('update')
        this.changeChar()
        const id:number = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelResponse
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError) 
    }

    

    render() {
        console.log('render')
        const {char, loading, error} = this.state
        const load = loading ? <Spinner/> : null
        const errorMessage = error.value ? <Error info={error.info}/> : null
        const content =  !(load || errorMessage) ? <View char={char}/> : null
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
                        <div className="inner"  onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }

}

const View = (char:any) => {
    const {char:{name, description,thumbnail,homepage, wiki}} = char
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