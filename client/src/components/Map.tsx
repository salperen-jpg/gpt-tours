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
    <section>
      <h2 className="text-primary font-semibold tracking-wide text-xl">
        Locations
      </h2>
      <article
        className="max-w-2xl mt-[2rem] border-4 border-primary rounded-s"
        onClick={() => console.log("hi there")}
      >
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "30rem", width: "100%" }}
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
    </section>
  );
};
export default Map;
