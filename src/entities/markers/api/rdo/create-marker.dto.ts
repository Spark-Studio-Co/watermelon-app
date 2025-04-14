export interface ICreateMarkerDTO {
    type: string | null;
    latitude: number | null;
    longitude: number | null;
    name: string | undefined;
    description?: string | undefined;
    ownerId: string | null;
    isPrivate: boolean;
    radius?: number;
    radiusColor?: string;
    image?: File[];
}