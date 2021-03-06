interface AuthUser {
    authenticated: boolean
}

interface GuestLike {
    like: boolean
}

interface MPhotosResponse<T> {
    error?: ApiError
    data?: T
}

export type Camera = {
    id: string
    model: string
    make: string
    year: number
    effectivePixels: number
    totalPixels: number
    sensorSize: string
    sensorType: string
    sensorResolution: string
    imageResolution: string
    cropFactor: number
    opticalZoom: number
    digitalZoom: boolean
    iso: string
    raw: boolean
    manualFocus: boolean
    focusRange: number
    macroFocusRange: number
    focalLengthEquiv: string
    aperturePriority: boolean
    maxAperture: string
    maxApertureEquiv: string
    metering: string
    exposureComp: string
    shutterPriority: boolean
    minShutterSpeed: string
    maxShutterSpeed: string
    builtInFlash: boolean
    externalFlash: boolean
    viewFinder: string
    videoCapture: boolean
    maxVideoResolution: string
    gps: boolean
    image: string
}

type CameraSettingDisplay = {
    displayName: string
    displayValue: string
    rawValue: string
}
export function getCameraSettingDisplayName(setting: string, c: Camera): CameraSettingDisplay {

    function r(display: string, value: string, raw?: string): CameraSettingDisplay {
        return raw ? {displayName: display, displayValue: value, rawValue: raw} :
            {displayName: display, displayValue: value, rawValue: value}
    }
    switch (setting) {
        case "model":
            return r("Model", c.model)
        case "make":
            return r("Make", c.make)
        case "year":
            return r("Year", c.year.toString())
        case "effectivePixels":
            return r("Effective Pixels", ""+(c.effectivePixels/1000000)+"M", c.effectivePixels.toString())
        case "totalPixels":
            return r("Total Pixels", ""+(c.totalPixels/1000000)+"M", c.totalPixels.toString())
        case "sensorSize":
            return r("Sensor Size", c.sensorSize)
        case "sensorType":
            return r("Sensor Type", c.sensorType)
        case "sensorResolution":
            return r("Sensor Resolution", c.sensorResolution)
        case "imageResolution":
            return r("Image Resolution", c.imageResolution)
        case "cropFactor":
            return r("Crop Factor", c.cropFactor.toString())
        case "opticalZoom":
            return r("Optical Zoom", c.opticalZoom+"x", c.opticalZoom.toString())
        case "digitalZoom":
            return r("Digital Zoom", c.digitalZoom ? "Yes" : "No", c.digitalZoom.toString())
        case "iso":
            return r("ISO", c.iso)
        case "raw":
            return r("Supports Raw", c.raw ? "Yes" : "No", c.raw.toString())
        case "manualFocus":
            return r("Manual Focus", c.manualFocus ? "Yes" : "No", c.manualFocus.toString())
        case "focusRange":
            return r("Focus Range", c.focusRange+" cm", c.focusRange.toString())
        case "macroFocusRange":
            return r("Macro Focus Range", c.macroFocusRange+" cm", c.macroFocusRange.toString())
        case "focalLengthEquiv":
            return r("Focal Length (35mm)", c.focalLengthEquiv)
        case "aperturePriority":
            return r("Aperture Priority", c.aperturePriority ? "Yes" : "No", c.aperturePriority.toString())
        case "maxAperture":
            return r("Max Aperture", c.maxAperture)
        case "maxApertureEquiv":
            return r("Max Aperture (35mm)", c.maxApertureEquiv)
        case "metering":
            return r("Metering", c.metering)
        case "exposureComp":
            return r("Exposure Compensation", c.exposureComp)
        case "shutterPriority":
            return r("Shutter Priority", c.shutterPriority ? "Yes" : "No", c.shutterPriority.toString())
        case "minShutterSpeed":
            return r("Min Shutter Priority", c.minShutterSpeed)
        case "maxShutterSpeed":
            return r("Max Shutter Speed", c.maxShutterSpeed)
        case "builtInFlash":
            return r("Built-in Flash", c.builtInFlash ? "Yes" : "No", c.builtInFlash.toString())
        case "externalFlash":
            return r("External Flash", c.externalFlash ? "Yes" : "No", c.externalFlash.toString())
        case "viewFinder":
            return r("View Finder", c.viewFinder)
        case "videoCapture":
            return r("Video Capture", c.videoCapture ? "Yes" : "No", c.videoCapture.toString())
        case "maxVideoResolution":
            return r("Max Video Resolution", c.maxVideoResolution)
        case "gps":
            return r("GPS", c.gps ? "Yes" : "No", c.gps.toString())
        case "image":
            return r("Image", c.image)
        default:
            return r(setting, "not defined")
    }
}

export function setCameraSetting(c: Camera, key: string, value: string): Camera {

    function getNumber(current: number, newValue: string): number {
        let v = Number(newValue)
        return Number.isNaN(v) ? current : v
    }

    function getBoolean(newValue: string): boolean {
        let n = newValue.trim().toLowerCase()
        return !n || n === 'false' || n === 'no' || n === '0' ? false : true
    }

    const cc: Camera = {...c}
    switch (key) {
        case "model":
            cc.model = value; break
        case "make":
            cc.make = value; break
        case "year":
            cc.year = getNumber(cc.year, value); break
        case "effectivePixels":
            cc.effectivePixels = getNumber(cc.effectivePixels, value); break
        case "totalPixels":
            cc.totalPixels = getNumber(cc.totalPixels, value); break
        case "sensorSize":
            cc.sensorSize = value; break
        case "sensorType":
            cc.sensorType = value; break
        case "sensorResolution":
            cc.sensorResolution = value; break
        case "imageResolution":
            cc.imageResolution = value; break
        case "cropFactor":
            cc.cropFactor = getNumber(cc.cropFactor, value); break
        case "opticalZoom":
            cc.opticalZoom = getNumber(cc.opticalZoom, value); break
        case "digitalZoom":
            cc.digitalZoom = getBoolean(value); break
        case "iso":
            cc.iso = value; break
        case "raw":
            cc.raw = getBoolean(value); break
        case "manualFocus":
            cc.manualFocus = getBoolean(value); break
        case "focusRange":
            cc.focusRange = getNumber(cc.focusRange, value); break
        case "macroFocusRange":
            cc.macroFocusRange = getNumber(cc.macroFocusRange, value); break
        case "focalLengthEquiv":
            cc.focalLengthEquiv = value; break
        case "maxAperture":
            cc.maxAperture = value; break
        case "maxApertureEquiv":
            cc.maxApertureEquiv = value; break
        case "metering":
            cc.metering = value; break
        case "exposureComp":
            cc.exposureComp = value; break
        case "shutterPriority":
            cc.shutterPriority = getBoolean(value); break
        case "minShutterSpeed":
            cc.minShutterSpeed = value; break
        case "maxShutterSpeed":
            cc.maxShutterSpeed = value; break
        case "builtInFlash":
            cc.builtInFlash = getBoolean(value); break
        case "externalFlash":
            cc.externalFlash = getBoolean(value); break
        case "viewFinder":
            cc.viewFinder = value; break
        case "videoCapture":
            cc.videoCapture = getBoolean(value);  break
        case "maxVideoResolution":
            cc.maxVideoResolution = value; break
        case "gps":
            cc.gps = getBoolean(value); break
        case "image":
            cc.image = value; break

    }
    return cc
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
    id: number
    name: string
    description: string
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

export interface PhotoComment {
    id: number
    driveId: string
    guest: string
    time: string
    body: string
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

export interface Exif {
    title?: string;
    keywords?: string[];
    software?: string;
    rating?: number;

    cameraMake: string;
    cameraModel: string;
    lensInfo?: string;
    lensMake?: string;
    focalLength?: string;
    focalLengthIn35mmFormat?: string;
    maxApertureValue?: number;
    flash?: string;

    exposureTime?: string;
    exposureCompensation?: number;
    exposureProgram?: string;
    fNumber?: number;
    ISO?: number;
    colorSpace?: string;
    xResolution?: number;
    yResolution?: number;
    imageWidth?: number;
    imageHeight?: number;

    originalDate: string;
    modifyDate: string;

    gpsLatitude?: string;
    gpsLongitude?: string;
    city?: string;
    country?: string;
    state?: string;
}

export interface Guest {
    email: string;
    name: string;
}

export interface Verify {
    verified: boolean
    time: string

}

export interface Photo {
    driveId: string;
    md5: string;
    fileName: string;
    title: string;
    keywords: string;
    description: string;
    driveDate: string;
    originalDate: string;
    cameraMake: string;
    cameraModel: string;
    lensMake?: string;
    lensModel?: string;
    focalLength: string;
    focalLength35: string;
    iso: number;
    exposure: string;
    fNumber: number;
    width: number;
    height: number;
    private: boolean;
    likes: number;
}

export interface PhotoList {
    length: number;
    photos: Photo[];
}

export enum JobState {
    SCHEDULED = "SCHEDULED",
    STARTED = "STARTED",
    FINISHED = "FINISHED",
    ABORTED = "ABORTED"
}

//type JobState = "SCHEDULED" | "STARTED" | "FINISHED" | "ABORTED"

export interface Job {
    id: string;
    state: JobState;
    percent: number;
    numFiles: number;
    numProcessed: number;
    error?: ApiError;
}

export type SearchPhotoParams = {
    cameraModel?: string
}

export function createPhotoSearchParams(cameraModel: string): SearchPhotoParams {
    return {cameraModel: cameraModel}
}

export function parseSearchParams(queryString: string): SearchPhotoParams {
    const urlParams = new URLSearchParams(queryString)
    const cm = urlParams.get("cameraModel")
    return {cameraModel: cm === null ? undefined : cm}
}

const searchSpace = new RegExp(/\s+/g)

export function toCameraId(cameraModel: string): string {
    return cameraModel.toLowerCase().replaceAll(searchSpace,'-')
}

export function toQueryString(params: SearchPhotoParams): string {
    const urlParams = new URLSearchParams()
    if(params.cameraModel)
        urlParams.append("cameraModel", params.cameraModel)
    return urlParams.toString()
}

export type UXConfig = {
    photoGridCols: number
    photoItemsLoad: number
    photoGridSpacing: number
    showBio: boolean
    photoBackgroundColor: string
    photoBorders: "none" | "all" | "left-right"
    colorTheme: "light" | "dark"

    denseTopBar: boolean
    denseBottomBar: boolean
}

export type PhotoSearch = {
    cameraModel?: string

}

export enum ImageAspect {
    LANDSCAPE,
    PORTRAIT,
    SQUARE
}

export enum Colors {
    White = "#fff",
    Light = "#fafafa",
    Grey = "#bdbdbd",
    Dark = "#303030",
    Black = "#000000"
}

export enum CameraImageSize {
    Tiny= "48",
    Small = "192",
    Medium = "512",
    Original = "O0"
}

const LightBackgroundText = 'rgba(0, 0, 0, 0.87)'

export type ColorScheme = {
    backgroundColor: string
    color: string
}

export function colorScheme(backroundColor: string): ColorScheme {
    switch (backroundColor) {
        case Colors.White:
        case Colors.Light:
        case Colors.Grey:
            return {backgroundColor: backroundColor, color: LightBackgroundText}
        case Colors.Dark:
        case Colors.Black:
            return {backgroundColor: backroundColor, color: Colors.White}
        default:
            return {backgroundColor: Colors.Light, color: LightBackgroundText}
    }
}

class PhotoApi {

    defaultUxConfig: UXConfig = {photoGridCols: 3, photoGridSpacing: 0, photoItemsLoad: 12,
        showBio: true, photoBackgroundColor: Colors.Light, colorTheme: "light",
        denseBottomBar: false, denseTopBar: false, photoBorders: "all"}

    private idCounter = 0

    nextId(): number {
        let ret = this.idCounter
        this.idCounter++
        return ret
    }

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

    authGoogle(callback: string = '/login') {

    }

    landscapeURL(p: Photo): string {
        return "/api/landscapes/".concat(p.fileName)
    }

    toDate(ts: string): Date {
        return new Date(ts)
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

    addAlbum(name: string, description: string, coverPic: string): Promise<Album> {
        const data = {description: description, coverPic: coverPic, name: name};
        return PhotoApi.reqBody('/api/albums', data)
            .then(res => res as MPhotosResponse<Album>)
            .then(res => PhotoApi.convert(res));
    }

    checkDrive(): Promise<DriveFiles> {
        return PhotoApi.req('/api/drive/check')
            .then(res => res as MPhotosResponse<DriveFiles>).then(res => PhotoApi.convert(res));
    }

    commentPhoto(photoId: string, comment: string): Promise <Comment> {
        return PhotoApi.reqBody(`/api/comments/${photoId}`, {body: comment}, 'POST')
            .then(res => res as MPhotosResponse<Comment>).then(res => PhotoApi.convert(res))
    }

    deleteAlbum(id: number): Promise<Album> {
        return PhotoApi.req(`/api/albums/${id}`, 'DELETE')
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

    getImageUrl(p: Photo, type: PhotoType, portraitView: boolean, largeDisplay: boolean):string {
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
                if (largeDisplay) { //dont use any specifics
                    return this.resizeURL(p)
                }
                if (portraitView) {
                    const a = this.aspect(p)
                    return a === ImageAspect.PORTRAIT ? this.portraitURL(p) : this.squareURL(p)
                } else {
                    return "/api/landscapes/".concat(p.fileName)
                }
        }
    }

    getUXConfig(): Promise<UXConfig> {
        return PhotoApi.req('/api/user/config')
            .then(res => res as MPhotosResponse<UXConfig>)
            .then(res => PhotoApi.convert(res))
        //return this.uxConfig
    }

    getAlbums(): Promise<Album[]> {
        return PhotoApi.req(`/api/albums`)
            .then(res => res as MPhotosResponse<Album[]>).then(res => PhotoApi.convert(res));
    }

    getAlbum(id: number): Promise<AlbumCollection> {
        return PhotoApi.req(`/api/albums/${id}`)
            .then(res => res as MPhotosResponse<AlbumCollection>).then(res => PhotoApi.convert(res))
    }

    getCamera(id: string): Promise<Camera> {
        return PhotoApi.req(`/api/cameras/${id}`)
            .then(res => res as MPhotosResponse<Camera>).then(res => PhotoApi.convert(res))
    }

    getCameraId(p: Photo): string {
        return p.cameraModel.toLowerCase().replace(/\s+/g,'-')
    }

    getCameraImageUrl(camera: Camera, size: CameraImageSize = CameraImageSize.Original) {
        if (camera.image === "") {
            return '/camera-outline.png'
        }
        else if(size === CameraImageSize.Original)
            return `/api/cameras/${camera.id}/image`
        else
            return `/api/cameras/${camera.id}/image/${size}`
    }

    getCameras(): Promise<Camera[]> {
        return PhotoApi.req(`/api/cameras`)
            .then(res => res as MPhotosResponse<Camera[]>).then(res => PhotoApi.convert(res))
    }

    getThumbUrlId(id: string):string {
        return "/api/thumbs/".concat(id)
    }


    getProfilePicUrl(u: User): string {
        return u.pic !== "" ? "/api/thumbs/".concat(u.pic) : u.pic;
    }

    getPhotoComments(photoId: string): Promise<PhotoComment[]> {
        return PhotoApi.req(`/api/comments/${photoId}`)
            .then(res => res as MPhotosResponse<PhotoComment[]>)
            .then(res => PhotoApi.convert(res))
    }

    getPhotoLikes(photoId: string): Promise<Guest[]> {
        return PhotoApi.req(`/api/likes/${photoId}`)
            .then(res => res as MPhotosResponse<Guest[]>)
            .then(res => PhotoApi.convert(res))
    }

    getGuest(): Promise<Guest> {
        return PhotoApi.req('/api/guest')
            .then(res => res as MPhotosResponse<Guest>)
            .then(res => PhotoApi.convert(res))
    }

    getGuestLikes(): Promise<string[]> {
        return PhotoApi.req('/api/guest/likes')
            .then(res => res as MPhotosResponse<string[]>)
            .then(res => PhotoApi.convert(res))
    }

    getGuestLike(photoId: string): Promise<boolean> {
        return PhotoApi.req(`/api/guest/likes/${photoId}`)
            .then(res => res as MPhotosResponse<GuestLike>)
            .then(res => PhotoApi.convert(res).like)
    }

    getPhotoAlbums(photoId: string): Promise<Album[]> {
        return PhotoApi.req(`/api/photos/${photoId}/albums`)
            .then(res => res as MPhotosResponse<Album[]>).then(res => PhotoApi.convert(res))
    }

    getPhotos(limit: number, offset?: number): Promise<PhotoList> {
        const url = offset ? `/api/photos?limit=${limit}&offset=${offset}`
            : `/api/photos?limit=${limit}`;
        return PhotoApi.req(url)
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

    isGoogleAuth(): Promise<boolean> {
        return PhotoApi.req('/api/drive/authenticated')
            .then(res => res as MPhotosResponse<AuthUser>)
            .then(res => PhotoApi.convert(res).authenticated)
    }

    isGuest(): Promise<boolean> {
        return PhotoApi.req('/api/guest/is')
            .then(res => res as MPhotosResponse<AuthUser>)
            .then(res => PhotoApi.convert(res).authenticated)
    }

    isLoggedIn(): Promise<boolean> {
        return PhotoApi.req('/api/loggedin')
            .then(res => res as MPhotosResponse<AuthUser>)
            .then(res => PhotoApi.convert(res).authenticated);
    }

    likePhoto(photoId: string): Promise<string> {
        return PhotoApi.req(`/api/likes/${photoId}`,'POST')
            .then(res => res as MPhotosResponse<string>).then(res => PhotoApi.convert(res))
    }

    listDrive(): Promise<DriveFiles> {
        return PhotoApi.req('/api/drive')
            .then(res => res as MPhotosResponse<DriveFiles>).then(res => PhotoApi.convert(res));
    }

    login(password: string): Promise<AuthUser> {
        return PhotoApi.reqBody('/api/login', {password: password}, 'POST')
            .then(res => res as MPhotosResponse<AuthUser>).then(res => PhotoApi.convert(res));
    }

    logout(): Promise<AuthUser> {
        return PhotoApi.req('/api/logout')
            .then(res => res as MPhotosResponse<AuthUser>).then(res => PhotoApi.convert(res));
    }

    logoutGuest(): Promise<AuthUser> {
        return PhotoApi.req('/api/guest/logout')
            .then(res => res as MPhotosResponse<AuthUser>).then(res => PhotoApi.convert(res))
    }

    registerGuest(name: string, email: string): Promise<Guest> {
        const data = {name: name, email: email}
        return PhotoApi.reqBody('/api/guest', data, 'POST')
            .then(res => res as MPhotosResponse<Guest>).then(res => PhotoApi.convert(res))
    }

    searchPhotos(query: SearchPhotoParams): Promise<PhotoList> {
        return PhotoApi.req(`/api/photos/search?${toQueryString(query)}`)
            .then(res => res as MPhotosResponse<PhotoList>).then(res => PhotoApi.convert(res))
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
    }

    togglePrivate(photoId: string): Promise<Photo> {
        return PhotoApi.req(`/api/photos/${photoId}/private`, "POST")
            .then(res => res as MPhotosResponse<Photo>)
            .then(res => PhotoApi.convert(res));
    }

    unlikePhoto(photoId: string): Promise<string> {
        return PhotoApi.req(`/api/likes/${photoId}`,'DELETE')
            .then(res => res as MPhotosResponse<string>).then(res => PhotoApi.convert(res))
    }

    updateAlbum(album: Album): Promise<Album> {
        return PhotoApi.reqBody(`/api/albums/${album.id}`, album)
            .then(res => res as MPhotosResponse<Album>)
            .then(res => PhotoApi.convert(res))
    }

    updateCamera(camera: Camera): Promise<Camera> {
        return PhotoApi.reqBody(`/api/cameras/${camera.id}`, camera)
            .then(res => res as MPhotosResponse<Camera>)
            .then(res => PhotoApi.convert(res))
    }

    updateCameraImage(cameraId: string, imageURL: string): Promise <Camera> {
        return PhotoApi.reqBody(`/api/cameras/${cameraId}/image`, {url: imageURL})
            .then(res => res as MPhotosResponse<Camera>)
            .then(res => PhotoApi.convert(res))
    }

    updateGuest(name: string, email: string): Promise<Guest> {
        const data = {name: name, email: email}
        return PhotoApi.reqBody('/api/guest/update', data, 'POST')
            .then(res => res as MPhotosResponse<Guest>).then(res => PhotoApi.convert(res))
    }

    updatePhotos(): Promise<DriveFiles> {
        return PhotoApi.req('/api/photos', 'PUT')
            .then(res => res as MPhotosResponse<DriveFiles>)
            .then(res => PhotoApi.convert(res));
    };

    updatePhoto(photoId: string, title: string, description: string, keywords: string, albums: number[]): Promise<Photo> {
        const data = {id: photoId, title: title, description: description,
            keywords: keywords.split(","), albums: albums}
        return PhotoApi.reqBody(`/api/photos/${photoId}`, data)
            .then(res => res as MPhotosResponse<Photo>)
            .then(res => PhotoApi.convert(res));
    }

    updateUXConfig(uxConfig: UXConfig): Promise<UXConfig> {
        return PhotoApi.reqBody('/api/user/config', uxConfig, "POST")
            .then(res => res as MPhotosResponse<UXConfig>)
            .then(res => PhotoApi.convert(res))
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

    verifyGuest(query: string): Promise<boolean> {
        return PhotoApi.req(`/api/guest/verify${query}`)
            .then(res => res as MPhotosResponse<Verify>)
            .then(res => PhotoApi.convert(res).verified)
    }

}

const PhotosApi = new PhotoApi();

export default PhotosApi