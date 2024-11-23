import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import creditService from "../services/credit.service";
import { Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";


const ModifyStatus = () => {
  const { creditId } = useParams();
  const navigate = useNavigate();
  const [credit, setCredit] = useState(null);
  const [status, setStatus] = useState("");

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

  const handleSave = async () => {
    try {
      await creditService.updateStatus(creditId, status);
      console.log("Estado actualizado correctamente");
      navigate("/executive"); // Redirige a la lista después de guardar
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };


  return (
    <div>
      <h2>Modificar estado de la solicitud de crédito</h2>

      <FormControl fullWidth variant="standard">
        <InputLabel id="status-label">Estado</InputLabel>
        <Select labelId="status-label" value={status} onChange={handleStatusChange}>
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="falta ingreso">Falta ingresos</MenuItem>
          <MenuItem value="Aprobado">Aprobado</MenuItem>
          <MenuItem value="Rechazado">Rechazado</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSave} className="mt-3">
        Guardar cambios
      </Button>
    </div>
  );
};

export default ModifyStatus;
