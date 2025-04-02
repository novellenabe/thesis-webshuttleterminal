"use client";

import React from "react";
import { useState, useEffect } from "react";
import "./MainMap.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Image from "next/image";
import BusIcon from "../app/Images/Icons/bus.png";

export default function MainMap() {
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  //const position = [10.353497, 123.91259]; // Example coordinates (London)

  const [position, setPosition] = useState([10.353497, 123.91259]);

  const [time, setTime] = useState(new Date());

  const userIcon = L.icon({
    iconUrl: BusIcon.src,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  /*
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);*/

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  /*
<Marker position={position}>
              <Popup>A popup on the marker!</Popup>
            </Marker>
  */
  /* THIS LINE IS MADE*/
  return (
    <div className="mainmap-cnt">
      <div className="mainmap-header-wrp">
        <div className="mainmap-header-cnt h-24">
          <span id="title" className="text-5xl tracking-wide font-normal">
            Live Tracker
          </span>
          <span id="time" className="text-5xl tracking-wide font-normal">
            {formatTime(time)}
          </span>
        </div>
      </div>
      <div className="mainmap-body-cnt">
        <div className="mainmap-bodymap-wrp">
          <MapContainer
            center={position}
            zoom={25}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={userIcon}>
              <Popup>Shuttle 1</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="mainmap-bodyschedule-wrp">
          <div className="schedule-cnt">
            <div className="schedule-header">2</div>
            <div className="schedule-table">
              <div className="schedule-ENTRY">ENTRY 1</div>
              <div className="schedule-ENTRY">ENTRY 2</div>
              <div className="schedule-ENTRY">ENTRY 3</div>
            </div>
            <div className="schedule-footer">2</div>
          </div>
        </div>
      </div>
      <div className="mainmap-footer-wrp h-48">4</div>
    </div>
  );
}

/*
<MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>A popup on the marker!</Popup>
            </Marker>
          </MapContainer>
*/
