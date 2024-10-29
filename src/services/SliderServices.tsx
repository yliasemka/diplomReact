
const SliderServices = () => {

    const _API_SLIDER = 'https://6720858acf285f60d77a21d1.mockapi.io/slides/slide'

    const getAllSlider = async () => {
        const response = await fetch (_API_SLIDER)
        if (!response.ok) {
            throw  { message: response.statusText,
            status: 'Error',
            code: response.status
            }
        }

        const data = await response.json()
        console.log(data)
        return data
    } 

    return {getAllSlider}
}

export default SliderServices