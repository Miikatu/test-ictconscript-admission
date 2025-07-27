import { useState } from "react";
import { MapView } from "../components/MapView"

type ModalProps = {
    onClose: () => void;
    onSubmit: (data: { title: string; body: string; lat?: number; lon?: number }) => void;
};

export function Modal({ onClose, onSubmit }: ModalProps) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [lat, setLat] = useState<string>("");
    const [lon, setLon] = useState<string>("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            body,
            lat: lat ? parseFloat(lat) : undefined,
            lon: lon ? parseFloat(lon) : undefined
        });
        setTitle('');
        setBody('');
        setLat('');
        setLon('');
        onClose();
    };

    const handleMapClick=(lat? :number,lng?: number)=>{
        if (lat !== undefined) setLat(lat.toString());
        if (lng !== undefined) setLon(lng.toString());
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 ">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-lg text-gray-600 font-semibold mb-4">Add a New Entry</h2>
                <button
                    onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-lg font-bold"
                >X</button>
                <form className="space-y-4" onSubmit={handleSubmit} >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Body</label>
                        <textarea
                            className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Latitude (optional)</label>
                            <input
                                type="text"
                                inputMode="decimal"
                                pattern="^-?\d+(\.\d+)?$"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-600"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Longitude (optional)</label>
                            <input
                                type="text"
                                inputMode="decimal"
                                pattern="^-?\d+(\.\d+)?$"
                                value={lon}
                                onChange={(e) => setLon(e.target.value)}
                                className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-600"
                            />
                        </div>
                    </div>
                     <div className="rounded-lg border-2  border-green-800 shadow-md overflow-hidden">
                            <MapView onMapClick={handleMapClick}/>
                        </div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition"
                    >
                        Save Entry
                    </button>
                </form>
            </div>
        </div>
    );
}
