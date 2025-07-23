import { useState } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; description: string; lat?: number; lon?: number }) => void;
};



export function Modal({ onClose, onSubmit}: ModalProps) {
    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [lat,setLat] = useState("");
    const [lon,setLon] = useState("");
    
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      lat: lat ? parseFloat(lat) : undefined,
      lon: lon ? parseFloat(lon) : undefined
    });
    setTitle('');
    setDescription('');
    setLat('');
    setLon('');
    onClose();
  };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 ">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-lg text-gray-600 font-semibold mb-4">Add a New Entry</h2>
                <button
                   onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-lg font-bold"
                >X</button>
                <form className="space-y-4" onClick={()=> handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Latitude (optional)</label>
                            <input
                                type="number"
                                className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-600"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Longitude (optional)</label>
                            <input
                                type="number"
                                className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-600"
                            />
                        </div>
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
