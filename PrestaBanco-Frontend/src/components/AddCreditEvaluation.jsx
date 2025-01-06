import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import creditEvaluationService from "../services/creditEvaluation.service";
import {
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
} from "@mui/material";
import documentService from "../services/document.service";

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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState({});

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await creditEvaluationService.getBycreditId(creditId);
        if (response?.data) {
          setEvaluation(response.data);
        } else {
          console.error("La respuesta del backend no contiene datos.");
        }
      } catch (error) {
        console.error("Error al obtener la evaluación de crédito:", error);
      }
    };

    const fetchFiles = async () => {
      try {
        const response = await creditEvaluationService.getUploadedFiles(creditId);
        if (response?.data) {
          setUploadedFiles(response.data);
        } else {
          console.error("No se encontraron archivos subidos.");
        }
      } catch (error) {
        console.error("Error al obtener los archivos subidos:", error);
      }
    };

    fetchEvaluation();
    fetchFiles();
  }, [creditId]);

  const handleSwitchChange = async (field) => {
    const updatedEvaluation = { ...evaluation, [field]: !evaluation[field] };
    setEvaluation(updatedEvaluation);

    try {
      await creditEvaluationService.update(creditId, updatedEvaluation);
    } catch (error) {
      console.error("Error al actualizar la evaluación de crédito:", error);
    }
  };

  const handleFileChange = (field, file) => {
    setUploadFiles({ ...uploadFiles, [field]: file });
  };

  const handleFileUpload = async (field) => {
    const file = uploadFiles[field];
    if (!file) {
      alert("Por favor selecciona un archivo antes de subir.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("field", field);
      formData.append("creditId", creditId);

      await creditEvaluationService.uploadFile(formData);
      alert("Archivo subido exitosamente.");
      setUploadFiles({ ...uploadFiles, [field]: null });
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert("Hubo un error al subir el archivo.");
    }
  };

  const handleCreateEvaluation = async () => {
    try {
      await creditEvaluationService.create(creditId);
      alert("Evaluación de crédito creada exitosamente.");
      setEvaluation({
        "Relación Cuota-Ingreso": false,
        "Historial de Crédito": false,
        "Antigüedad Laboral": false,
        "Relación Deuda-Ingreso": false,
        "Monto Máximo de Financiamiento": false,
        "Edad del Solicitante": false,
        "Capacidad de Ahorro": false,
      });
    } catch (error) {
      console.error("Error al crear la evaluación de crédito:", error);
      alert("Hubo un error al crear la evaluación de crédito.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h3" style={{ color: "#0d47a1" }}>
          Evaluación de Crédito
        </Typography>
      </header>

      <TableContainer
        component={Paper}
        style={{
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#e3f2fd" }}>
              <TableCell align="left" style={{ fontWeight: "bold" }}>Criterio</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Estado</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Subir Documento</TableCell>
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
                <TableCell align="center">
                  {!evaluation[field] && (
                    <div>
                      <TextField
                        type="file"
                        onChange={(e) => handleFileChange(field, e.target.files[0])}
                      />
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginTop: "10px" }}
                        onClick={() => handleFileUpload(field)}
                      >
                        Subir
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <section style={{ marginBottom: "20px" }}>
        <Typography variant="h5" style={{ color: "#0d47a1", marginBottom: "10px" }}>
          Archivos Subidos
        </Typography>
        <Paper style={{ padding: "10px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          {uploadedFiles.length > 0 ? (
            <List>
              {uploadedFiles.map((file, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={file.fileName} secondary={`Tamaño: ${file.size} KB`} />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => window.open(file.url, "_blank")}
                    >
                      Ver Archivo
                    </Button>
                  </ListItem>
                  {index < uploadedFiles.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body1" style={{ color: "#757575" }}>
              No hay archivos subidos.
            </Typography>
          )}
        </Paper>
      </section>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="success"
          style={{ borderRadius: "8px", padding: "10px 20px" }}
          onClick={handleCreateEvaluation}
        >
          Crear Evaluación de Crédito
        </Button>
      </div>

      <div style={{ textAlign: "center" }}>
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
    </div>
  );
};

export default CreditEvaluation;
