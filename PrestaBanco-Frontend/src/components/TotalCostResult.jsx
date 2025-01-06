import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import totalCostService from "../services/totalCost.service";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TotalCostResult = () => {
  const { totalCostId, userId } = useParams();
  const [totalCostResult, setTotalCostResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalCost = async () => {
      try {
        const response = await totalCostService.getById(totalCostId);
        setTotalCostResult(response.data);
      } catch (error) {
        console.error("Error al obtener el costo total:", error);
      }
    };

    fetchTotalCost();
  }, [totalCostId]);

  const handleViewCredits = (userId) => {
    navigate(`/user/${userId}/credits`);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", backgroundColor: "#f0f8ff", padding: 2 }}
    >
      <Card
        sx={{
          maxWidth: 600,
          padding: 3,
          borderRadius: "16px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h4" color="#0d47a1" gutterBottom>
            Resultados de Cálculo de Costos Totales del Crédito
          </Typography>
          {totalCostResult ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                <strong>Costo Total del Crédito:</strong> {`$${totalCostResult.totalCost.toLocaleString("es-CL")}`}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Seguro de Vida:</strong> {`$${totalCostResult.creditLifeInsurance.toLocaleString("es-CL")}`}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Seguro de Incendio:</strong> {`$${totalCostResult.fireInsurance.toLocaleString("es-CL")}`}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Comisión por Administración:</strong> {`$${totalCostResult.comission}`}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Cargando resultados... Por favor, espere.
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleViewCredits(userId)}
            sx={{ mt: 3, padding: "10px 20px", borderRadius: "8px" }}
          >
            Ver Solicitudes de Crédito
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TotalCostResult;
