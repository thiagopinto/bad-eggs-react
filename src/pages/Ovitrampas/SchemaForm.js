import { min } from "../../helpers/validation";

class SchemaForm {
  saad_id = {
    id: null,
    name: "saad_id",
    value: "",
    labelText: "Saad",
    helperText: "Informe a SAAD da Ovitramp",
    invalidText: "Campo obrigatório(*)",
    invalid: true,
    type: "select",
    required: true,
    isValid: (value) => {
      return min(value, 0);
    },
    options: [],
  };
  description = {
    id: null,
    name: "description",
    value: "",
    labelText: "Descrição",
    helperText: "Descrição da ovitrampas",
    invalidText: "Campo obrigatório(*)",
    invalid: true,
    type: "text",
    required: true,
    isValid: (value) => {
      return min(value, 5);
    },
  };
  address = {
    id: null,
    name: "address",
    value: "",
    labelText: "Endereço",
    helperText: "Endereço da ovitrampas",
    invalidText: "Campo obrigatório(*)",
    invalid: true,
    type: "text",
    required: true,
    isValid: (value) => {
      return min(value, 5);
    },
  };
  neighborhood = {
    id: null,
    name: "neighborhood",
    value: "",
    labelText: "Bairro",
    helperText: "Bairro da ovitrampas",
    invalidText: "Campo obrigatório(*)",
    invalid: true,
    type: "text",
    required: true,
    isValid: (value) => {
      return min(value, 5);
    },
  };
}

export default SchemaForm;
