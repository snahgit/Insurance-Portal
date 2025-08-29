declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.sass' {
    const content: { [className: string]: string };
    export default content;
}

interface ImportMetaEnv {
    readonly VAPID_KEY: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_AUTH_DOMAIN: string;
    readonly VITE_FIREBASE_PROJECT_ID: string;
    readonly VITE_FIREBASE_STORAGE_BUCKET: string;
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    readonly VITE_FIREBASE_APP_ID: string;
    readonly VITE_FIREBASE_MEASUREMENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare namespace google {
    namespace maps {
        class Map {
            constructor(element: HTMLElement, options?: MapOptions);
        }
        class Marker {
            constructor(options?: MarkerOptions);
            setPosition(position: LatLng | LatLngLiteral): void;
            setMap(map: Map | null): void;
        }
        class Size {
            constructor(width: number, height: number);
        }
        class DirectionsService {
            route(request: DirectionsRequest, callback: (result: any, status: string) => void): void;
        }
        class DirectionsRenderer {
            constructor(options?: DirectionsRendererOptions);
            setMap(map: Map | null): void;
            setDirections(directions: any): void;
        }
        interface MapOptions {
            center?: LatLng | LatLngLiteral;
            zoom?: number;
            mapTypeId?: string;
        }
        interface MarkerOptions {
            position?: LatLng | LatLngLiteral;
            map?: Map;
            title?: string;
            icon?: string | MarkerIcon;
        }
        interface MarkerIcon {
            url: string;
            scaledSize?: Size;
        }
        interface DirectionsRendererOptions {
            suppressMarkers?: boolean;
            polylineOptions?: PolylineOptions;
        }
        interface PolylineOptions {
            strokeColor?: string;
            strokeWeight?: number;
            strokeOpacity?: number;
        }
        interface DirectionsRequest {
            origin: LatLng | LatLngLiteral | string;
            destination: LatLng | LatLngLiteral | string;
            travelMode: TravelMode;
        }
        interface LatLngLiteral {
            lat: number;
            lng: number;
        }
        class LatLng {
            constructor(lat: number, lng: number);
        }
        enum TravelMode {
            DRIVING = 'DRIVING',
            WALKING = 'WALKING',
            BICYCLING = 'BICYCLING',
            TRANSIT = 'TRANSIT'
        }
    }
}
