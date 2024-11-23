import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import creditService from "../services/credit.service";
import userService from "../services/user.service";

const CreditListByUser = () => {
  const { userId } = useParams();
  const [credits, setCredits] = useState([]);
  const [userRut, setUserRut] = useState("");
  const [totalCosts, setTotalCosts] = useState({});

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await creditService.getById(userId);
        setCredits(response.data);
      } catch (error) {
        console.error("Error al obtener las solicitudes de crédito:", error);
      }
    };

    const fetchUserRut = async () => {
      try {
        const response = await userService.getById(userId);
        setUserRut(response.data.rut);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchCredits();
    fetchUserRut();
  }, [userId]);

  useEffect(() => {
    const fetchTotalCosts = async () => {
      try {
        const costs = {};
        for (let credit of credits) {
          const costResponse = await creditService.getTotalCost(credit.id);
          const formattedDate = format(new Date(credit.applicationDate), 'dd/MM/yyyy HH:mm');
          costs[credit.id] = costResponse.data; // Asigna el costo total a cada crédito
        }
        setTotalCosts(costs);
      } catch (error) {
        console.error("Error al obtener los costos totales:", error);
      }
    };

    if (credits.length > 0) {
      fetchTotalCosts();
    }
  }, [credits]);

  const deleteCredit = (id) => {
    const confirmDelete = window.confirm("¿Está seguro que desea borrar esta solicitud de crédito?");
    if (confirmDelete) {
      creditService
        .remove(id)
        .then((response) => {
          console.log("La solicitud de crédito ha sido eliminada.", response.data);
          setCredits(credits.filter((credit) => credit.id !== id));
        })
        .catch((error) => {
          console.log("Se ha producido un error al intentar eliminar la solicitud de crédito", error);
        });
    }
  };

  return (
    <TableContainer component={Paper} className="mt-5">
      <h2 className="text-center">Solicitudes de Crédito del Usuario</h2>
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
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Estado de la Solicitud</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {credits.map((credit) => (
            <TableRow key={credit.id}>
              <TableCell align="left">{userRut || "N/A"}</TableCell>
              <TableCell align="left">{credit.requestedAmount || "N/A"}</TableCell>
              <TableCell align="left">{totalCosts[credit.id] || "N/A"}</TableCell>
              <TableCell align="left">{credit.interestRate || "N/A"}</TableCell>
              <TableCell align="left">{credit.maxTerm || "N/A"} meses</TableCell>
              <TableCell align="left">{credit.creditType || "N/A"}</TableCell>
              <TableCell align="left">{credit.applicationDate || "N/A"}</TableCell>
              <TableCell align="left">{credit.status || "N/A"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => deleteCredit(credit.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to="/register/list" className="btn btn-primary mt-3">
        Volver al registro de usuarios
      </Link>
    </TableContainer>
  );
};

export default CreditListByUser;
