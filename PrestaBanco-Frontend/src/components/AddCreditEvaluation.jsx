import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import creditEvaluationService from "../services/creditEvaluation.service";
import { Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const CreditEvaluation = () => {
  const { creditId } = useParams();
  const [evaluation, setEvaluation] = useState({
    "Relación Cuota-Ingreso": false,
    "Historial de Crédito": false,
    "Antigüedad Laboral": false,
    "Relación Deuda-Ingreso": false,
    "Monto Máximo de Financiamiento": false,
    "Edad del Solicitante": false,
    "Capacidad de Ahorro": false,
  });

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await creditEvaluationService.getBycreditId(creditId);
        setEvaluation(response.data);
      } catch (error) {
        console.error("Error al obtener la evaluación de crédito:", error);
      }
    };

    fetchEvaluation();
  }, [creditId]);

  const handleSwitchChange = async (field) => {
    const updatedEvaluation = { ...evaluation, [field]: !evaluation[field] };
    setEvaluation(updatedEvaluation);

    try {
      await creditEvaluationService.update(updatedEvaluation);
    } catch (error) {
      console.error("Error al actualizar la evaluación de crédito:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#0d47a1" }}>Evaluación de Crédito</h1>
      </header>

      <TableContainer
        component={Paper}
        style={{ borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", padding: "20px" }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#e3f2fd" }}>
              <TableCell align="left" style={{ fontWeight: "bold" }}>Criterio</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(evaluation).map((field) => (
              <TableRow key={field} style={{ backgroundColor: "#f9f9f9" }}>
                <TableCell align="left" style={{ padding: "10px 20px" }}>{field}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={evaluation[field]}
                    onChange={() => handleSwitchChange(field)}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/executive" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ borderRadius: "8px", padding: "10px 20px" }}
            >
              Volver a la lista de créditos
            </Button>
          </Link>
        </div>
      </TableContainer>
    </div>
  );
};

export default CreditEvaluation;
