export interface AdicionarDeviceRequest {
    user: string
    name: string
    identifier: string
    front_photo: File | string
    side_photo: File | string
    longitude: number
    latitude: number
}