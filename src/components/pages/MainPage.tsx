import { useState } from 'react'
import RandomChar from '../../components/randomChar'
import CharList from '../../components/charList'
import CharInfo from '../../components/charInfo'
import decoration from '../../resources/vision.png'
import ErrorBoundary from '../../components/errorBoundary'


const  MainPage = () => {

    
    const [selectChar, setSelectChar] = useState<number | null>(null)

    const onCharSelected = (id:number | null) => {
        setSelectChar(id)
    }

    return(
        <>
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
        </>
    )
    
}

export default MainPage