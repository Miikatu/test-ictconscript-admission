"use client"

import Image from "next/image";
import { format } from "date-fns";
import { Button } from "./components/Button";
import { Modal } from "./ui/Modal";
import { useState } from "react";
import data from "../../sample-data/data.json"

const formatCoordinates = (lat: number, lon: number) => {
  if (lat && lon)
    return `${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`
}




export default function LogoBook() {
  const [isModalOpen,setModalOpen] = useState(false);
  const [entryData,setEntryData] = useState(data);


const handleSubmit = (data: { title: string; description: string; lat?: number; lon?: number }) => {
  const newEntryWithMeta = {
    ...data,
    id: entryData.length + 1,
    isoTime: new Date().toISOString()
  };

  setEntryData(prev => [...prev, newEntryWithMeta]);
  setModalOpen(false); // close modal after submit
};

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
        {isModalOpen && (
          <div className="inset-0 flex items-center justify-center bg-gray-100">
          <Modal onClose={() => setModalOpen(false)} onSubmit={handleSubmit}  />
          <div className=""> 
          </div>
        </div>

        )}
        
        <div className="space-y-4">
          {data.map((entry) => (
            <div key={entry.id} className="bg-white rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div  className="pb-3 flex flex-col space-y-1.5 p-6">
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
                <div id="coordinates" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline">
                  <a>{formatCoordinates(entry.lat, entry.lon)}</a>
                </div>
                </div>
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
