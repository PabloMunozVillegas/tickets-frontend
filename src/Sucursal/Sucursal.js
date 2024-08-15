import React, { useState } from 'react';
import { createSucursal, createArea } from '../Functions/ApisPost';

export default function Sucursal() {
    const [sucursal, setSucursal] = useState({ nombre: '' });
    const [areas, setAreas] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSucursal((prevSucursal) => ({
            ...prevSucursal,
            [name]: value
        }));
    };

    const handleSucursalSubmit = async (e) => {
        e.preventDefault();
        const sucursalData = { nombre: sucursal.nombre };
        try {
            const sucursalResponse = await createSucursal(sucursalData);
            setSucursal({ nombre: '' });
            console.log("Sucursal creada:", sucursalResponse);
        } catch (error) {
            console.error("Error creating sucursal:", error);
        }
    };

    const handleAreaSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const areaData = { nombre: formData.get('nombre') };
        try {
            const areaResponse = await createArea(areaData);
            setAreas((prevAreas) => [...prevAreas, areaResponse]);
            e.target.reset();
            console.log("Area creada:", areaResponse);
        } catch (error) {
            console.error("Error creating area:", error);
        }
    };

    return (
        <div className="container">
            <h1>Crear Sucursal</h1>
            <form onSubmit={handleSucursalSubmit}>
                <div className="form-group">
                    <label htmlFor="nombreSucursal">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombreSucursal"
                        name="nombre"
                        value={sucursal.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Sucursal</button>
            </form>

            <h2>Crear Area</h2>
            <form onSubmit={handleAreaSubmit}>
                <div className="form-group">
                    <label htmlFor="nombreArea">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombreArea"
                        name="nombre"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Area</button>
            </form>

            <h3>Áreas creadas:</h3>
            <ul>
                {areas.map((area, index) => (
                    <li key={index}>{area.nombre}</li>
                ))}
            </ul>
        </div>
    );
}
