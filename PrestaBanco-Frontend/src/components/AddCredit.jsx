import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import creditService from "../services/credit.service"; // Importa el servicio que realiza la llamada al backend
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';



const CreditRequestForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Captura el ID del usuario desde los parámetros de la URL

  // Estados para almacenar los valores del formulario
  const [creditType, setCreditType] = useState("");
  const [maxTerm, setMaxTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [totalPriceHome, setTotalPriceHome] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showHelpModalPeriod, setShowHelpModalPeriod] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    const missingFields = [];
    if (!requestedAmount || requestedAmount <= 0) missingFields.push("Monto del Préstamo (debe ser un valor positivo)");
    if (!interestRate || interestRate <= 0) missingFields.push("Tasa de Interés Anual (debe ser un valor positivo)");
    if (!maxTerm || maxTerm <= 0) missingFields.push("Período de Pago (debe ser un valor positivo)");
    if (!totalPriceHome || totalPriceHome <= 0) missingFields.push("Precio Total de la Vivienda (debe ser un valor positivo)");
    if (!creditType) missingFields.push("Tipo de Crédito");

    if (missingFields.length > 0) {
      alert(`Por favor, complete los siguientes campos: \n${missingFields.join("\n")}`);
      return;
    }

    switch (creditType) {
      case "firstHome":
        if (maxTerm > 360) errors.push("El período de pago no puede superar los 360 meses para Primera Vivienda.");
        if (interestRate < 3.5 || interestRate > 5) errors.push("La tasa de interés debe estar entre 3.5% y 5% para Primera Vivienda.");
        break;
      case "secondHome":
        if (maxTerm > 240) errors.push("El período de pago no puede superar los 240 meses para Segunda Vivienda.");
        if (interestRate < 4 || interestRate > 6) errors.push("La tasa de interés debe estar entre 4% y 6% para Segunda Vivienda.");
        break;
      case "commercialProperty":
        if (maxTerm > 300) errors.push("El período de pago no puede superar los 300 meses para Propiedades Comerciales.");
        if (interestRate < 5 || interestRate > 7) errors.push("La tasa de interés debe estar entre 5% y 7% para Propiedades Comerciales.");
        break;
      case "remodeling":
        if (maxTerm > 180) errors.push("El período de pago no puede superar los 180 meses para Remodelación.");
        if (interestRate < 4.5 || interestRate > 6) errors.push("La tasa de interés debe estar entre 4.5% y 6% para Remodelación.");
        break;
      default:
        errors.push("Por favor selecciona un tipo de crédito válido.");
    }

    if (errors.length > 0) {
      alert(`Consideraciones para la solicitud de crédito:\n${errors.join("\n")}`);
      return;
    }

    const creditData = {
      creditType,
      maxTerm,
      interestRate,
      requestedAmount,
      totalPriceHome
    };

    try {
      const createdId = await creditService.create(userId, creditData); 
      if (!createdId) {
        alert("Error al crear el crédito.");
        return;
      } else {
        console.log("Crédito creado exitosamente con ID:", createdId);
        alert("Solicitud de crédito creada exitosamente.");
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
      <div style={{ textAlign: "center",marginBottom: "20px" }}>
        <h1 style={{ fontSize: "3rem", color: "#0d47a1", marginBottom: "10px" }}>Solicitud de Crédito</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>Complete los campos solicitados para poder realizar la solicitud de crédito,
          si tiene dudas del proceso, no dude en consultar en el apartado preguntas frecuentes en la pagina principal de Presta Banco.</p>
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
            <label htmlFor="loanAmount" className="form-label">Monto del Préstamo (Ej: "100000000", sin puntos ni coma):</label>
            <input
              type="number"
              id="loanAmount"
              className="form-control"
              value={requestedAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ""); // Remover caracteres no numéricos
                setRequestedAmount(value);
              }}
              required
              style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="interestRate" className="form-label">Tasa de Interés Anual(%):
            <Button
                  variant="link"
                  style={{ textDecoration: "none", color: "#0d47a1" }}
                  onClick={() => setShowHelpModal(true)}
                >
                  <FontAwesomeIcon icon={faCircleQuestion} />
            </Button>
            </label>
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
            <label htmlFor="paymentPeriod" className="form-label">Período de Pago (meses):
            <Button
                  variant="link"
                  style={{ textDecoration: "none", color: "#0d47a1" }}
                  onClick={() => setShowHelpModalPeriod(true)}
                >
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </Button>
            </label>
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
            <label htmlFor="totalPriceHome" className="form-label">Precio Total de la Vivienda (Ej: "100000000", sin puntos ni coma):</label>
            <input
              type="number"
              id="totalPriceHome"
              className="form-control"
              value={totalPriceHome}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ""); // Remover caracteres no numéricos
                setTotalPriceHome(value);
              }}
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
          <h2 style={{ color: "#0d47a1", marginBottom: "20px" }}>¿Por qué solicitar un crédito inmobiliario?</h2>
          <p>Con nuestro sistema, puedes obtener financiamiento para tus necesidades de vivienda, remodelación, y más.</p>
          <p>Disfruta de tasas competitivas y períodos de pago flexibles.</p>
          <img
            src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Cambiado a una imagen de oficina hogareña con un computador
            alt="Oficina hogareña con computador"
            style={{ marginTop: "20px", borderRadius: "10px", width: "100%", height: "auto" }}
          />

        </div>
      </div>
            {/* Ventana emergente de ayuda */}
            <Modal show={showHelpModal} onHide={() => setShowHelpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ayuda - Tasa de Interés</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          - Si selecciona "Primera Vivienda" como tipo de crédito, el rango de tasa de interés debe estar entre un 3.5% y un 5%. <br />
          - Si selecciona "Segunda Vivienda" como tipo de crédito, el rango de tasa de interés debe estar entre un 4% y un 6%. <br />
          - Si selecciona "Propiedad Comercial" como tipo de crédito, el rango de tasa de interés debe estar entre un 5% y un 7%. <br />
          - Si selecciona "Remodelación" como tipo de crédito, el rango de tasa de interés debe estar entre un 4.5% y un 6%. <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowHelpModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showHelpModalPeriod} onHide={() => setShowHelpModalPeriod(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ayuda - Periodo de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          - Si selecciona "Primera Vivienda" como tipo de crédito, el periodo de pago no puede superar los 360 meses. <br />
          - Si selecciona "Segunda Vivienda" como tipo de crédito, el periodo de pago no puede superar los 240 meses. <br />
          - Si selecciona "Propiedad Comercial" como tipo de crédito, el periodo de pago no puede superar los 300 meses. <br />
          - Si selecciona "Remodelación" como tipo de crédito, el periodo de pago no puede superar los 180 meses. <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowHelpModalPeriod(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreditRequestForm;
