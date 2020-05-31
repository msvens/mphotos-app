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
}

