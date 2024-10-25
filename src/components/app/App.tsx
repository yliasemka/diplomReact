import { useState } from 'react'
import AppNavigation from '../appNavigation'
import RandomChar from '../randomChar'
import CharList from '../charList'
import CharInfo from '../charInfo'
import decoration from '../../resources/vision.png'
import ErrorBoundary from '../errorBoundary'
import AppHeader from '../appHeader'





const  App = () => {


    const [selectChar, setSelectChar] = useState<number | null>(null)

    const onCharSelected = (id:number | null) => {
        setSelectChar(id)
    }

    
    return (
        <div className="app">
            <header>
                <AppHeader/>
                <AppNavigation/>
            </header>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
    
    
}

export default App