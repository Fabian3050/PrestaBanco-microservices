import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import creditService from "../services/credit.service";
import statusService from "../services/status.service";
import { Button, FormControl, InputLabel, Select, MenuItem, Paper, Box } from "@mui/material";

const ModifyStatus = () => {
  const { creditId } = useParams();
  const navigate = useNavigate();
  const [credit, setCredit] = useState(null);
  const [status, setStatus] = useState("");

  const statusData = {
    status: status,
  };

  useEffect(() => {
    const fetchCredit = async () => {
      try {
        const response = await creditService.getCreditById(creditId);
        setCredit(response.data);
        setStatus(response.data.status); // Inicializar el estado actual
      } catch (error) {
        console.error("Error al obtener el crédito:", error);
      }
    };

    fetchCredit();
  }, [creditId]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (isNewStatus) => {
    try {
      const serviceMethod = isNewStatus ? statusService.create : statusService.update;
      await serviceMethod(statusData, creditId);
      console.log("Estado actualizado correctamente");
      navigate(`/executive`);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          borderRadius: "10px",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem" }}>Modificar estado de la solicitud de crédito</h2>

        <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
          <InputLabel id="status-label">Estado</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={handleStatusChange}
            sx={{ borderRadius: "10px" }}
          >
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="falta ingreso">Falta ingresos</MenuItem>
            <MenuItem value="Aprobado">Aprobado</MenuItem>
            <MenuItem value="Rechazado">Rechazado</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit(true)}
            sx={{ borderRadius: "10px", flex: 1, marginRight: "0.5rem" }}
          >
            Crear Estado de Solicitud
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSubmit(false)}
            sx={{ borderRadius: "10px", flex: 1, marginLeft: "0.5rem" }}
          >
            Modificar Estado de Solicitud
          </Button>
        </Box>

        <Button
          variant="text"
          onClick={() => navigate("/executive")}
          sx={{ marginTop: "2rem" }}
        >
          Volver a la lista de solicitudes
        </Button>
      </Paper>
    </Box>
  );
};

export default ModifyStatus;
