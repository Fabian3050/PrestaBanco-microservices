import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Para agregar estilos

const Home = () => {
    return (
        <div className="home-container">
            <h1>Presta Banco</h1>
            <div className="button-container">
                <Link to="/simulate/add">
                    <button className="menu-button">Simulación de crédito</button>
                </Link>
                <Link to="/register/list">
                    <button className="menu-button">Solicitud de crédito</button>
                </Link>
                <Link to="/user/list">
                    <button className="menu-button">Usuarios</button>
                </Link>
                <Link to="/executive">
                    <button className="menu-button">Ejecutivo</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;