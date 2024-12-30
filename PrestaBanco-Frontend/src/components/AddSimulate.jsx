import { useState } from "react";
import simulateService from "../services/simulate.service"; // Importa el servicio
import { Link } from "react-router-dom";

const CreditSimulation = () => {
  // Estados para almacenar los valores de entrada del usuario
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState("");
  const [totalPriceHome, setTotalPriceHome] = useState("");
  const [monthlyClientIncome, setMonthlyClientIncome] = useState("");
  const [creditType, setCreditType] = useState("");
  const [simulationId, setSimulationId] = useState("");

  // Estado para almacenar los resultados de la simulación
  const [simulationResult, setSimulationResult] = useState(null);

  // Función para guardar la simulación en la base de datos
  const handleSaveSimulation = async (e) => {
    e.preventDefault();

    // Datos a enviar en la simulación
    const simulationData = {
      m: 0,
      p: loanAmount,         // loanAmount renombrado a "p"
      r: interestRate,       // interestRate renombrado a "r"
      n: paymentPeriod,      // paymentPeriod renombrado a "n"
      totalPriceHome,
      monthlyClientIncome,
      creditType
    };

    try {
      // Guarda la simulación utilizando el servicio
      const response = await simulateService.create(simulationData);
      const createdId = response.data.id; // Asegúrate de que el servicio devuelva el ID de la simulación creada
      setSimulationId(createdId); // Guarda el ID en el estado
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
      // Realiza la simulación utilizando solo el ID de la simulación guardada
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
        <h1 style={{ fontSize: "2rem", color: "#0d47a1", marginBottom: "10px" }}>Simulación de Crédito</h1>
      </header>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Columna para el formulario */}
        <div style={{ flex: 1, backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <form>
            <div className="mb-3">
              <label htmlFor="loanAmount" className="form-label">Monto del Préstamo:</label>
              <input
                type="number"
                id="loanAmount"
                className="form-control"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
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
                value={paymentPeriod}
                onChange={(e) => setPaymentPeriod(e.target.value)}
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
              <label htmlFor="monthlyClientIncome" className="form-label">Ingreso Mensual del Cliente:</label>
              <input
                type="number"
                id="monthlyClientIncome"
                className="form-control"
                value={monthlyClientIncome}
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
            <button onClick={handlePerformSimulation} className="btn btn-primary w-100" style={{ borderRadius: "8px", height: "40px" }}>Realizar Simulación</button>
          </form>
        </div>

        {/* Columna para los resultados */}
        <div style={{ flex: 1, backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#0d47a1", marginBottom: "10px" }}>Resultados de la Simulación</h2>
          {simulationResult ? (
            <div>
              <p><strong>Pago Mensual:</strong> {simulationResult.m}</p>
              <p><strong>Mensaje:</strong> {simulationResult.message}</p>
            </div>
          ) : (
            <p>Introduce los datos y realiza la simulación para ver los resultados.</p>
          )}
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary w-100 mt-3" style={{ borderRadius: "8px", height: "40px" }}>Volver al Menú Principal</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreditSimulation;
