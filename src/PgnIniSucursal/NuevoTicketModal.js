import React, { useState, useEffect } from 'react';
import FotoCapture from '../FotoCapture';
import { getAreas } from '../Functions/ApisGet';
import { createTicket } from '../Functions/ApisPost';

const NuevoTicketModal = ({ onClose }) => {
    const [photos, setPhotos] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const areaResponse = await getAreas();
                setAreas(areaResponse);
            } catch (error) {
                console.error("Error fetching areas:", error);
            }
        };
        fetchAreas();
    }, []);

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!selectedArea) {
            console.error("Area must be selected.");
            return;
        }
    
        const formData = new FormData();
        formData.append('descripcion', event.target.descripcion.value);
        formData.append('prioridad', event.target.prioridad.value);
        formData.append('area', selectedArea);
    
        photos.forEach((file) => {
            formData.append('files', file);
        });
    
        for (let [key, value] of formData.entries()) {
            console.log(`Archivos Recibidos ${key}:`, value);
        }
    
        try {
            await createTicket(formData);
            console.log("Ticket creado exitosamente.");
            onClose();
        } catch (error) {
            console.error("Error al crear el ticket:", error);
        }
    };


    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleBackdropClick}
        >
            <div className="relative bg-white p-6 rounded-lg w-full max-w-4xl mx-4 overflow-y-auto max-h-screen lg:flex lg:space-x-4">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-700">
                    ✖
                </button>
                <div className="lg:w-1/2">
                    <h2 className="text-center text-lg font-bold mb-4 lg:text-left">Ticket Information</h2>
                    <div className="w-full h-96 border rounded-lg overflow-hidden">
                        <FotoCapture photos={photos} setPhotos={setPhotos} />
                    </div>
                </div>
                <form className="space-y-4 text-sm lg:w-1/2 mt-6 lg:mt-0" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Área:</label>
                        <select
                            name="area"
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                            className="w-full px-2 py-1 border rounded"
                        >
                            <option value="">Select Area</option>
                            {areas.map((area) => (
                                <option key={area._id} value={area._id}>{area.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Descripción:</label>
                        <textarea
                            name="descripcion"
                            rows="4"
                            className="w-full px-2 py-1 border rounded"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Prioridad:</label>
                        <select name="prioridad" className="w-full px-2 py-1 border rounded">
                            <option value="Urgente">Urgente</option>
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                    >
                        Crear Ticket
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NuevoTicketModal;
