import {Photo} from "../types/photo";

interface AuthUser {
    authenticated: boolean
}

interface MPhotosResponse<T> {
    error?: ApiError
    data?: T
}

export interface ApiError {
    code: number;
    message: string;
}

export interface User {
    name: string;
    bio: string;
    pic: string;
    driveFolderId?: string;
    driveFolderName?: string;
}

export interface DriveFile {
    id: string;
    name: string;
    kind: string;
    mimeType: string;
    md5Checksum: string;
}

export interface DriveFiles {
    length: number;
    files: DriveFile[];
}

export interface PhotoList {
    length: number;
    photos: Photo[];
}

export interface Job {
    id: string;
    state: string;
    percent: number;
    numFiles: number;
    numProcessed: number;
    error?: ApiError;
}

export interface SearchPhotoParams {
    cameraModel?: string
}

class PhotoApi {

    private static convert<T>(resp: MPhotosResponse<T>): T {
        if(resp.data)
            return resp.data
        else if(resp.error)
            throw new Error(resp.error.code+": "+resp.error.message)
        else
            throw new Error("no payload");
    }

    private static req(url: string, method: string = 'GET'): Promise<any> {
        return fetch(url, {method: method} )
            .then(res => res.json())
    }

    private static reqBody(url: string, data: any, method: string = 'PUT'): Promise<any> {
        return fetch(url,
            {method: method, headers: {'Content-Type': 'application/json'},body: JSON.stringify(data)})
            .then(res => res.json())
    }

    getImageUrl(p: Photo):string {
        return "/api/images/".concat(p.fileName)
    }

    getThumbUrl(p: Photo):string {
        return "/api/thumbs/".concat(p.fileName)
    };

    getProfilePicUrl(u: User): string {
        return u.pic !== "" ? "/api/thumbs/".concat(u.pic) : u.pic;
    }


    checkDrive(): Promise<DriveFiles> {
        return PhotoApi.req('api/drive/check')
            .then(res => res as MPhotosResponse<DriveFiles>).then(res => PhotoApi.convert(res));
    }

    deletePhoto(photoId: string, removeFiles: boolean): Promise<Photo> {
        return PhotoApi.reqBody(`/api/photos/${photoId}`, {removeFiles: removeFiles}, 'DELETE')
            .then(res => res as MPhotosResponse<Photo>).then(res => PhotoApi.convert(res));
    }

    deletePhotos(removeFiles: boolean): Promise<PhotoList> {
        return PhotoApi.reqBody('/api/photos', {removeFiles: removeFiles}, 'DELETE')
            .then(res => res as MPhotosResponse<PhotoList>).then(res => PhotoApi.convert(res));
    }

    login(password: string): Promise<AuthUser> {
        return PhotoApi.reqBody('/api/login', {password: password}, 'POST')
            .then(res => res as MPhotosResponse<AuthUser>).then(res => PhotoApi.convert(res));
    }

    logout(): Promise<AuthUser> {
        return PhotoApi.req('/api/logout')
            .then(res => res as MPhotosResponse<AuthUser>).then(res => PhotoApi.convert(res));
    }

    isLoggedIn(): Promise<boolean> {
        return PhotoApi.req('/api/loggedin')
            .then(res => res as MPhotosResponse<AuthUser>)
            .then(res => PhotoApi.convert(res).authenticated);
    }

    authGoogle(callback: string = '/login') {

    }

    isGoogleAuth(): Promise<boolean> {
        return PhotoApi.req('/api/drive/authenticated')
            .then(res => res as MPhotosResponse<AuthUser>)
            .then(res => PhotoApi.convert(res).authenticated)
    }

    listDrive(): Promise<DriveFiles> {
        return PhotoApi.req('/api/drive')
            .then(res => res as MPhotosResponse<DriveFiles>).then(res => PhotoApi.convert(res));
    }

    getPhotos(limit: number): Promise<PhotoList> {
        return PhotoApi.req(`/api/photos?limit=${limit}`)
            .then(res => res as MPhotosResponse<PhotoList>).then(res => PhotoApi.convert(res))
    }

    searchPhotos(query: string): Promise<PhotoList> {
        return PhotoApi.req(`/api/photos/search${query}`)
            .then(res => res as MPhotosResponse<PhotoList>).then(res => PhotoApi.convert(res))
    }

    getPhoto(photoId: string): Promise<Photo> {
        return PhotoApi.req(`/api/photos/${photoId}`)
            .then(res => res as MPhotosResponse<Photo>).then(res => PhotoApi.convert(res));
    }

    getUser(): Promise<User> {
        return PhotoApi.req('/api/user')
            .then(res => res as MPhotosResponse<User>).then(res => PhotoApi.convert(res));
    }

    statusJob(id: string): Promise<Job> {
        return PhotoApi.req(`/api/photos/job/${id}`)
            .then(res => res as MPhotosResponse<Job>)
            .then(res => PhotoApi.convert(res))
    }

    scheduleUpdatePhotos(): Promise<Job> {
        return PhotoApi.req('/api/photos/job/schedule', 'POST')
            .then(res => res as MPhotosResponse<Job>)
            .then(res => PhotoApi.convert(res));
    }

    updatePhotos(): Promise<DriveFiles> {
        return PhotoApi.req('/api/photos', 'PUT')
            .then(res => res as MPhotosResponse<DriveFiles>)
            .then(res => PhotoApi.convert(res));
    };

    updatePhoto(photoId: string, title: string, description: string, keywords: string): Promise<Photo> {
        const data = {id: photoId, title: title, description: description, keywords: keywords.split(",")}
        return PhotoApi.reqBody(`/api/photos/${photoId}`, data)
            .then(res => res as MPhotosResponse<Photo>)
            .then(res => PhotoApi.convert(res));
    }

    updateUserDrive(name: string): Promise <User> {
        return PhotoApi.reqBody('/api/user/drive', {driveFolderName: name})
            .then(res => res as MPhotosResponse<User>)
            .then(res => PhotoApi.convert(res));
    }

    updateUserPic(pic: string): Promise<User> {
        return PhotoApi.reqBody('/api/user/pic', {pic: pic})
            .then(res => res as MPhotosResponse<User>)
            .then(res => PhotoApi.convert(res))
    }

    updateUser(name: string, bio: string, pic: string): Promise<User> {
        return PhotoApi.reqBody('/api/user', {name: name, bio: bio, pic: pic})
            .then(res => res as MPhotosResponse<User>)
            .then(res => PhotoApi.convert(res));
    }

}

const PhotosApi = new PhotoApi();

export default PhotosApi