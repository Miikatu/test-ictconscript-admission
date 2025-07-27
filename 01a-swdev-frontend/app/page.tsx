"use client"

import Image from "next/image";
import { format } from "date-fns";
import { Button } from "./components/Button";

import { useEffect, useState } from "react";
import { MapPin, Map } from 'lucide-react';
import data from "../../sample-data/data.json"
import dynamic from "next/dynamic";

//Dynamic imports to avoid Error: window is not defined
const MapModal = dynamic(() =>
  import('./components/MapModal').then(mod => mod.MapModal),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

const Modal = dynamic(() =>
  import('./ui/Modal').then(mod => mod.Modal),
  {
    ssr: false,
    loading: () => <p>Loading modal...</p>,
  }
);

type Entry = {
  id: string;
  title: string;
  body?: string;
  isoTime: string;
  lat?: number | null;
  lon?: number | null;
};
const formatCoordinates = (lat?: number | null, lon?: number | null) => {
  if (typeof lat == "number" && typeof lon == "number") {
    console.log("---------- formating worksd");
    return `${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`
  }
}

export default function LogoBook() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [entryData, setEntryData] = useState<Entry[]>(data);
  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapCoords, setMapCoords] = useState<{ lat?: number | null; lon?: number | null}>({});



  useEffect(() => {
    if (showMapModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showMapModal]);


  const handleShowMap = (lat?: number | null, lon?: number | null) => {
    setMapCoords({ lat, lon });
    setShowMapModal(true);
  };
  const handleSubmit = (data: { title: string; body: string; lat?: number; lon?: number }) => {
    const newEntryWithMeta: Entry = {
      ...data,
      id: (entryData.length + 1).toString(),
      isoTime: new Date().toISOString(),
    };

    setEntryData(prev => [...prev, newEntryWithMeta]);
    setModalOpen(false);
  };

  const compareOrder = (a: Entry, b: Entry) => {
    return isNewestFirst
      ? new Date(b.isoTime).getTime() - new Date(a.isoTime).getTime()
      : new Date(a.isoTime).getTime() - new Date(b.isoTime).getTime()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Platoon Logbook</h1>
            <p className="text-gray-600">Field Operations Daily Log</p>
          </div>
          <Button onClick={() => setModalOpen(true)} className=" bg-green-700 hover:bg-green-800">+ Add Entry</Button>

        </div>
        <Button onClick={() => setIsNewestFirst(prev => !prev)} className=" text-gray-600 hover:text-gray-900"> ⇅: {isNewestFirst ? "Newest First" : "Oldest First"}</Button>
        {isModalOpen && (
          <div className="inset-0 flex items-center justify-center bg-gray-100">
            <Modal onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
            <div className="">
            </div>
          </div>
        )}

        <div className="space-y-4">
          {entryData
            .slice().sort(compareOrder)
            .map((entry) => (
              <div key={entry.id} className="bg-white rounded-sm border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <div className="pb-3 flex flex-col space-y-1.5 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-3">
                      <div className="text-gray-400 font-mono inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        #{entry.id}
                      </div>
                      <div className="text-gray-800 text-lg text-2xl font-semibold leading-none tracking-tight">{entry.title}</div>
                    </div>
                  </div>
                  <div id="date" className="flex flex-col sm:flex-row gap-4 text-sm text-sm text-muted-foreground">
                    <span className="text-gray-600 flex items-center gap-1">
                      <div className="h-4" />
                      {format(new Date(entry.isoTime), "MMM dd, yyyy HH:mm")}
                    </span>
                    <div id="coordinates" className="">
                      {entry.lat && entry.lon && (
                        <div className="flex items-center gap-4">
                          <a
                            href={`https://maps.google.com/?q=${entry.lat},${entry.lon}`}
                            className=" text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            <MapPin className="w-4 h-4 inline" />
                            {formatCoordinates(entry.lat, entry.lon)}
                          </a>
                          <div
                            onClick={() => handleShowMap(entry.lat, entry.lon)}
                            
                            className="px-2 cursor-pointer border-blue-400  text-black hover:text-gray-700 hover:underline">
                            <Map className="inline py-0 mb-2" />
                            Show on Map</div>
                        </div>

                      )}
                    </div>
                  </div>
                  {showMapModal && mapCoords.lat && mapCoords.lon && (
                    <div className="fixed z-50 inset-0 flex backdrop-blur-sm items-center justify-center ">
                      <div className="bg-white  rounded-sm border shadow-lg w-100 max-w-2xl p-4 relative">
                        <button
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowMapModal(false)}
                        >
                          ✕
                        </button>
                        <div id="leaflet-map" className="pt-5 h-[400px] rounded-sm overflow-hidden" >
                          <MapModal lat={mapCoords.lat} lon={mapCoords.lon} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div id="" className="pt-0 ">
                    <p className="text-gray-700">{entry.body}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
