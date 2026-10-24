'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_KEY || '';

const Map = ({ latitude = 10.4806, longitude = -66.9036, address = "Caracas, Venezuela", tileStyle = 'default', markerColor = '#EA7314' }) => {
    // Available tile layers
    const tileProviders = {
        default: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        hot: {
            url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">HOT</a>'
        },
        cartoLight: {
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=' + CARTO_KEY,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        },
        cartoDark: {
            url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=' + CARTO_KEY,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        },
        cartoVoyager: {
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=' + CARTO_KEY,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
    };

    const selectedTile = tileProviders[tileStyle] || tileProviders.default;

    // Create custom marker icon with customizable color
    const customIcon = divIcon({
        html: `
            <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                    fill="${markerColor}"
                    stroke="#ffffff"
                    stroke-width="1"
                />
            </svg>
        `,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    return (
        <MapContainer 
            center={[latitude, longitude]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution={selectedTile.attribution}
                url={selectedTile.url}
            />
            <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>{address}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;