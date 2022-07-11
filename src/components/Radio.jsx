import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import { RadioBrowserApi } from "radio-browser-api";
import "react-h5-audio-player/lib/styles.css";
import fallbackImg from "../assets/radio-img.webp";

const Radio = () => {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("all");

  const setDefaultSrc = (event) => {
    event.target.src = fallbackImg;
  };

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      setStations(data);
    });
  }, [stationFilter]);

  const setupApi = async () => {
    const api = new RadioBrowserApi("My Radio App");
    const stations = await api
      .searchStations({
        // language: "english",
        countryCode: "US",
        tag: stationFilter,
        limit: 30,
      })
      .then((data) => {
        return data;
      });
    console.log(stations);
    return stations;
  };

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter, index) => (
          <span
            key={index}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
      <div className="stations">
        {stations &&
          stations.map((station, index) => {
            return (
              <div className="station" key={index}>
                <div className="stationName">
                  <img
                    className="logo"
                    src={station.favicon}
                    alt="station logo"
                    onError={setDefaultSrc}
                  />
                  <div className="name">{station.name.slice(0, 40)}</div>
                </div>
                <AudioPlayer
                  className="player"
                  src={station.urlResolved}
                  showJumpControls={false}
                  layout="stacked"
                  customProgressBarSection={[]}
                  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                  autoPlayAfterSrcChange={false}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Radio;
