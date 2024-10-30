
export interface ComicsProps {
    items:Comics[]
}

export interface Comics {
    resourceURL:string,
    name:string
}

export interface ComicsResponse {
    id:number,
    title:string,
    description: string,
    pageCount:number,
    thumbnail:{
        path: string,
        extension: string,
    },
    textObjects:Array<{
        language:string
    }>,
    prices: Array<{
        price:any
    }>
}

export interface ComicsObj {
    id:number,
    title:string,
    description: string,
    pageCount:string,
    thumbnail:string,
    language:string,
    price: any
}