import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import creditService from "../services/credit.service"; // Importa el servicio que realiza la llamada al backend

const CreditRequestForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Captura el ID del usuario desde los parámetros de la URL

  // Estados para almacenar los valores del formulario
  const [creditAmount, setCreditAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [maxTerm, setMaxTerm] = useState("");
  const [creditType, setCreditType] = useState("");

  // Maneja la solicitud de crédito
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Datos que se envían al backend
    const creditData = {
      requestedAmount: creditAmount,
      approvedAmount: 0, // Asigna un valor predeterminado o ajusta según tus necesidades
      interestRate,
      maxTerm,
      creditType,
      totalCreditCost: 0, // Asigna un valor predeterminado o ajusta según tus necesidades
    };

    try {
      // Realiza la solicitud de creación de crédito usando el servicio y captura el ID devuelto
      const createdId = await creditService.create(userId, creditData); // Se asume que `create` devuelve solo el ID
        console.log("Crédito creado exitosamente con ID:", createdId);
      alert("Solicitud de crédito creada exitosamente.");

      // Redirige a la interfaz de subida de archivos, pasando el ID del crédito
      navigate(`/upload-documents/${createdId}/${creditType}`);
    } catch (error) {
      console.error("Error al solicitar el crédito:", error);
      alert("Hubo un error al solicitar el crédito.");
    }
  };

  const handleBackToRegisterList = () => {
    navigate('/register/list');
  };

  return (
    <div className="container mt-5">
      <h2>Solicitud de Crédito</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="creditAmount" className="form-label">Monto del Crédito:</label>
          <input
            type="number"
            id="creditAmount"
            className="form-control"
            value={creditAmount}
            onChange={(e) => setCreditAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="interestRate" className="form-label">Tasa de Interés Anual (%):</label>
          <input
            type="number"
            id="interestRate"
            className="form-control"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
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
          >
            <option value="">Seleccionar</option>
            <option value="Primera Vivienda">Primera Vivienda</option>
            <option value="Segunda Vivienda">Segunda Vivienda</option>
            <option value="Propiedades Comerciales">Propiedades Comerciales</option>
            <option value="Remodelación">Remodelación</option>
          </select>

        </div>

        <button type="submit" className="btn btn-primary w-100">Solicitar Crédito</button>
        <button type="button" className="btn btn-primary w-100 mt-2" onClick={handleBackToRegisterList}>Volver al Registro</button>
      </form>
    </div>
    
  );
};

export default CreditRequestForm;
