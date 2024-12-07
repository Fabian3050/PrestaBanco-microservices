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
import statusService from "../services/status.service";
import userService from "../services/user.service";
import DeleteIcon from '@mui/icons-material/Delete';

const CreditEvaluationList = () => {
  const [credits, setCredits] = useState([]);
  const [userRuts, setUserRuts] = useState({}); // Mantener los RUTs de los usuarios por id
  const [estadoSolicitud, setEstadoSolicitud] = useState({}); // Mantener el estado de solicitud por id de crédito

  const [userRut, setUserRut] = useState(""); // RUT del usuario actual
  const navigate = useNavigate();

  const init = async () => {
    try {
      const creditResponse = await creditService.getAll();
      setCredits(creditResponse.data);
    } catch (error) {
      console.error("Error al obtener las solicitudes de crédito:", error);
    }
  };

  // Fetching datos asincrónicamente para cada crédito y usuario
  useEffect(() => {
    init();
  }, []);

  const handleEvaluate = () => {
    navigate("/executive/creditEvaluation");
  };

  const modifiedStatus = (id) => {
    navigate(`/executive/status/${id}`);
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = {};
      for (let credit of credits) {
        try {
          const statusResponse = await statusService.getByCreditId(credit.id);
          statuses[credit.id] = statusResponse.data.status;
        } catch (error) {
          console.error("Error al obtener el estado de la solicitud:", error);
        }
      }
      setEstadoSolicitud(statuses);
    };

    if (credits.length > 0) {
      fetchStatuses();
    }
  }, [credits]);



  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = {};
      const users = {};
      for (let credit of credits) {
        try {
          const statusResponse = await statusService.getByCreditId(credit.id);
          const userResponse = await userService.getById(credit.userId);
          statuses[credit.id] = statusResponse.data.status;
          users[credit.userId] = userResponse.data.rut;
        } catch (error) {
          console.error("Error al obtener el estado de la solicitud:", error);
        }
      }
      setUserRuts(users);
      setEstadoSolicitud(statuses);
    };

    if (credits.length > 0) {
      fetchStatuses();
    }
  }, [credits]);

  const fetchUserRut = async (userId) => {
    try {
      const response1 = await userService.getById(userId);
      if (response1.data && response1.data.rut) {
        setUserRuts(response1.data.rut);
      } else {
        console.error("No se encontró el RUT del usuario.");
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Está seguro que desea borrar esta solicitud de crédito?");
    if (confirmDelete) {
      creditService
        .remove(id)
        .then((response) => {
          console.log("La solicitud de crédito ha sido eliminada.", response.data);
          setCredits((prevCredits) => prevCredits.filter((credit) => credit.id !== id));
        })
        .catch((error) => {
          console.log("Se ha producido un error al intentar eliminar la solicitud de crédito", error);
        });
    }
  }

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
          {credits.map((credit) => {
            return (
              <TableRow key={credit.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="left">
                  {userRuts[credit.userId] || "N/A"} {/* Mostrar el RUT correspondiente */}
                </TableCell>
                <TableCell align="left">{credit.requestedAmount || "N/A"}</TableCell>
                <TableCell align="left">{credit.totalCost || "N/A"}</TableCell>
                <TableCell align="left">{credit.interestRate || "N/A"}</TableCell>
                <TableCell align="left">{credit.maxTerm || "N/A"} meses</TableCell>
                <TableCell align="left">{credit.creditType || "N/A"}</TableCell>
                <TableCell align="left">{credit.applicationDate || "N/A"}</TableCell>
                <TableCell align="left">{estadoSolicitud[credit.id] || "Sin seguimiento"}</TableCell> {/* Mostrar el estado correspondiente */}
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
                    style={{ marginTop: "8px" }}
                  >
                    Modificar estado solicitud
                  </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(credit.id)}
                  startIcon={<DeleteIcon />}
                  style={{ marginTop: "8px" }}
                >
                  Eliminar Credito
                </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Link to="/" className="btn btn-primary mt-3">
        Volver al menú Principal
      </Link>
    </TableContainer>
  );
};

export default CreditEvaluationList;
