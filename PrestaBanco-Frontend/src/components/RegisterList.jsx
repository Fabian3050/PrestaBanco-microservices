import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import userService from "../services/user.service.js";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const RegisterList = () => {
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

  const handleRequestCredit = (userId) => {
    navigate(`/request-credit/${userId}`);
  };

  const handleViewCredits = (userId) => {
    navigate(`/user/${userId}/credits`);
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/user/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Registrar usuario
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Rut
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Nombre
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Segundo Nombre
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Apellido
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Segundo Apellido
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Sueldo
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Dirección
            </TableCell>    
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{user.rut}</TableCell>
              <TableCell align="left">{user.name}</TableCell>
              <TableCell align="left">{user.secondName}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="left">{user.secondLastName}</TableCell>
              <TableCell align="left">{user.salary}</TableCell>
              <TableCell align="left">{user.address}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small mt"
                  onClick={() => handleEdit(user.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small mt"
                  onClick={() => handleDelete(user.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  size="small mt-1"
                  onClick={() => handleRequestCredit(user.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<ArrowForwardIosIcon />}
                >
                  Solicitar Crédito
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  size="small mt-1"
                  onClick={() => handleViewCredits(user.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<ArrowForwardIosIcon />}
                >
                 ver solicitudes de credito
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to="/" className="btn btn-primary mt-3">
        Volver al Menú Principal
      </Link>
    </TableContainer> 
  );
};

export default RegisterList;