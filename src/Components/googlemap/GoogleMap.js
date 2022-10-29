import "./map.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Polyline, Marker} from "react-leaflet";
import teslaProject from "./tesla-site.json";

const GoogleMap = () => {

    const filteredData = teslaProject.filter(data => data.address.country === "Italy");
    return (
        <MapContainer center={[42.733883, 25.485830]} zoom={6} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredData.map(data => (
                <Marker
                   key={data.id}
                   position={[data.gps.latitude, data.gps.longitude ]}
                >
                    <Popup position={[data.gps.latitude, data.gps.longitude ]}>
                        <div>
                            <h2>{"Name:" + data.name}</h2>
                            <p>{"Status:" + data.status}</p>
                            <p>{"Number Of Charging Station:" + data.stallCount}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default GoogleMap;
