import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import documentService from "../services/document.service";

const UploadDocuments = () => {
  const { creditId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});

  const requiredDocuments = {
    "Primera Vivienda": ["Comprobante de ingresos", "Certificado de avalúo", "Historial crediticio"],
    "Segunda Vivienda": ["Comprobante de ingresos", "Certificado de avalúo", "Escritura de la primera vivienda", "Historial crediticio"],
    "Propiedades Comerciales": ["Estado financiero del negocio", "Comprobante de ingresos", "Certificado de avalúo", "Plan de negocios"],
    "Remodelación": ["Comprobante de ingresos", "Presupuesto de la remodelación", "Certificado de avalúo actualizado"],
  };

  const handleFileChange = (e, doc) => {
    setSelectedFiles({ ...selectedFiles, [doc]: e.target.files[0] });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const doc of documents) {
        const formData = new FormData();
        formData.append("file", selectedFiles[doc]);
        formData.append("documentType", doc);

        await documentService.create(creditId, formData);
      }
      alert("Documentos subidos exitosamente.");
      navigate("/register/list");
    } catch (error) {
      console.error("Error al subir documentos:", error);
      alert("Hubo un error al subir los documentos.");
    }
  };

  const handleBackToList = () => {
    navigate("/register/list");
  };

  return (
    <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#0d47a1", marginBottom: "10px" }}>Subida de Documentos</h1>
        <p style={{ fontSize: "1rem", color: "#555" }}>Para el Crédito ID: <strong>{creditId}</strong></p>
      </header>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form
          style={{
            flex: 1,
            maxWidth: "600px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
          onSubmit={handleSubmit}
        >
          <h2 style={{ fontSize: "1.5rem", color: "#0d47a1", marginBottom: "20px", textAlign: "center" }}>Documentos Requeridos</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {requiredDocuments["Primera Vivienda"].map((doc, index) => (
              <li key={index} style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
                  {doc}:
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleFileChange(e, doc)}
                  required
                  style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
              </li>
            ))}
          </ul>

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#1976d2",
              color: "white",
              padding: "15px",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Subir Documentos
          </button>
          <button
            type="button"
            onClick={handleBackToList}
            style={{
              width: "100%",
              backgroundColor: "#555",
              color: "white",
              padding: "15px",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Volver al Registro
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDocuments;
