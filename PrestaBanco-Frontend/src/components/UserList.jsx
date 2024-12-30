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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import userService from "../services/user.service.js";

const UserList = () => {
  const [users, setUsers] = useState([]);

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
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este usuario?"
    );
    if (confirmDelete) {
      userService
        .remove(id)
        .then((response) => {
          console.log("El usuario ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al usuario",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/user/edit/${id}`);
  };

  return (
    <div style={{ backgroundColor: '#f0f8ff', minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0d47a1', marginBottom: '10px' }}>Usuarios Registrados</h1>
      </header>
      <TableContainer
        component={Paper}
        style={{ borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px' }}
      >
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/user/add" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
              style={{ borderRadius: '8px', padding: '10px 20px' }}
            >
              Añadir Usuario
            </Button>
          </Link>
        </div>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: '#e3f2fd' }}>Rut</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: '#e3f2fd' }}>Nombre</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: '#e3f2fd' }}>Segundo Nombre</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: '#e3f2fd' }}>Apellido</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: '#e3f2fd' }}>Segundo Apellido</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: '#e3f2fd' }}>Sueldo</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold", backgroundColor: '#e3f2fd' }}>Dirección</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold", backgroundColor: '#e3f2fd' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                style={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" }, "&:hover": { backgroundColor: "#e8f5e9", cursor: "pointer" } }}
              >
                <TableCell align="left">{user.rut}</TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.secondName}</TableCell>
                <TableCell align="left">{user.lastName}</TableCell>
                <TableCell align="left">{user.secondLastName}</TableCell>
                <TableCell align="left">{user.salary}</TableCell>
                <TableCell align="left">{user.address}</TableCell>
                <TableCell align="center">
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => handleEdit(user.id)}
                      style={{ borderRadius: '8px' }}
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(user.id)}
                      style={{ borderRadius: '8px', marginLeft: '10px' }}
                      startIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ borderRadius: '8px', padding: '10px 20px' }}
            >
              Volver al Menú Principal
            </Button>
          </Link>
        </div>
      </TableContainer>
    </div>
  );
};

export default UserList;
