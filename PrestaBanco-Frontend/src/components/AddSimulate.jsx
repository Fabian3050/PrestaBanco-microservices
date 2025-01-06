import { useState, useEffect } from "react";
import simulateService from "../services/simulate.service"; // Importa el servicio
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';


const CreditSimulation = () => {
  // Estados para almacenar los valores de entrada del usuario
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState("");
  const [totalPriceHome, setTotalPriceHome] = useState("");
  const [monthlyClientIncome, setMonthlyClientIncome] = useState("");
  const [creditType, setCreditType] = useState("");
  const [simulationId, setSimulationId] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false); // Estado para controlar la ventana emergente
  const [showHelpModalPeriod, setShowHelpModalPeriod] = useState(false); // Estado para controlar la ventana emergente

  // Estado para almacenar los resultados de la simulación
  const [simulationResult, setSimulationResult] = useState(null);
  const [maximumFinancingAmount, setMaximumFinancingAmount] = useState(null);

  // Función para calcular el monto máximo de financiamiento
  useEffect(() => {
    if (totalPriceHome > 0 && creditType) {
      let amount = 0;
      switch (creditType) {
        case "firstHome":
          amount = totalPriceHome * 0.8;
          break;
        case "secondHome":
          amount = totalPriceHome * 0.7;
          break;
        case "commercialProperty":
          amount = totalPriceHome * 0.6;
          break;
        case "remodeling":
          amount = totalPriceHome * 0.5;
          break;
        default:
          amount = 0;
      }
      setMaximumFinancingAmount(amount);
    } else {
      setMaximumFinancingAmount(null);
    }
  }, [totalPriceHome, creditType]);

  // Validación de campos positivos y completos
  const validateFields = () => {
    const errors = [];

    if (!loanAmount || loanAmount <= 0) errors.push("El monto del préstamo debe ser ingresado y que no sea negativo");
    if (!interestRate || interestRate <= 0) errors.push("La tasa de interés debe ser ingresado y que no sea negativo.");
    if (!paymentPeriod || paymentPeriod <= 0) errors.push("El período de pago debe ser ingresado y que no sea negativo.");
    if (!totalPriceHome || totalPriceHome <= 0) errors.push("El precio total de la vivienda debe ser ingresado y que no sea negativo.");
    if (!monthlyClientIncome || monthlyClientIncome <= 0) errors.push("El ingreso mensual debe ser ingresado y que no sea negativo.");
    if (!creditType) errors.push("Debe seleccionar un tipo de crédito.");

    if (errors.length > 0) {
      alert("Consideraciones para la simulacion del crédito:\n" + errors.join("\n"));
      return false;
    }
    return true;
  };

  // Función para guardar la simulación en la base de datos
  const handleSaveSimulation = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    // Validar restricciones según el tipo de crédito
    const errors = [];

    switch (creditType) {
      case "firstHome":
        if (paymentPeriod > 360) errors.push("El período de pago no puede superar los 360 meses para Primera Vivienda.");
        if (interestRate < 3.5 || interestRate > 5) errors.push("La tasa de interés debe estar entre 3.5% y 5% para Primera Vivienda.");
        break;
      case "secondHome":
        if (paymentPeriod > 240) errors.push("El período de pago no puede superar los 240 meses para Segunda Vivienda.");
        if (interestRate < 4 || interestRate > 6) errors.push("La tasa de interés debe estar entre 4% y 6% para Segunda Vivienda.");
        break;
      case "commercialProperty":
        if (paymentPeriod > 300) errors.push("El período de pago no puede superar los 300 meses para Propiedades Comerciales.");
        if (interestRate < 5 || interestRate > 7) errors.push("La tasa de interés debe estar entre 5% y 7% para Propiedades Comerciales.");
        break;
      case "remodeling":
        if (paymentPeriod > 180) errors.push("El período de pago no puede superar los 180 meses para Remodelación.");
        if (interestRate < 4.5 || interestRate > 6) errors.push("La tasa de interés debe estar entre 4.5% y 6% para Remodelación.");
        break;
      default:
        errors.push("Por favor selecciona un tipo de crédito válido.");
    }

    if (errors.length > 0) {
      alert(`Errores encontrados:\n${errors.join("\n")}`);
      return;
    }

    // Datos a enviar en la simulación
    const simulationData = {
      m: 0,
      p: loanAmount,
      r: interestRate,
      n: paymentPeriod,
      totalPriceHome,
      monthlyClientIncome,
      creditType,
    };

    try {
      const response = await simulateService.create(simulationData);
      const createdId = response.data.id;
      setSimulationId(createdId);
      alert("Simulación guardada correctamente.");
    } catch (error) {
      console.error("Error al guardar la simulación:", error);
      alert("Hubo un error al guardar la simulación.");
    }
  };

  // Función para realizar la simulación y obtener el resultado
  const handlePerformSimulation = async (e) => {
    e.preventDefault();

    if (!simulationId) {
      alert("Primero debes guardar una simulación.");
      return;
    }

    try {
      const response = await simulateService.simulate(simulationId);
      setSimulationResult(response.data);
    } catch (error) {
      console.error("Error realizando la simulación:", error);
      alert("Hubo un error al realizar la simulación.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "3rem", color: "#0d47a1", marginBottom: "10px" }}>Simulación de Crédito</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>Para realizar la simulación, rellena los campos requeridos, guarda los datos ingresados
          y luego realiza la simulación para obtener los resultados.
        </p>

      </header>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Columna para el formulario */}
        <div style={{ flex: 1, backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <form>
            <div className="mb-3">
              <label htmlFor="loanAmount" className="form-label">Monto del Préstamo (Ej: "100000000", sin puntos ni coma):</label>
              <input
                type="text"
                id="loanAmount"
                className="form-control"
                value={loanAmount}
                style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Remover caracteres no numéricos
                  setLoanAmount(value);
                }}
                required
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
                style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                onChange={(e) => setInterestRate(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="paymentPeriod" className="form-label">Período de Pago (meses):</label>
              <Button
                  variant="link"
                  style={{ textDecoration: "none", color: "#0d47a1" }}
                  onClick={() => setShowHelpModalPeriod(true)}
                >
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </Button>
              <input
                type="number"
                id="paymentPeriod"
                className="form-control"
                value={paymentPeriod}
                style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                onChange={(e) => setPaymentPeriod(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="totalPriceHome" className="form-label">Precio Total de la Vivienda (Ej: "100000000", sin puntos ni coma):</label>
              <input
                type="number"
                id="totalPriceHome"
                className="form-control"
                value={totalPriceHome}
                style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Remover caracteres no numéricos
                  setTotalPriceHome(value);
                }}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="monthlyClientIncome" className="form-label">Ingreso Mensual del Cliente:</label>
              <input
                type="number"
                id="monthlyClientIncome"
                className="form-control"
                value={monthlyClientIncome}
                style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                onChange={(e) => setMonthlyClientIncome(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="creditType" className="form-label">Tipo de Crédito:</label>
              <select
                id="creditType"
                className="form-select"
                value={creditType}
                style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
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
            <button onClick={handleSaveSimulation} className="btn btn-primary w-100 mb-3" style={{ borderRadius: "8px", height: "40px" }}>Guardar Datos</button>
            <button onClick={handlePerformSimulation} className="btn btn-success  w-100" style={{ borderRadius: "8px", height: "40px" }}>Realizar Simulación</button>
          </form>
        </div>

        {/* Columna para los resultados */}
        <div style={{ flex: 1, backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#0d47a1", marginBottom: "10px" }}>Resultados de la Simulación</h2>
          {simulationResult ? (
            <div>
              <p><strong>Tipo de Prestamo:</strong> {simulationResult.creditType}</p>
              <p><strong>Pago Mensual:</strong> {`$${simulationResult.m.toLocaleString("es-CL")}`}</p>
              <p><strong>Valor de la Vivienda:</strong> {`$${simulationResult.totalPriceHome.toLocaleString("es-CL")}`}</p>
              <p><strong>Monto Máximo de Financiamiento:</strong> {maximumFinancingAmount ? `$${maximumFinancingAmount.toLocaleString("es-CL")}` : "calculando..."}</p>
              <p><strong>Período de Pago:</strong> {simulationResult.n}</p>
              <p><strong>Capacidad de Pago:</strong> {simulationResult.message}</p>
            </div>
          ) : (
            <p>Introduce los datos y realiza la simulación para ver los resultados.</p>
          )}
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className="btn btn-secondary w-100 mt-3" style={{ borderRadius: "8px", height: "40px" }}>Volver al Menú Principal</button>
          </Link>
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

export default CreditSimulation;
