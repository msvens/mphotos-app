import {Photo} from "../types/photo";

interface AuthUser {
    authenticated: boolean
}

interface PhotosResponse {
    error?: ApiError;
    data?: Photo[];
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

class PhotoApi {

    checkDrive(): Promise<DriveFiles> {
        return fetch('/api/drive/check')
            .then(res => res.json())
            .then(res => res as MPhotosResponse<DriveFiles>)
            .then(res => {
                if(res.data)
                    return res.data;
                else if(res.error)
                    throw new Error(res.error.message);
                else
                    throw new Error("unknown error");
            })
    }

    deletePhotos(removeFiles: boolean): Promise<PhotoList> {
        const url = removeFiles ? '/api/photos?removeFiles=true' : 'api/photos';
        return fetch(url, {method: 'DELETE'})
            .then(res => res.json())
            .then(res => res as MPhotosResponse<PhotoList>)
            .then(res => {
                if(res.data)
                    return res.data;
                else if(res.error)
                    throw new Error(res.error.message);
                else
                    throw new Error("unknown result");
            })
    }

    login(password: string): Promise<boolean> {
        const formData = new FormData();
        formData.append("password", password);
        return fetch('/api/login', {
            method: 'POST',
            body: formData})
            .then(res => res.json())
            .then(res => res as MPhotosResponse<AuthUser>)
            .then(res => {
                if(res.data)
                    return res.data.authenticated;
                else if(res.error)
                    throw new Error(res.error.message);
                else
                    throw new Error("unknown error")
            });
    }

    logout(): Promise<boolean> {
        return fetch('/api/logout')
            .then(res => res.json())
            .then(res => res as MPhotosResponse<AuthUser>)
            .then(res => {
                if(res.data)
                    return res.data.authenticated;
                else
                    return false;
            })
    }

    isLoggedIn(): Promise<boolean> {

        return fetch('/api/loggedin')
            .then(res => res.json())
            .then(res => res as MPhotosResponse<AuthUser>)
            .then(res => {
                if(res.data)
                    return res.data.authenticated;
                else if(res.error)
                    throw new Error(res.error.message);
                else
                    throw new Error("unknown error")
            })
    }

    listDrive(): Promise<DriveFiles> {
        return fetch('/api/drive')
            .then(res => res.json())
            .then(res => res as MPhotosResponse<DriveFiles>)
            .then(res => {
                if(res.data)
                    return res.data;
                else if(res.error)
                    throw new Error(res.error.message);
                else
                    throw new Error("unknown error");
            })
    }



    getImageUrl(p: Photo):string {
        return "/api/images/".concat(p.fileName)
    }

    getThumbUrl(p: Photo):string {
        return "/api/thumbs/".concat(p.fileName)
    };

    getProfilePicUrl(u: User): string {
        return u.pic ? "/api/thumbs/".concat(u.pic) : "";
    }

    getPhotos(limit: number): Promise<PhotoList> {
        var url = limit > 0 ? '/api/photos?limit='+limit : '/api/photos';
        return fetch(url)
            .then(res => res.json())
            .then(res => res as MPhotosResponse<PhotoList>)
            .then(res => {
                if(res.data)
                    return res.data;
                else if(res.error)
                    throw new Error(res.error.message);
                else
                    throw new Error("unknown data");
            });
    }

    getPhoto(photoId: string): Promise<Photo> {
        return fetch(`/api/photos/${photoId}`)
            .then(res => res.json())
            .then(res => res as MPhotosResponse<Photo>)
            .then(res => {
              if(res.data)
                  return res.data;
              else if(res.error)
                  throw new Error(res.error.message);
              else
                  throw new Error("unknown error")
            });
    };

    getUser(): Promise<User> {
        return fetch('/api/user')
            .then(res => res.json())
            .then(res => res as MPhotosResponse<User>)
            .then(res => {
                if(res.data)
                    return res.data;
                else if(res.error)
                    throw new Error(res.error.message);
                else
                    throw new Error("unknown error")
            })
    }

    updateDriveFolder(name: string): Promise <User> {
        const formData = new FormData();
        formData.append("name", name);
        return fetch('/api/drive', {method: 'POST', body: formData})
            .then(res => res.json())
            .then(res => res as MPhotosResponse<User>)
            .then(res => {
                if(res.data)
                    return res.data;
                else if(res.error)
                    throw new Error(res.error.message);
                else
                    throw new Error("unknown error");
            });
    }

    updatePhotos(): Promise<DriveFiles> {
        return fetch('/api/photos', {method: 'PUT'})
            .then(res => res.json())
            .then(res => res as MPhotosResponse<DriveFiles>)
            .then(res => {
                if(res.data)
                    return res.data;
                else if(res.error)
                    throw new Error(res.error.message);
                else
                    throw new Error("unknown error");
            });
    };

    updateUser(name?: string, bio?: string, pic?: string): Promise<User> {
        const arr = new Array<string>();
        const formData = new FormData();
        if(name) {
            arr.push("name");
            formData.append("name", name);
        }
        if(bio) {
            arr.push("bio");
            formData.append("bio", bio);
        }
        if(pic) {
            arr.push("pic");
            formData.append("pic", pic)
        }
        if (arr.length < 3) {
            formData.append("columns", arr.join(","));
        }
        return fetch('/api/user', {method: 'POST', body: formData})
            .then(res => res.json())
            .then(res => res as MPhotosResponse<User>)
            .then(res => {
                if(res.data)
                    return res.data;
                else if(res.error)
                    throw new Error(res.error.message);
                else
                    throw new Error("unknown error");

            });
    }

    private static isEmpty(str: string): boolean {
       return (!str || 0 === str.length);
    }
}

const PhotosApi = new PhotoApi();

export default PhotosApi