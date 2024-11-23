import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import creditService from "../services/credit.service";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CreditEvaluationList = () => {
  const [credits, setCredits] = useState([]); // Cambiado a un array vacío
  const [userRuts, setUserRuts] = useState({}); // Estado para almacenar los RUTs de los usuarios asociados a sus IDs
  const navigate = useNavigate();

  const init = async () => {
    try {
      const creditResponse = await creditService.getAll();
      setCredits(creditResponse.data);
    } catch (error) {
      console.error("Error al obtener las solicitudes de crédito o usuarios:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleEvaluate = () => {
    navigate("/executive/creditEvaluation");
  };

  const modifiedStatus = (id) => {
    navigate(`/executive/status/${id}`);
  };

  return (
    <TableContainer component={Paper} className="mt-5">
      <h2 className="text-center">Solicitudes de Crédito del Sistema</h2>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="credit table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Rut Cliente</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Monto Solicitado</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Costo Total Credito</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Tasa de Interés</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Período de Pago (meses)</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo de Crédito</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha Creación Crédito</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Estado de la solicitud</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {credits.map((credit) => (
            <TableRow key={credit.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="left">{credit.user?.rut || "N/A"}</TableCell>
              <TableCell align="left">{credit.requestedAmount || "N/A"}</TableCell>
              <TableCell align="left">{credit.totalCost || "N/A"}</TableCell>
              <TableCell align="left">{credit.interestRate || "N/A"}</TableCell>
              <TableCell align="left">{credit.maxTerm || "N/A"} meses</TableCell>
              <TableCell align="left">{credit.creditType || "N/A"}</TableCell>
              <TableCell align="left">{credit.applicationDate || "N/A"}</TableCell>
              <TableCell align="left">{credit.status || "N/A"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleEvaluate}
                  startIcon={<ArrowForwardIosIcon />}
                >
                  Evaluar Credito
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => modifiedStatus(credit.id)}
                  startIcon={<ArrowForwardIosIcon />}
                  style={{ marginTop: "8px" }} // Agregar un espacio entre los botones
                >
                  Modificar estado solicitud
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to="/" className="btn btn-primary mt-3">
        Volver al menú Principal
      </Link>
    </TableContainer>
  );
};

export default CreditEvaluationList;
