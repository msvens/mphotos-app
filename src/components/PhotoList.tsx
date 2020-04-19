import React from 'react';
import usePhotosService from '../services/usePhotosService';

const PhotoList: React.FC<{}> = () => {
    const service = usePhotosService();

    return (
        <div>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' && service.payload.data.map(photo => (
                <div key={photo.driveId}>{photo.title}</div>
            ))}
            {service.status === 'error' && (
                <div>Error, the backend moved to the dark side.</div>
            )}
        </div>
    );
}

export default PhotoList;