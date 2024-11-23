import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import userService from "../services/user.service";

const AddUser = () => {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [titleUserForm, setTitleUserForm] = useState("Nuevo usuario");

  const { id } = useParams();
  const navigate = useNavigate();

  const saveUser = (u) => {
    u.preventDefault();

    const user = { rut, name, secondName, lastName, secondLastName, salary, address };
    if (id) {
      userService
        .update(user) // Paso el ID aquí en lugar de dentro del objeto
        .then((response) => {
          console.log("Usuario actualizado correctamente", response.data);
          navigate("/user/list");
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar actualizar datos del usuario.", error);
        });
    } else {
      userService
        .create(user)
        .then((response) => {
          console.log("El usuario ha sido añadido.", response.data);
          navigate("/user/list");
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar crear nuevo usuario.", error);
        });
    }
  };

  const formatRut = (rut) => {
    rut = rut.replace(/\./g, "").replace(/-/g, "");
    const dv = rut.slice(-1);
    const mainRut = rut.slice(0, -1);
    return mainRut.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
  };

  useEffect(() => {
    if (id) {
      setTitleUserForm("Editar usuario");
      userService
        .getById(id)
        .then((user) => {
          setRut(formatRut(user.data.rut)); // Aplica formato al RUT al cargar
          setName(user.data.name);
          setSecondName(user.data.secondName);
          setLastName(user.data.lastName);
          setSecondLastName(user.data.secondLastName);
          setSalary(user.data.salary);
          setAddress(user.data.address);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    }
  }, [id]); // Agrega `id` como dependencia

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
      onSubmit={saveUser} // Cambia el evento aquí para manejar la acción de guardado
    >
      <h3>{titleUserForm}</h3>
      <hr />
      <FormControl fullWidth>
        <TextField
          id="rut"
          label="RUT"
          value={rut}
          variant="standard"
          onChange={(e) => setRut(formatRut(e.target.value))} // Aplica formato al cambiar
          helperText="Ej. 12.345.678-9"
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="name"
          label="Name"
          value={name}
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="secondName"
          label="Second Name"
          value={secondName}
          variant="standard"
          onChange={(e) => setSecondName(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="lastName"
          label="Last Name"
          value={lastName}
          variant="standard"
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="secondLastName"
          label="Second Last Name"
          value={secondLastName}
          variant="standard"
          onChange={(e) => setSecondLastName(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="address"
          label="Address"
          value={address}
          variant="standard"
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="salary"
          label="Salary"
          type="number"
          value={salary}
          variant="standard"
          onChange={(e) => setSalary(e.target.value)}
          helperText="Salario mensual en Pesos Chilenos"
        />
      </FormControl>

      <FormControl>
        <br />
        <Button
          type="submit"
          variant="contained"
          color="info"
          style={{ marginLeft: "0.5rem" }}
          startIcon={<SaveIcon />}
        >
          Grabar
        </Button>
      </FormControl>

      <hr />
      <Link to="/" className="btn btn-primary mt-3">
        Volver al Menú Principal
      </Link>
    </Box>
  );
};

export default AddUser;
