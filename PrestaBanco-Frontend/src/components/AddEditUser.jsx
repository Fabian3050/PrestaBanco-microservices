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

  const validateFields = () => {
    const missingFields = [];
    if (!rut) missingFields.push("RUT");
    if (!name) missingFields.push("Nombre");
    if (!lastName) missingFields.push("Apellido");
    if (!salary) missingFields.push("Salario");
    if (!address) missingFields.push("Dirección");

    if (missingFields.length > 0) {
      alert(`Por favor complete los siguientes campos obligatorios: ${missingFields.join(", ")}`);
      return false;
    }

    if (salary <= 0) {
      alert("El salario debe ser un valor positivo.");
      return false;
    }

    return true;
  };

  const saveUser = (u) => {
    u.preventDefault();

    if (!validateFields()) return;

    const user = { rut, name, secondName, lastName, secondLastName, salary, address };
    if (id) {
      userService
        .update(user, id)
        .then((response) => {
          console.log("Usuario actualizado correctamente", response.data);
          navigate("/register/list");
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
          setRut(formatRut(user.data.rut));
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
  }, [id]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
      onSubmit={saveUser}
      style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <h3 style={{ color: "#0d47a1", marginBottom: "20px" }}>{titleUserForm}</h3>
      <FormControl fullWidth style={{ marginBottom: "15px" }}>
        <TextField
          id="rut"
          label="RUT"
          value={rut}
          variant="outlined"
          onChange={(e) => setRut(formatRut(e.target.value))}
          helperText="Ej. 12.345.678-9"
          style={{ borderRadius: "10px" }}
        />
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: "15px" }}>
        <TextField
          id="name"
          label="Nombre"
          value={name}
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          style={{ borderRadius: "10px" }}
        />
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: "15px" }}>
        <TextField
          id="secondName"
          label="Segundo Nombre"
          value={secondName}
          variant="outlined"
          onChange={(e) => setSecondName(e.target.value)}
          style={{ borderRadius: "10px" }}
        />
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: "15px" }}>
        <TextField
          id="lastName"
          label="Apellido"
          value={lastName}
          variant="outlined"
          onChange={(e) => setLastName(e.target.value)}
          style={{ borderRadius: "10px" }}
        />
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: "15px" }}>
        <TextField
          id="secondLastName"
          label="Segundo Apellido"
          value={secondLastName}
          variant="outlined"
          onChange={(e) => setSecondLastName(e.target.value)}
          style={{ borderRadius: "10px" }}
        />
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: "15px" }}>
        <TextField
          id="address"
          label="Dirección"
          value={address}
          variant="outlined"
          onChange={(e) => setAddress(e.target.value)}
          style={{ borderRadius: "10px" }}
        />
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: "15px" }}>
        <TextField
          id="salary"
          label="Salario"
          type="number"
          value={salary}
          variant="outlined"
          onChange={(e) => setSalary(Math.max(0, e.target.value))}
          helperText="Salario mensual en Pesos Chilenos"
          style={{ borderRadius: "10px" }}
        />
      </FormControl>

      <FormControl>
        <Button
          type="submit"
          variant="contained"
          color="success"
          style={{ margin: "10px 0", borderRadius: "8px", padding: "10px 20px" }}
          startIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </FormControl>

      <Link to="/register/list" style={{ textDecoration: "none", marginTop: "15px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ borderRadius: "8px", padding: "10px 20px" }}
        >
          Ir a la lista de registrados
        </Button>
      </Link>
    </Box>
  );
};

export default AddUser;
