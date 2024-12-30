import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Asegúrate de tener estilos personalizados

const Home = () => {
    return (
        <div style={{ backgroundColor: '#f0f8ff', minHeight: '100vh', padding: '30px' }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '3rem', color: '#0d47a1', marginBottom: '10px' }}>Presta Banco</h1>
                <p style={{ fontSize: '1.2rem', color: '#555' }}>Tu solución para un crédito rápido y seguro</p>
            </header>

            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        flexWrap: 'wrap',
                    }}
                >
                    <Link to="/simulate/add" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                padding: '15px 30px',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            Simulación de crédito
                        </button>
                    </Link>
                    <Link to="/register/list" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                padding: '15px 30px',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            Solicitud de crédito
                        </button>
                    </Link>
                    <Link to="/user/list" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                padding: '15px 30px',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            Usuarios
                        </button>
                    </Link>
                    <Link to="/executive" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                padding: '15px 30px',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            Ejecutivo
                        </button>
                    </Link>
                </div>

                <section
                    style={{
                        marginTop: '40px',
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: '#e3f2fd',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h2 style={{ color: '#0d47a1', marginBottom: '10px' }}>Conoce nuestras soluciones</h2>
                    <p style={{ color: '#555', fontSize: '1rem' }}>
                        Somos tu aliado en el camino hacia tus metas financieras.
                    </p>
                    <img
                        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be"
                        alt="Banner promocional"
                        style={{ width: '100%', borderRadius: '10px', marginTop: '20px' }}
                    />
                </section>
            </main>
        </div>
    );
};

export default Home;
