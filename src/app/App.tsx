import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom'
import AppNavigation from '../components/appNavigation'
import AppHeader from '../components/appHeader'
import Slider from '../components/slider'
import MainPage from '../components/pages/MainPage'
import ComicsPage from '../components/pages/ComicsPage'
import Page404 from '../components/pages/Page404/404'
import SingleComicsPage from '../components/pages/SingleComicsPage/SingleComicsPage'

const  App = () => {

    const PathChecker = () => {
        const path = useLocation()
        const validPath = ['/', '/comics']
        const checkPath = validPath.includes(path.pathname)
    
        return checkPath && <Slider />
    }

    return (
        <Router>
            <div className="app">
                <header>
                    <AppHeader/>
                    <AppNavigation/>
                </header>
                <PathChecker />
                <main>   
                    <Routes>
                        <Route path="/" element={<MainPage/>}></Route>
                        <Route path='/comics' element={<ComicsPage/>}></Route>
                        <Route path='/comics/:comicId' element={<SingleComicsPage/>}></Route>
                        <Route path='*' element={<Page404/>}></Route>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App