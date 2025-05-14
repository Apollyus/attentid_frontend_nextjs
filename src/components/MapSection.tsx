"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default icon issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapSection() {
  const teplicePosition: L.LatLngExpression = [50.6405, 13.8245]; // Teplice coordinates

  const fakePoints: { position: L.LatLngExpression; name: string }[] = [
    { position: [50.641, 13.825], name: "Point A (Teplice)" },
    { position: [50.635, 13.830], name: "Point B (South East)" },
    { position: [50.645, 13.815], name: "Point C (North West)" },
    { position: [50.630, 13.820], name: "Point D (South West)" },
    { position: [50.650, 13.835], name: "Point E (North East)" },
  ];

  return (
    <section className="mb-5 p-5">
      {/*<h2 className="text-xl font-semibold text-primary mb-3">Mapa</h2>*/}
      <div className="h-96 rounded"> {/* Increased height for better map view */}
        <MapContainer center={teplicePosition} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }} attributionControl={false} className="rounded-lg -z-30">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {fakePoints.map((point, idx) => (
            <Marker key={idx} position={point.position} icon={yellowIcon}>
              <Popup>
                {point.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}