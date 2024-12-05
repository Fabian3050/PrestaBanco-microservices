import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import creditService from "../services/credit.service"; // Importa el servicio que realiza la llamada al backend

const CreditRequestForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Captura el ID del usuario desde los parámetros de la URL

  // Estados para almacenar los valores del formulario
  const[creditType, setCreditType] = useState("");
  const[maxTerm, setMaxTerm] = useState("");
  const[interestRate, setInterestRate] = useState("");
  const[requestedAmount, setRequestedAmount] = useState("");
  const[approvedAmount, setApprovedAmount] = useState("");
  const[status, setStatus] = useState("");
  const[applicationDate, setApplicationDate] = useState("");
  const[approvedRejectionDate, setApprovedRejectionDate] = useState("");
  const[totalPriceHome, setTotalPriceHome] = useState("");

  const[creditResult, setCreditResult] = useState(null);

  // Maneja la solicitud de crédito
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Datos que se envían al backend
    const creditData = {
      creditType,
      maxTerm,
      interestRate,
      requestedAmount,
      approvedAmount,
      status,
      applicationDate,
      approvedRejectionDate
    };

    try {
      // Realiza la solicitud de creación de crédito usando el servicio y captura el ID devuelto
      const createdId = await creditService.create(userId, creditData); // Se asume que `create` devuelve solo el ID
        if (!createdId){
          alert("Error al crear el crédito.");
          return;
        }
        else{
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
    <div className="container mt-5">
      <div className="row">
        {/* Columna para el formulario */}
        <div className="col-md-6">
          <h2>Solicitud de Crédito</h2>
          <form className="p-4 border rounded shadow-sm bg-light">

            <div className="mb-3">
              <label htmlFor="loanAmount" className="form-label">Monto del Préstamo:</label>
              <input
                type="number"
                id="loanAmount"
                className="form-control"
                value={requestedAmount}
                onChange={(e) => setRequestedAmount(e.target.value)}
                required
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
              <label htmlFor="totalPriceHome" className="form-label">Precio Total de la Vivienda:</label>
              <input
                type="number"
                id="totalPriceHome"
                className="form-control"
                value={totalPriceHome}
                onChange={(e) => setTotalPriceHome(e.target.value)}
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
                <option value="firstHome">Primera Vivienda</option>
                <option value="secondHome">Segunda Vivienda</option>
                <option value="commercialProperty">Propiedad Comercial</option>
                <option value="remodeling">Remodelación</option>
              </select>
            </div>

            {/* Botones de acción */}
            <button onClick={handleSubmit} className="btn btn-primary w-100 mb-3">Crear solicitud</button>
            <button onClick={handleBackToRegisterList} className="btn btn-primary w-100 mb-3">Volver al registro de usuarios</button>
          </form>
        </div>

        {/* Columna para los resultados */}
        <div className="col-md-6">
          <h2>Resultados del Credito</h2>
          {creditResult ? (
            <div className="p-4 border rounded shadow-sm bg-light">
              <p><strong>Estado de solicitud:</strong> {creditResult.status}</p>
              <p><strong>Monto aprovado:</strong> {creditResult.approvedAmount}</p>
            </div>
          ) : (
            <div className="p-4 border rounded shadow-sm bg-light">
              <p>Ingresa los Datos y solicita el credito para visualizar los resultados de este.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditRequestForm;
