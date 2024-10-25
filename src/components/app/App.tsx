import { useState } from 'react'
import AppHeader from '../appHeader'
import RandomChar from '../randomChar'
import CharList from '../charList'
import CharInfo from '../charInfo'
import decoration from '../../resources/vision.png'
import ErrorBoundary from '../errorBoundary'





const  App = () => {


    const [selectChar, setSelectChar] = useState<number | null>(null)

    const onCharSelected = (id:number | null) => {
        setSelectChar(id)
    }

    
    return (
        <div className="app">
            <AppHeader/>
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