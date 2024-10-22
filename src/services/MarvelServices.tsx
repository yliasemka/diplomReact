
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
    comics: ComicsProps[]
}

interface ComicsProps {
    item:{
        resourceURL:string,
        name:string
    }
}

class MarvelService {

    _API_BASE = 'https://gateway.marvel.com:443/v1/public/'
    _API_KEY = 'apikey=88ddbba0bde8b163f2bdde1f5021d80c'
    _baseOffSet = 210

    getResource = async (url:string) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw  { message: res.statusText,
            status: 'Error',
            code: res.status
            }
        }

        return await res.json()
    } 



    getAllCharacters = async (ofset:number = this._baseOffSet) => {
        const res = await this.getResource(`${this._API_BASE}characters?limit=9&offset=${ofset}&${this._API_KEY}`)
        return res.data.results.map(this._transformCharacter)
    } 

    getCharacter = async (id:number | null) => {
        const res = await this.getResource(`${this._API_BASE}characters/${id}?${this._API_KEY}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char:CharacterResponse) => {
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
}

export default MarvelService 