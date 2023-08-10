class SchemaForm {
  eggs = {
    id: null,
    name: "eggs",
    value: 0,
    labelText: "Ovos",
    helperText: "Quantidade de Ovos",
    invalidText: "Campo obrigatório(*)",
    invalid: true,
    type: "number",
    required: true,
    isValid: () => {
      return true;
    },
  };
  bad_eggs = {
    id: null,
    name: "bad_eggs",
    value: 0,
    labelText: "Ovos ruins",
    helperText: "Quantidade de Ovos ruins",
    invalidText: "Campo obrigatório(*)",
    invalid: true,
    type: "number",
    required: true,
    isValid: () => {
      return true;
    },
  };
  false_positive = {
    id: null,
    name: "false_positive",
    value: false,
    labelText: "Falso Positivo",
    helperText: "Nesta imgem tem falso positivo?",
    invalidText: "Campo obrigatório(*)",
    invalid: false,
    type: "checkbox",
    required: false,
    isValid: () => {
      return true;
    },
  };
  false_negative = {
    id: null,
    name: "false_negative",
    value: false,
    labelText: "Falso Negativo",
    helperText: "Nesta imgem tem falso negativo?",
    invalidText: "Campo obrigatório(*)",
    invalid: false,
    type: "checkbox",
    required: false,
    isValid: () => {
      return true;
    },
  };
}

export default SchemaForm;
