import useHttp from "../hooks/http.hook"

interface CharacterResponse {
    id: number | null,
    name: string,
    description: string,
    modified: string,
    thumbnail: {
        path: string,
        extension: string,
    },
    urls: Array<{
        type: string,
        url:string
    }>,
    comics: ComicsProps
}

interface ComicsProps {
    items:Comics[]
}

interface Comics {
    resourceURL:string,
    name:string
}

const MarvelService = () => {

    const {loading, error, request, clearError} = useHttp()

    const _API_BASE = 'https://gateway.marvel.com:443/v1/public/'
    const _API_KEY = 'apikey=88ddbba0bde8b163f2bdde1f5021d80c'
    const _baseOffSet = 210

    const getAllCharacters = async (ofset:number = _baseOffSet) => {
        const res = await request(`${_API_BASE}characters?limit=9&offset=${ofset}&${_API_KEY}`)
        return res.data.results.map(_transformCharacter)
    } 

    const getCharacter = async (id:number | null) => {
        const res = await request(`${_API_BASE}characters/${id}?${_API_KEY}`)
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char:CharacterResponse) => {
        return {
            id:char.id,
            name:char.name,
            description:char.description,
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            comics: char.comics
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, _baseOffSet}
}

export default MarvelService 