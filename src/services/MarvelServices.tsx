import useHttp from "../hooks/http.hook"
import { CharacterResponse } from "../types/interfaces/character"
import { ComicsResponse } from "../types/interfaces/comics"

const useMarvelService = () => {

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

    const getAllComics = async (ofset:number = 0) => {
        const res = await request(`${_API_BASE}comics?orderBy=issueNumber&limit=8&offset=${ofset}&${_API_KEY}`)
        return res.data.results.map(_transformComics)
    }

    const getComics = async (id:number | null) => {
		const res = await request(`${_API_BASE}comics/${id}?${_API_KEY}`)
		return _transformComics(res.data.results[0]);
	};

    const _transformComics = (comics:ComicsResponse) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		}
	}

    return {loading, error, getAllCharacters, getCharacter, getAllComics, getComics, clearError, _baseOffSet}
}

export default useMarvelService 