import AppHeader from '../appHeader'
import RandomChar from '../randomChar'
import CharList from '../charList'
import CharInfo from '../charInfo'
import decoration from '../../resources/vision.png'
import { Component } from 'react'




class App extends Component{


    state = {
        selectChar: null
    }

    onCharSelected = (id:number) => {
        this.setState({
            selectChar: id
        })
    }

    render (){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected}/>
                        <CharInfo charId={this.state.selectChar}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
    
}

export default App