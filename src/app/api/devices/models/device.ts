export interface Device {
    id: string;
    userId: string;
    name: string;
    status: number;
    statusDesc?: string;
    longitude: number;
    latitude: number;
    address: string;
    waterLevelStatus: number;
}