import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import creditEvaluationService from "../services/creditEvaluation.service";
import { Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const CreditEvaluation = () => {
  const { creditId } = useParams();
  const [evaluation, setEvaluation] = useState({
     ratioFeeIncome : false,
    creditHistory : false,
    jobSeniority : false,
    ratioDebtIncome : false,
    maximumFinancingAmount  : false,
    applicantAge : false,
    savingCapacity : false,
    // Agrega aquí los otros atributos que quieres evaluar
  });

  // Cargar la evaluación de crédito al montar el componente
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

  // Manejar el cambio de estado del interruptor
  const handleSwitchChange = async (field) => {
    const updatedEvaluation = { ...evaluation, [field]: !evaluation[field] };
    setEvaluation(updatedEvaluation); // Actualiza el estado local

    // Actualiza la evaluación en el backend
    try {
      await creditEvaluationService.update(updatedEvaluation);
    } catch (error) {
      console.error("Error al actualizar la evaluación de crédito:", error);
    }
  };

  return (
    <TableContainer component={Paper} className="mt-5">
      <h2 className="text-center">Evaluación de Crédito</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Criterio</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(evaluation).map((field) => (
            <TableRow key={field}>
              <TableCell align="left">{field}</TableCell>
              <TableCell align="left">
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
      <Link to="/executive" className="btn btn-primary mt-3">
        Volver a la lista de créditos
      </Link>
    </TableContainer>
  );
};

export default CreditEvaluation;
