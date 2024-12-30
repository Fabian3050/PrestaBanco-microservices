import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import creditService from "../services/credit.service"; // Importa el servicio que realiza la llamada al backend

const CreditRequestForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Captura el ID del usuario desde los parámetros de la URL

  // Estados para almacenar los valores del formulario
  const [creditType, setCreditType] = useState("");
  const [maxTerm, setMaxTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [totalPriceHome, setTotalPriceHome] = useState("");

  // Maneja la solicitud de crédito
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Datos que se envían al backend
    const creditData = {
      creditType,
      maxTerm,
      interestRate,
      requestedAmount,
      totalPriceHome
    };

    try {
      // Realiza la solicitud de creación de crédito usando el servicio y captura el ID devuelto
      const createdId = await creditService.create(userId, creditData); // Se asume que `create` devuelve solo el ID
      if (!createdId) {
        alert("Error al crear el crédito.");
        return;
      } else {
        console.log("Crédito creado exitosamente con ID:", createdId);
        alert("Solicitud de crédito creada exitosamente.");
        // Redirige a la interfaz de subida de archivos, pasando el ID del crédito
        navigate(`/upload-documents/${createdId}/${creditType}`);
      }
    } catch (error) {
      console.error("Error al solicitar el crédito:", error);
      alert("Hubo un error al solicitar el crédito.");
    }
  };

  const handleBackToRegisterList = () => {
    navigate('/register/list');
  };

  return (
    <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Solicitud de Crédito</h1>
        <p>Por favor, complete el formulario para solicitar su crédito.</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "20px" }}>
        {/* Formulario */}
        <form
          style={{
            flex: 1,
            maxWidth: "500px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="loanAmount" className="form-label">Monto del Préstamo:</label>
            <input
              type="number"
              id="loanAmount"
              className="form-control"
              value={requestedAmount}
              onChange={(e) => setRequestedAmount(e.target.value)}
              required
              style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="interestRate" className="form-label">Tasa de Interés Anual(%):</label>
            <input
              type="number"
              id="interestRate"
              className="form-control"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
              style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="paymentPeriod" className="form-label">Período de Pago (meses):</label>
            <input
              type="number"
              id="paymentPeriod"
              className="form-control"
              value={maxTerm}
              onChange={(e) => setMaxTerm(e.target.value)}
              required
              style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="totalPriceHome" className="form-label">Precio Total de la Vivienda:</label>
            <input
              type="number"
              id="totalPriceHome"
              className="form-control"
              value={totalPriceHome}
              onChange={(e) => setTotalPriceHome(e.target.value)}
              required
              style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="creditType" className="form-label">Tipo de Crédito:</label>
            <select
              id="creditType"
              className="form-select"
              value={creditType}
              onChange={(e) => setCreditType(e.target.value)}
              required
              style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              <option value="">Seleccionar</option>
              <option value="firstHome">Primera Vivienda</option>
              <option value="secondHome">Segunda Vivienda</option>
              <option value="commercialProperty">Propiedad Comercial</option>
              <option value="remodeling">Remodelación</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100" style={{ marginBottom: "10px" }}>
            Crear solicitud
          </button>
          <button type="button" onClick={handleBackToRegisterList} className="btn btn-secondary w-100">
            Volver al registro de usuarios
          </button>
        </form>

        {/* Sección visual llamativa */}
        <div
          style={{
            flex: 1,
            maxWidth: "400px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#e3f2fd",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#0d47a1", marginBottom: "20px" }}>¿Por qué solicitar un crédito?</h2>
          <p>Con nuestro sistema, puedes obtener financiamiento para tus necesidades de vivienda, remodelación, y más.</p>
          <p>Disfruta de tasas competitivas y períodos de pago flexibles.</p>
          <img
            src="https://unsplash.com/es/fotos/una-casa-con-una-puerta-de-entrada-azul-y-una-puerta-de-entrada-marron-xaqsFfoEq3o"
            alt="Ilustración de crédito"
            style={{ marginTop: "20px", borderRadius: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditRequestForm;
