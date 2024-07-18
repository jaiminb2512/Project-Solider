import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import './map.scss';
import "leaflet/dist/leaflet.css";
import Pin from '../../pin/Pin';

function Map({ items, className }) {
  return (
    <div className={`map ${className}`}>
      <MapContainer center={[23.0316039, 72.507542]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map(item => (
          <Pin key={item.id} item={item} />
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;