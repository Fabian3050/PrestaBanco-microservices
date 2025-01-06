import { useEffect, useState } from "react";
import { useParams, Link , useNavigate } from "react-router-dom";
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
import statusService from "../services/status.service";
import totalCostService from "../services/totalCost.service";
import { format } from "date-fns";

const CreditListByUser = () => {
  const { userId } = useParams();
  const [credits, setCredits] = useState([]);
  const [userRut, setUserRut] = useState("");
  const [estadoSolicitudes, setEstadoSolicitudes] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await creditService.getCreditByUserId(userId);
        setCredits(response.data);
      } catch (error) {
        console.error("Error al obtener las solicitudes de crédito:", error);
      }
    };

    const fetchUserRut = async () => {
      try {
        const response1 = await userService.getById(userId);
        setUserRut(response1.data.rut);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
    fetchCredits();
    fetchUserRut();
  }, [userId]);

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
      setEstadoSolicitudes(statuses);
    };

    if (credits.length > 0) {
      fetchStatuses();
    }
  }, [credits]);

  const deleteCredit = (id) => {
    const confirmDelete = window.confirm("¿Está seguro que desea borrar esta solicitud de crédito?");
    if (confirmDelete) {
      creditService
        .remove(id)
        .then((response) => {
          console.log("La solicitud de crédito ha sido eliminada.", response.data);
          setCredits(prevCredits => prevCredits.filter((credit) => credit.id !== id));
        })
        .catch((error) => {
          console.log("Se ha producido un error al intentar eliminar la solicitud de crédito", error);
        });
    }
  };

  const calcularCostosTotales = async (creditId) => {
    try {
      navigate(`/totalCostCredit/${creditId}/${userId}`);
    } catch (error) {
      console.error("Error al calcular los costos totales:", error);
    }
  };

  const traduccionesTipoCredito = {
    "firstHome": "Primera Vivienda",
    "secondHome": "Segunda Vivienda",
    "commercialProperty": "Propiedad Comercial",
    "remodeling": "Remodelación"
  };

  return (
    <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#0d47a1", marginBottom: "10px" }}>Solicitudes de Crédito del Usuario</h1>
      </header>
      <TableContainer
        component={Paper}
        style={{ borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", padding: "20px" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Rut Cliente</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Monto Solicitado</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Tasa de Interés Anual</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Período de Pago (meses)</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Tipo de Crédito</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Fecha Creación Crédito</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Estado de la Solicitud</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {credits.map((credit) => (
              <TableRow key={credit.id} style={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" }, "&:hover": { backgroundColor: "#e8f5e9", cursor: "pointer" } }}>
                <TableCell align="left">{userRut || "N/A"}</TableCell>
                <TableCell align="left">{"$" + credit.requestedAmount.toLocaleString("es-CL") || "N/A"}</TableCell>
                <TableCell align="left">{credit.interestRate || "N/A"}</TableCell>
                <TableCell align="left">{credit.maxTerm || "N/A"} meses</TableCell>
                <TableCell align="left">{traduccionesTipoCredito[credit.creditType] || "N/A"}</TableCell>
                <TableCell align="left">{credit.applicationDate ? format(new Date(credit.applicationDate), "dd/MM/yyyy HH:mm:ss") : "N/A"}</TableCell>
                <TableCell align="left">{estadoSolicitudes[credit.id] || "Sin seguimiento"}</TableCell>
                <TableCell align="center">
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteCredit(credit.id)}
                    style={{ borderRadius: "8px", width: "150px", height: "40px" }}
                    startIcon={<DeleteIcon />}
                    >
                    Eliminar Solicitud
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => calcularCostosTotales(credit.id)}
                    style={{ borderRadius: "8px", width: "150px", height: "40px" }}
                    >
                    Calcular Costos Totales
                  </Button>
                </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/register/list" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ borderRadius: "8px", padding: "10px 20px" }}
            >
              Volver al registro de usuarios
            </Button>
          </Link>
        </div>
      </TableContainer>
    </div>
  );
};

export default CreditListByUser;
