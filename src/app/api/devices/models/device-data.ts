export interface DeviceData {
    id: string;
    device: string;
    distance_to_water: string;
    pluviometer_value: string;
    created_at: string;
    updated_at: string;
    status: 'normal' | 'alert' | 'danger';
}
