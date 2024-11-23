import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import documentService from "../services/document.service";

const UploadDocuments = () => {
  const { creditId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});

  // Mapea el tipo de crédito a los documentos requeridos
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
        navigate("/register/list");
      }
      alert("Documentos subidos exitosamente.");
    } catch (error) {
      console.error("Error al subir documentos:", error);
      alert("Hubo un error al subir los documentos.");
    }
  };

  const handleBackToList = () => {
    navigate("/register/list"); 
  };

  return (
    <div className="container mt-5">
      <h2>Subida de Documentos para el Crédito ID: {creditId}</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <h4>Documentos Requeridos</h4>
          <ul>
            {requiredDocuments["Primera Vivienda"].map((doc, index) => (
              <li key={index} className="mb-2">
                {doc} 
                <input
                  type="file"
                  className="form-control mt-2"
                  onChange={(e) => handleFileChange(e, doc)}
                  required
                />
              </li>
            ))}
          </ul>
        </div>
        
        <button type="submit" className="btn btn-primary w-100">Subir Documentos</button>
        <button type="button" className="btn btn-primary w-100 mt-2" onClick={handleBackToList}> Volver al registro</button>
      </form>
    </div>
  );
};

export default UploadDocuments;
