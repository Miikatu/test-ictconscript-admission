import { MapContainer, useMapEvents, TileLayer, Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server'
import L from 'leaflet'
import { Disc2 } from 'lucide-react';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';


interface MapModalProps {
  lat: number;
  lon: number;
}

// Convert Lucide icon to static SVG markup
const iconMarkup = renderToStaticMarkup(<Disc2  className="text-red-800 " size={32} />)

const lucideIcon = L.divIcon({
  html: iconMarkup,
  className:"",
  iconSize: [32, 32],
  popupAnchor: [0, -16],
})

function SetPinMap({ lat, lon }: { lat: number; lon: number }) {
  return (
    <Marker position={[lat, lon]} icon={lucideIcon} />
  );
}

export function MapModal( {lat, lon}: MapModalProps) {
  return (
    <MapContainer
      center={[lat, lon]} 
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SetPinMap lat={lat} lon={lon} />
    </MapContainer>
  );
}