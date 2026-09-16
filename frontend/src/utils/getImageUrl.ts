interface GetImageUrlParams {
    baseUrl: string;
    imagePath: string | null;
    imageSize: string;
    placeholder: string;
}

export const getImageUrl = ( { baseUrl, imagePath, imageSize, placeholder }: GetImageUrlParams): string => {
    
    if (!imagePath) {
        return placeholder;
    }

    return `${baseUrl}${imageSize}${imagePath}`;
}