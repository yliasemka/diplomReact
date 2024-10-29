export interface ErrorObj {
value:boolean,
info:{
    message:string,
    status:string,
    code:number
}
}

export interface InfoObj {
message:string,
status:string,
code:number
}

export interface PropsChar {
onCharSelected: (id:number | null) => void
}

export interface CharInfoProps{
    charId:number | null
}

export interface ComicsProps {
    items:Comics[]
}

export interface Comics {
    resourceURL:string,
    name:string
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



