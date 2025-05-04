export interface EditarDeviceRequest {
    id: string;
    user: string
    name: string
    identifier: string
    front_photo: string
    side_photo: string
    longitude: number
    latitude: number
}