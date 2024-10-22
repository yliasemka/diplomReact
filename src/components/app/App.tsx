import AppHeader from '../appHeader'
import RandomChar from '../randomChar'
import CharList from '../charList'
import CharInfo from '../charInfo'
import decoration from '../../resources/vision.png'
import ErrorBoundary from '../errorBoundary'
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
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
    
}

export default App