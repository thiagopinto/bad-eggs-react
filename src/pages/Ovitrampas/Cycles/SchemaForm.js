class SchemaForm {
  start = {
    id: null,
    name: "start",
    value: "",
    labelText: "Data de Início",
    helperText: "Data que foi colocado a armadilha",
    invalidText: "Campo obrigatório(*)",
    invalid: true,
    type: "date",
    required: true,
    isValid: (value) => {
      return value ? true : false;
    },
  };
  end = {
    id: null,
    name: "end",
    value: "",
    labelText: "Data de Fim",
    helperText: "Data que foi removido a armadilha",
    invalidText: "(*)",
    invalid: false,
    type: "date",
    required: false,
    isValid: (value) => {
      return value == value;
    },
  };
}

export default SchemaForm;
