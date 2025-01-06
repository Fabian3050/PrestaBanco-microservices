import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Asegúrate de tener estilos personalizados

const Home = () => {
    const [isFaqVisible, setFaqVisible] = useState(false);

    // Funciones para mostrar y ocultar el modal
    const showFaq = () => setFaqVisible(true);
    const hideFaq = () => setFaqVisible(false);

    return (
        <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "30px" }}>
            <header style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 style={{ fontSize: "3rem", color: "#0d47a1", marginBottom: "10px" }}>Presta Banco</h1>
                <p style={{ fontSize: "1.2rem", color: "#555" }}>Tu solución para un crédito rápido y seguro</p>
            </header>

            <main style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <Link to="/simulate/add" style={{ textDecoration: "none" }}>
                        <button
                            style={{
                                backgroundColor: "#1976d2",
                                color: "white",
                                padding: "15px 30px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.2s",
                            }}
                            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                        >
                            Simulación de crédito
                        </button>
                    </Link>
                    <Link to="/register/list" style={{ textDecoration: "none" }}>
                        <button
                            style={{
                                backgroundColor: "#1976d2",
                                color: "white",
                                padding: "15px 30px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.2s",
                            }}
                            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                        >
                            Solicitud de crédito
                        </button>
                    </Link>
                    <Link to="/user/list" style={{ textDecoration: "none" }}>
                        <button
                            style={{
                                backgroundColor: "#1976d2",
                                color: "white",
                                padding: "15px 30px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.2s",
                            }}
                            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                        >
                            Usuarios
                        </button>
                    </Link>
                    <Link to="/executive" style={{ textDecoration: "none" }}>
                        <button
                            style={{
                                backgroundColor: "#1976d2",
                                color: "white",
                                padding: "15px 30px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.2s",
                            }}
                            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                        >
                            Ejecutivo
                        </button>
                    </Link>
                </div>

                <section
                    style={{
                        marginTop: "40px",
                        textAlign: "center",
                        padding: "20px",
                        backgroundColor: "#e3f2fd",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2 style={{ color: "#0d47a1", marginBottom: "10px" }}>Conoce nuestras soluciones</h2>
                    <p style={{ color: "#555", fontSize: "1rem" }}>
                        Presta Banco es tu aliado en el camino hacia tus metas financieras,
                        ofreciéndote una amplia gama de productos y servicios para satisfacer tus
                        necesidades.
                    </p>
                    <img
                        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be"
                        alt="Banner promocional"
                        style={{ width: "100%", borderRadius: "10px", marginTop: "20px" }}
                    />
                </section>

                <section
                    style={{
                        marginTop: "20px",
                        textAlign: "center",
                        padding: "10px",
                        backgroundColor: "#ffffff",
                        borderRadius: "40px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2 style={{ color: "#0d47a1", marginBottom: "20px" }}>Preguntas Frecuentes (FAQ)</h2>
                    <button
                        onClick={showFaq}
                        style={{
                            backgroundColor: "#0d47a1",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            cursor: "pointer",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        Ver Preguntas Frecuentes
                    </button>
                </section>
            </main>

            {/* Modal de Preguntas Frecuentes */}
            {isFaqVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "90%",
                            maxWidth: "600px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                        }}
                    >
                        <h2 style={{ color: "#0d47a1", marginBottom: "20px" }}>Preguntas Frecuentes</h2>
                        <div style={{ textAlign: "left", marginBottom: "20px" }}>
                            <h3 style={{ color: "#555" }}>¿Cómo puedo solicitar un crédito?</h3>
                            <p>Para solicitar un crédito, utiliza la opción "Solicitud de crédito" en el menú principal,
                            allí encontrarás todos los usuarios que estan registrados en el sistema, si no estas registrado, te registras 
                            y luego podras solicitar tu crédito y ademas ver las solicitudes de credito realizadas anteriormente.</p>

                            <h3 style={{ color: "#555" }}>¿Cómo puedo simular un crédito?</h3>
                            <p>Para poder realizar una simulación debes acceder a "simulación de crédito",
                            rellenas los campos solicitados, luego guardar los datos ingresados y obtendrás tu simulación.</p>

                            <h3 style={{ color: "#555" }}>¿Qué tipos de crédito ofrecen?</h3>
                            <p>Ofrecemos créditos para vivienda, remodelación, propiedades comerciales, y más.</p>

                            <h3 style={{ color: "#555" }}>¿Cuánto tiempo tarda en aprobarse un crédito?</h3>
                            <p>El tiempo de aprobación es rápido y eficiente.</p>
                        </div>
                        <button
                            onClick={hideFaq}
                            style={{
                                backgroundColor: "#1976d2",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                cursor: "pointer",
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
