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
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import creditService from "../services/credit.service";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import statusService from "../services/status.service";
import userService from "../services/user.service";
import creditEvaluationService from "../services/creditEvaluation.service";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { format } from "date-fns";

const CreditEvaluationList = () => {
  const [credits, setCredits] = useState([]);
  const [filteredCredits, setFilteredCredits] = useState([]);
  const [userRuts, setUserRuts] = useState({}); // Mantener los RUTs de los usuarios por id
  const [estadoSolicitud, setEstadoSolicitud] = useState({}); // Mantener el estado de solicitud por id de crédito
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para almacenar los valores de la evaluación de crédito
  const [ratioFeeIncome, setRatioFeeIncome] = useState(false);
  const [creditHistory, setCreditHistory] = useState(false);
  const [jobSeniority, setJobSeniority] = useState(false);
  const [ratioDebtIncome, setRatioDebtIncome] = useState(false);
  const [maximumFinancingAmount, setMaximumFinancingAmount] = useState(false);
  const [applicantAge, setApplicantAge] = useState(false);
  const [savingCapacity, setSavingCapacity] = useState(false);

  const navigate = useNavigate();

  const init = async () => {
    try {
      const creditResponse = await creditService.getAll();
      setCredits(creditResponse.data);
      setFilteredCredits(creditResponse.data);
    } catch (error) {
      console.error("Error al obtener las solicitudes de crédito:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleEvaluate = (creditId) => {
    const evaluateData = {
      ratioFeeIncome ,
      creditHistory,
      jobSeniority,
      ratioDebtIncome,
      maximumFinancingAmount,
      applicantAge,
      savingCapacity,
    };
    creditEvaluationService.create(creditId, evaluateData);
    navigate("/executive/creditEvaluation/" + creditId);
  };

  const modifiedStatus = (id) => {
    navigate(`/executive/status/${id}`);
  };

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

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Está seguro que desea borrar esta solicitud de crédito?");
    if (confirmDelete) {
      creditService
        .remove(id)
        .then((response) => {
          console.log("La solicitud de crédito ha sido eliminada.", response.data);
          setCredits((prevCredits) => prevCredits.filter((credit) => credit.id !== id));
          setFilteredCredits((prevCredits) => prevCredits.filter((credit) => credit.id !== id));
        })
        .catch((error) => {
          console.log("Se ha producido un error al intentar eliminar la solicitud de crédito", error);
        });
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = credits.filter((credit) =>
      userRuts[credit.userId]?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCredits(filtered);
  };

  const traduccionesTipoCredito = {
    "firstHome": "Primera Vivienda",
    "secondHome": "Segunda Vivienda",
    "commercialProperty": "Propiedad Comercial",
    "remodeling": "Remodelación"
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", p: 3, backgroundColor: "#f0f8ff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Solicitudes de Crédito del Sistema</h2>

      <TextField
          label="Buscar por RUT"
          variant="outlined"
          fullWidth
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, borderRadius: "20px" }}
        />

      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Rut Cliente</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Monto Solicitado</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Tasa de Interés</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Período de Pago (meses)</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo de Crédito</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha Creación Crédito</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Estado de la solicitud</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCredits.map((credit) => {
            return (
              <TableRow
                key={credit.id}
                sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" }, "&:hover": { backgroundColor: "#e8f5e9", cursor: "pointer" } }}
              >
                <TableCell align="left">
                  {userRuts[credit.userId] || "N/A"} {/* Mostrar el RUT correspondiente */}
                </TableCell>
                <TableCell align="left">{"$" + credit.requestedAmount.toLocaleString("es-CL") || "N/A"}</TableCell>
                <TableCell align="left">{credit.interestRate || "N/A"}</TableCell>
                <TableCell align="left">{credit.maxTerm || "N/A"} meses</TableCell>
                <TableCell align="left">{traduccionesTipoCredito[credit.creditType]|| "N/A"}</TableCell>
                <TableCell align="left">
                  {credit.applicationDate ? format(new Date(credit.applicationDate), "dd/MM/yyyy HH:mm:ss") : "N/A"}
                </TableCell>
                <TableCell align="left">{estadoSolicitud[credit.id] || "Sin seguimiento"}</TableCell> {/* Mostrar el estado correspondiente */}
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEvaluate(credit.id)}
                    startIcon={<ArrowForwardIosIcon />}
                    style={{ borderRadius: "8px", width: "150px", height: "40px" }}
                    sx={{ marginBottom: "5px" }}
                  >
                    Evaluar Solicitud
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => modifiedStatus(credit.id)}
                    startIcon={<ArrowForwardIosIcon />}
                    style={{ borderRadius: "8px", width: "150px", height: "40px" }}
                    sx={{ marginBottom: "5px" }}
                  >
                    Modificar Estado
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    style={{ borderRadius: "8px", width: "150px", height: "40px" }}
                    onClick={() => handleDelete(credit.id)}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: "20px" }}>
          Volver al Menú Principal
        </Button>
      </Link>
    </TableContainer>
  );
};

export default CreditEvaluationList;
