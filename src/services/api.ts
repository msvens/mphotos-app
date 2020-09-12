import {Photo} from "../types/photo";

interface AuthUser {
    authenticated: boolean
}

interface MPhotosResponse<T> {
    error?: ApiError
    data?: T
}

export enum PhotoType {
    Square = 0,
    Landscape,
    Portrait,
    Resize,
    Original,
    Thumb,
    Dynamic
}

export interface Album {
    name: string;
    description: string;
    coverPic: string
}

export interface AlbumCollection {
    info: Album;
    photos: PhotoList;
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

export enum ImageAspect {
    LANDSCAPE,
    PORTRAIT,
    SQUARE
}


class PhotoApi {

    private static convert<T>(resp: MPhotosResponse<T>): T {
        if(resp.data)
            return resp.data;
        else if(resp.error)
            throw new Error(resp.error.code+": "+resp.error.message);
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

    landscapeURL(p: Photo): string {
        return "/api/landscapes/".concat(p.fileName)
    }

    portraitURL(p: Photo): string {
        return "/api/portraits/".concat(p.fileName)
    }

    squareURL(p: Photo): string {
        return "/api/squares/".concat(p.fileName)
    }

    resizeURL(p: Photo): string {
        return "/api/resizes/".concat(p.fileName)
    }

    orignialURL(p: Photo): string {
        return "/api/images/".concat(p.fileName)
    }


    aspect(p: Photo): ImageAspect {
        const rat = p.width / p.height
        if(rat >= 1.25)
            return ImageAspect.LANDSCAPE
        else if(rat >= 0.8)
            return ImageAspect.SQUARE
        else
            return ImageAspect.PORTRAIT
    }

    imagePath(p: Photo): string {
        switch(this.aspect(p)) {
            case ImageAspect.PORTRAIT:
                return this.portraitURL(p)
            case ImageAspect.SQUARE:
                return this.squareURL(p)
            case ImageAspect.LANDSCAPE:
                return this.landscapeURL(p)
        }
    }

    getImageUrl(p: Photo, type: PhotoType, portraitView?: boolean, largeDisplay?: boolean):string {
        switch(type) {
            case PhotoType.Thumb:
                return "/api/thumbs/".concat(p.fileName)
            case PhotoType.Landscape:
                return this.landscapeURL(p)
            case PhotoType.Portrait:
                return this.portraitURL(p)
            case PhotoType.Square:
                return this.squareURL(p)
            case PhotoType.Resize:
                return this.resizeURL(p)
            case PhotoType.Original:
                return this.orignialURL(p)
            case PhotoType.Dynamic:
                const a = this.aspect(p)
                if (portraitView === undefined && largeDisplay === undefined) {
                    return this.imagePath(p).concat(p.fileName)
                } else if(largeDisplay === undefined) {
                    if (portraitView) {
                        return a == ImageAspect.PORTRAIT ? this.portraitURL(p) : this.squareURL(p)
                    } else {
                        return "/api/landscapes/".concat(p.fileName)
                    }
                } else {//both portrait and large display
                    if (portraitView)
                        return a === ImageAspect.PORTRAIT ? this.portraitURL(p) : this.squareURL(p)
                    else if(largeDisplay && a === ImageAspect.LANDSCAPE)
                        return this.resizeURL(p)
                    else
                        return this.landscapeURL(p)
                }
        }
    }

    getAlbums(): Promise<Album[]> {
        return PhotoApi.req(`/api/albums`)
            .then(res => res as MPhotosResponse<Album[]>).then(res => PhotoApi.convert(res));
    }

    getAlbum(name: string): Promise<AlbumCollection> {
        return PhotoApi.req(`/api/albums/${name}`)
            .then(res => res as MPhotosResponse<AlbumCollection>).then(res => PhotoApi.convert(res))
    }

    getThumbUrl(p: Photo):string {
        return this.getImageUrl(p, PhotoType.Thumb)
    };

    getThumbUrlId(id: string):string {
        return "/api/thumbs/".concat(id)
    };

    getProfilePicUrl(u: User): string {
        return u.pic !== "" ? "/api/thumbs/".concat(u.pic) : u.pic;
    }


    checkDrive(): Promise<DriveFiles> {
        return PhotoApi.req('api/drive/check')
            .then(res => res as MPhotosResponse<DriveFiles>).then(res => PhotoApi.convert(res));
    }

    deleteAlbum(name: string): Promise<Album> {
        return PhotoApi.req(`/api/albums/${name}`, 'DELETE')
            .then(res => res as MPhotosResponse<Album>).then(res => PhotoApi.convert(res));
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

    getPhotoAlbums(photoId: string): Promise<string[]> {
        return PhotoApi.req(`/api/photos/${photoId}/albums`)
            .then(res => res as MPhotosResponse<string[]>).then(res => PhotoApi.convert(res))
    }

    getPhotos(limit: number, offset?: number): Promise<PhotoList> {
        const url = offset ? `/api/photos?limit=${limit}&offset=${offset}`
            : `/api/photos?limit=${limit}`;
        return PhotoApi.req(url)
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
    };

    scheduleUpdatePhotos(): Promise<Job> {
        return PhotoApi.req('/api/photos/job/schedule', 'POST')
            .then(res => res as MPhotosResponse<Job>)
            .then(res => PhotoApi.convert(res));
    };

    updateAlbum(description: string, coverPic: string, name: string): Promise<Album> {
        const data = {description: description, coverPic: coverPic, name: name};
        return PhotoApi.reqBody(`/api/albums/${name}`, data)
            .then(res => res as MPhotosResponse<Album>)
            .then(res => PhotoApi.convert(res));
    }

    updatePhotos(): Promise<DriveFiles> {
        return PhotoApi.req('/api/photos', 'PUT')
            .then(res => res as MPhotosResponse<DriveFiles>)
            .then(res => PhotoApi.convert(res));
    };

    updatePhoto(photoId: string, title: string, description: string, keywords: string, albums: string): Promise<Photo> {
        const data = {id: photoId, title: title, description: description,
            keywords: keywords.split(","), albums: albums.split(",")};
        return PhotoApi.reqBody(`/api/photos/${photoId}`, data)
            .then(res => res as MPhotosResponse<Photo>)
            .then(res => PhotoApi.convert(res));
    }

    togglePrivate(photoId: string): Promise<Photo> {
        return PhotoApi.req(`/api/photos/${photoId}/private`, "POST")
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