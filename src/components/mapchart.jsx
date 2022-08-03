import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import Marker from 'react-leaflet-enhanced-marker';
import './mapchart.css';
import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import UsernameMarker from './usernamemarker';

const { VITE_USERNAME, VITE_STYLE_ID, VITE_ACCESS_TOKEN } = import.meta.env;

function SetView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

const MapChart = (props) => {
  var coords = props.coords;
  return (
    <MapContainer
      style={{ height: '100%' }}
      center={[coords[0], coords[1]]}
      zoom={15}
      doubleClickZoom={false}
      closePopupOnClick={false}
      dragging={true}
      zoomSnap={true}
      zoomControl={true}
      zoomDelta={true}
      trackResize={false}
      touchZoom={false}
      scrollWheelZoom={false}
    >
      {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${VITE_USERNAME}/${VITE_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_ACCESS_TOKEN}`}
      />

      {props.locals.map((local, i) => (
        <Marker
          icon={
            <UsernameMarker username={local.username} color={local.color} />
          }
          key={i}
          position={[local.coords[0], local.coords[1]]}
        />
      ))}
      <Marker
        icon={
          <UsernameMarker
            username={props.username + '🎯'}
            color={props.color}
          />
        }
        position={[coords[0], coords[1]]}
      />

      <SetView coords={coords} />
    </MapContainer>
  );
};

export default MapChart;
