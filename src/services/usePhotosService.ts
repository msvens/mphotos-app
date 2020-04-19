import { useEffect, useState } from 'react';
import { Service } from '../types/service'
import {Photo} from '../types/photo'

export interface Photos {
    data: Photo[];
}



const usePhotosService = () => {

    const [result, setResult] = useState<Service<Photos>>({
        status: 'loading'
        });

    useEffect(() => {
        fetch('http://localhost:8060/api/photos')
            .then(res => res.json())
            .then(res => setResult({status: 'loaded', payload: res}))
            .catch(error => setResult({status: 'error', error}));
    }, []);

    return result;

};

//export const fetchPhoto = (id: string)

                           /*
export const usePhotoService = (id: string) => {
    const [result, setResult] =
};
*/


export const getImageUrl =  (p: Photo):string => {
    return "http://localhost:8060/api/images/".concat(p.fileName)
};

export const getThumbUrl =  (p: Photo):string => {
    return "http://localhost:8060/api/thumbs/".concat(p.fileName)
};

export default usePhotosService;

