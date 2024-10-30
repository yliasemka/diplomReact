import './style.modules.scss'
import SliderServices from '../../services/SliderServices'
import { useEffect, useState } from 'react'


interface SliderProps {
    id:number,
    url:string,
    name:string
    header:string,
    subtext:string,
    button:string,
    activeSlide:number
}

const Slider = () => {

    const [loadSliders, setLoadSliders] = useState<SliderProps[] | null>(null)
    const [activeSlide, setActiveSlide] = useState<number>(1)

    const sliders = SliderServices()

    const sliderLoad = (sliders:SliderProps[]) => {
        setLoadSliders(sliders)
    }

    const onRequestSlider = () => {
        sliders.getAllSlider()
            .then(sliderLoad)
            .catch(err => alert(err))
    }

    const onChangeActive = (id:number) => {
        setActiveSlide(id)
    }

    useEffect(() => {
        onRequestSlider()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide(prevSlide => {
                if(loadSliders){
                    const nextSlide = prevSlide === loadSliders.length ? 1 : prevSlide + 1
                    console.log(nextSlide)
                    return nextSlide
                }
                return prevSlide
            })
        }, 3000)
        return (
            () => clearInterval(interval)
        )
    }, [loadSliders])
   
    return (
        <section className="slider">
            <div className="slider-content">
                {loadSliders !== null ?
                    loadSliders.map(item => {
                        item.activeSlide = activeSlide
                        const {id} = item
                        return (<Slide  key={id} {...item}/>)
                    })
                    : null
                }
            </div>
            
            <footer className="footer">
                <nav className="bottom-nav">
                    {loadSliders !== null ? 
                        loadSliders.map(item => {
                            const {id} = item
                            return(
                                <div key={id} className={item.id === activeSlide ? 'tab active' : 'tab'} id={String(id)} onClick={() => onChangeActive(id)}>{item.name}</div>
                            )
                        })   
                        : null
                    }
                </nav>
                <div className="social-media">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-tiktok"></i></a>
                </div>
            </footer> 
        </section>
    )
}

const Slide = (slide:SliderProps) =>{
    return (
            <div className={slide.activeSlide === slide.id ? "slide active" : "slide"}>
                <img src={slide.url} alt={slide.name} className="slide-image"/>
                <div className="content">
                    <h1 className={slide.id === 3 ? 'dark' : ''}>{slide.header}</h1>
                    <p className={slide.id === 3 ? 'slide-subtext dark' : 'slide-subtext'}>{slide.subtext}</p>
                    <button className="button button__main">
                        <div className="inner">{slide.button}</div>
                    </button>
                </div>
            </div>
        )
}

export default Slider 


