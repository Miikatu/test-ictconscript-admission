import { MapContainer, useMapEvents, TileLayer, Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server'
import L from 'leaflet'
import { Disc2 } from 'lucide-react';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

// Convert Lucide icon to static SVG markup
const iconMarkup = renderToStaticMarkup(<Disc2  className="text-red-800 " size={32} />)

const lucideIcon = L.divIcon({
  html: iconMarkup,
  className: '',
  iconSize: [32, 32],
  popupAnchor: [0, -16],
})

type MapProps = {
  onMapClick: (lat: number, lng: number) => void;}

function SetPinMap( {onMapClick}: MapProps) {
  const [marker, setMarker] = useState<L.LatLng>();

  useMapEvents({
    click(e) {
      setMarker(e.latlng);
      const {lat, lng} = e.latlng;
      onMapClick(lat, lng);
    },
  })

  return (
    <>
      {marker && (
        <Marker position={marker} icon={lucideIcon} >

        </Marker>
      )}
    </>
  )
}

export function MapView({ onMapClick }: MapProps) {
  return (
    <MapContainer
      center={[64.21998431347016, 27.739518474212343]} 
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SetPinMap onMapClick={onMapClick}/>
    </MapContainer>
  );
}