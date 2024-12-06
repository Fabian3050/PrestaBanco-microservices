import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import totalCostService from "../services/totalCost.service";
import Button from '@mui/material/Button';  // Asegúrate de importar el componente Button
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';  // Importa el icono si no está importado

const TotalCostResult = () => {
    const { totalCostId, userId } = useParams();
    const [totalCostResult, setTotalCostResult] = useState(null);  // Inicializa como false
    const [comission, setComission] = useState("");
    const [creditLifeInsurance, setCreditLifeInsurance] = useState("");
    const navigate = useNavigate();  // Definir la función de navegación

    useEffect(() => {
        const fetchTotalCost = async () => {
            try {
                const response = await totalCostService.getById(totalCostId);
                setComission(parseInt(response.data.comission, 10));
                setCreditLifeInsurance(parseInt(response.data.creditLifeIsurance, 10));
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
        <div className="col-md-6">
            <h2>Resultados de calculo de costos totales del credito</h2>
            {totalCostResult ? (
                <div className="p-4 border rounded shadow-sm bg-light">
                    <p><strong>Costo total del credito:</strong> {totalCostResult.totalCost}</p>
                    <p><strong>Seguro de vida:</strong> {creditLifeInsurance}</p>
                    <p><strong>Seguro de incendio:</strong> {totalCostResult.fireInsurance}</p>
                    <p><strong>Comisión por administracion:</strong> {comission}</p>
                </div>
            ) : (
                <div className="p-4 border rounded shadow-sm bg-light">
                    <p>Introduce los datos y realiza la simulación para ver los resultados.</p>
                </div>
            )}
            <Button
                variant="contained"
                color="primary"
                size="small mt-1"
                onClick={() => handleViewCredits(userId)}
                style={{ marginLeft: "0.5rem" }}
            >
                ver solicitudes de credito
            </Button>
        </div>
    );
};

export default TotalCostResult;
