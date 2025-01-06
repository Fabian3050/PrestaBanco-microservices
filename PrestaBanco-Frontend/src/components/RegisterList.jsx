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
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import userService from "../services/user.service.js";

const RegisterList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const init = () => {
    userService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los usuarios.", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los usuarios.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea borrar este usuario?"
    );
    if (confirmDelete) {
      userService
        .remove(id)
        .then(() => {
          console.log("El usuario ha sido eliminado.");
          init();
        })
        .catch((error) => {
          console.log("Error al eliminar usuario", error);
        });
    }
  };

  const handleEdit = (id) => navigate(`/user/edit/${id}`);
  const handleRequestCredit = (userId) => navigate(`/request-credit/${userId}`);
  const handleViewCredits = (userId) => navigate(`/user/${userId}/credits`);
  const handleSearch = (event) => setSearchTerm(event.target.value);

  const filteredUsers = users.filter((user) =>
    `${user.rut} ${user.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#0d47a1", marginBottom: "20px" }}>Usuarios registrados en el sistema</h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>Si usted no está registrado, puede realizar el registro y posteriormente
        solicitar un crédito para luego ver el historial de solicitudes realizadas.
      </p>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", p: 2 }}
      >
        <TextField
          label="Buscar por RUT o Nombre"
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

        <Link to="/user/add" style={{ textDecoration: "none", marginBottom: "1rem" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            sx={{ mb: 2 }}
          >
            Registrar Usuario
          </Button>
        </Link>

        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Rut</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Segundo Nombre</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Apellido</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Segundo Apellido</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Sueldo</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Dirección</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" }, "&:hover": { backgroundColor: "#e8f5e9", cursor: "pointer" } }}
              >
                <TableCell align="left">{user.rut}</TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.secondName}</TableCell>
                <TableCell align="left">{user.lastName}</TableCell>
                <TableCell align="left">{user.secondLastName}</TableCell>
                <TableCell align="left">{user.salary}</TableCell>
                <TableCell align="left">{user.address}</TableCell>
                <TableCell align="center" style={{ display: "flex", gap: "10px", justifyContent: "center",marginTop: "10px" }}>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleRequestCredit(user.id)}
                    style={{ borderRadius: "8px", width: "150px", height: "40px" }}
                    startIcon={<ArrowForwardIosIcon />}
                  >
                    Solicitar Crédito
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => handleViewCredits(user.id)}
                    style={{ borderRadius: "8px", width: "150px", height: "40px" }}
                    startIcon={<ArrowForwardIosIcon />}
                  >
                    Solicitudes realizadas
                  </Button>                 
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(user.id)}
                    style={{ borderRadius: "8px", width: "150px", height: "40px" }}
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(user.id)}
                    style={{ borderRadius: "8px", width: "150px", height: "40px" }}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Link to="/" className="btn btn-secondary" style={{ textDecoration: "none", marginTop: "20px" }}>
          Volver al Menú Principal
        </Link>
      </TableContainer>
    </div>
  );
};

export default RegisterList;
