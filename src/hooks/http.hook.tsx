import { useState, useCallback } from "react";
import { ErrorObj } from "../types/interfaces";



const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<ErrorObj>({
        value:false,
        info : {
            message: '',
            status:'',
            code: 0
        }
    })

    const request = useCallback(async(url:string, method='GET', body=null, headers ={'Content-Type':'application/json'}) => {
        setLoading(true)

        try {
            const response = await fetch(url, {method, body,headers})
            if (!response.ok) {
                throw  { message: response.statusText,
                status: 'Error',
                code: response.status
                }
            }
            const data = await response.json()

            setLoading(false)
            return data
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(e:any){
            setLoading(false)
            setError({value:true, info:{message: e.message,status: 'Error', code: e.code}})
            throw(e)
        }

    }, [])

    const clearError = useCallback(() => setError({value:false, info:{message:'', code:0, status:'' }}), [])


    return {loading, error, request, clearError}
}

export default useHttp