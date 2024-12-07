import { useEffect, useState } from "react";
import { useParams, Link , useNavigate} from "react-router-dom";
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

const CreditListByUser = () => {
  const { userId } = useParams();
  const [credits, setCredits] = useState([]);
  const [userRut, setUserRut] = useState("");
  const [estadoSolicitudes, setEstadoSolicitudes] = useState({});
  const [costoTotal, setCostoTotal] = useState(0);
  const [creditLifeInsurance, setCreditLifeInsurance] = useState(0);
  const [fireInsurance, setFireInsurance] = useState(0);
  const [comission, setComission] = useState(0);

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
    const totalCostData = {
      totalCost: costoTotal, // Asegúrate de que 'costoTotal' esté definido y actualizado
      creditLifeInsurance: creditLifeInsurance,
      fireInsurance: fireInsurance,
      comission: comission
    };

    try {
      const response = await totalCostService.create(totalCostData, creditId);
      setCostoTotal(response.data.totalCost);
      navigate('/totalCostCredit/' + response.data.id + '/' + userId);
    } catch (error) {
      console.error("Error al obtener el costo total:", error);
      return null;
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
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Tasa de Interés Anual</TableCell>
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
              <TableCell align="left">{credit.interestRate || "N/A"}</TableCell>
              <TableCell align="left">{credit.maxTerm || "N/A"} meses</TableCell>
              <TableCell align="left">{credit.creditType || "N/A"}</TableCell>
              <TableCell align="left">{credit.applicationDate || "N/A"}</TableCell>
              <TableCell align="left">{estadoSolicitudes[credit.id] || "Sin seguimiento"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  size="small mt-1"
                  onClick={() => deleteCredit(credit.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  size="small mt-1"
                  onClick={() => calcularCostosTotales(credit.id)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Calcular costos totales
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
