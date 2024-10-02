import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type MapProps = {
  locations: number[][] | undefined;
  stopNames: string[];
};

const Map = ({ locations, stopNames }: MapProps) => {
  const center = locations?.find((location) => location[0] && location[1]) as [
    number,
    number
  ];
  return (
    <article className="max-w-4xl mt-[3rem] mx-auto border-solid border-6 rounded-sm">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        className="border-solid border-2 rounded-md "
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="border-solid border-2 rounded-md"
        />
        {locations
          ?.filter((loc) => !(loc[0] === 0 && loc[1] === 0))
          .map((location, index) => {
            return (
              <Marker
                key={index}
                position={[+location[0] || 0, +location[1] || 0]}
              >
                <Popup>
                  <h3>{stopNames?.[index] ?? ""}</h3>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </article>
  );
};
export default Map;
