"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import data from './data'

const defaultPosition: [number, number] = [23.1996395, 77.241076];

function MapsApp({ selectedIcon }) {
  // console.log(selectedIcon);

  const icon = new Icon({
    iconUrl: "marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Filter data based on the selectedIcon category
  const filteredData = data.filter(place => place.category === selectedIcon);

  return (
    <div className="content ml-5 w-[90%] h-[95vh] rounded-sm">
      <div className="map-content flex flex-col gap-6 h-full">
        <MapContainer center={defaultPosition} zoom={4} className="map-container" style={{ height: "100vh", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredData.length > 0 ? (
            filteredData.map((place, index) => (
              <Marker
                key={index}
                position={[place.latitude, place.longitude]}
                icon={icon}
              >
                <Popup className="w-fit">
                  <div key={index} className="card flex border w-fit items-center rounded-lg bg-slate-100 shadow-md">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="card-image w-[150px] h-[150px] rounded-lg border"
                    />
                    <div className="content flex flex-col ml-5 gap-2">
                      <div className="name">{place.name}</div>
                      <div className="description ">{place.desc}</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))
          ) : (
            <p>No places available to display</p>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapsApp;
