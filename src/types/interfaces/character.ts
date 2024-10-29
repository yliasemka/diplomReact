import { ComicsProps } from "./comics";

export interface PropsChar {
    onCharSelected: (id:number | null) => void
    }
    
export interface CharInfoProps{
    charId:number | null
}
export interface CharObj{
    id:number | null ,
    name: string;
    description: string;
    thumbnail: string,
    homepage: string,
    wiki:string
    comics: ComicsProps
}

export interface CharOdjId{
    name?: string;
    description?: string;
    thumbnail?: string,
    homepage?: string,
    wiki?:string
    comics?: ComicsProps
}

export interface CharacterResponse {
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