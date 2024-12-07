import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import totalCostService from "../services/totalCost.service";
import Button from '@mui/material/Button';  // Asegúrate de importar el componente Button

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
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="col-md-6 p-4 border rounded shadow-sm bg-light" style={{ textAlign: "center", fontSize: "1.2rem" }}>
                <h2>Resultados de cálculo de costos totales del crédito</h2>
                {totalCostResult ? (
                    <div>
                        <p><strong>Costo total del crédito:</strong> {totalCostResult.totalCost}</p>
                        <p><strong>Seguro de vida:</strong> {totalCostResult.creditLifeInsurance}</p>
                        <p><strong>Seguro de incendio:</strong> {totalCostResult.fireInsurance}</p>
                        <p><strong>Comisión por administración:</strong> {totalCostResult.comission}</p>
                    </div>
                ) : (
                    <div>
                        <p>Introduce los datos y realiza la simulación para ver los resultados.</p>
                    </div>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    size="large"  // Aumentar el tamaño del botón
                    onClick={() => handleViewCredits(userId)}
                    style={{ marginTop: "1rem", padding: "10px 20px" }}
                >
                    Ver solicitudes de crédito
                </Button>
            </div>
        </div>
    );
};

export default TotalCostResult;
