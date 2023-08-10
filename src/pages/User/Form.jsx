import { useState } from "react";
import {
  FormGroup,
  Button,
  ButtonSet,
  Tile,
  ToastNotification,
  AspectRatio,
} from "@carbon/react";
import { min, isMail } from "../../helpers/validation";
import User from "../../services/User";
import ComponentForm from "../../components/ComponentForm";

export default function Form({ items, setItems }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: {
      name: "name",
      value: "",
      labelText: "Nome",
      helperText: "Digite seu nome",
      invalidText: "Campo obrigatório(*) nome não válido",
      invalid: true,
      type: "text",
      required: true,
      isValid: (value) => {
        return min(value, 5);
      },
    },
    email: {
      name: "email",
      value: "",
      labelText: "E-mail",
      helperText: "Digite seu melhoras email",
      invalidText: "Campo obrigatório(*) ou email não válido",
      invalid: true,
      type: "email",
      required: true,
      isValid: (value) => {
        return isMail(value);
      },
    },
    password: {
      name: "password",
      value: "",
      labelText: "Senha",
      helperText: "Digite uma boa senha",
      invalidText: "Campo obrigatório(*)",
      invalid: true,
      type: "password",
      required: true,
      isValid: (value) => {
        return min(value, 6);
      },
    },
    passwordConfirmation: {
      name: "passwordConfirmation",
      value: "",
      labelText: "Confirme a senha",
      helperText: "Digite igual ao campo senha",
      invalidText: "Campo obrigatório(*)",
      invalid: true,
      type: "password",
      required: true,
      isValid: (value, valueCheck) => {
        return value === valueCheck;
      },
    },
  });

  const reset = () => {
    Object.keys(form).forEach((field) => {
      form[field].invalid = true;
      form[field].value = "";
    });
    setIsFormValid(false);
    setForm({ ...form });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name: form["name"].value,
      username: form["email"].value,
      password: form["password"].value,
    };

    try {
      const userDB = await User.create(newUser);
      userDB.id = userDB.id.toString();
      setItems([userDB, ...items]);
    } catch (error) {
      setError(error);
    }
  };

  const handleChangeField = (event) => {
    const currentName = event.target.name;
    form[currentName].value = event.target.value;

    if (currentName === "passwordConfirmation") {
      form[currentName].invalid = !form[currentName].isValid(
        form[currentName].value,
        form["password"].value
      );
    } else {
      form[currentName].invalid = !form[event.target.name].isValid(
        form[currentName].value
      );
    }

    let isValid = true;
    for (const name of Object.keys(form)) {
      if (form[name].invalid) {
        isValid = false;
      }
    }

    setIsFormValid(isValid);
    setForm({ ...form });
  };

  return (
    <Tile className="tile-card">
      <article>
        <header>
          <h2>Cadastro</h2>
        </header>
        <main>
          <AspectRatio as="article" ratio="16x9">
            <form onSubmit={handleSubmit} method="POST">
              <FormGroup legendText="">
                {Object.keys(form).map((field, index) => {
                  return (
                    <div key={index}>
                      <ComponentForm
                        field={form[field]}
                        handleChangeField={handleChangeField}
                      />

                      <br />
                    </div>
                  );
                })}
              </FormGroup>

              <ButtonSet className="button-set-actions">
                <Button size="xl" kind="secondary" onClick={reset}>
                  Limpar
                </Button>
                <Button size="xl" type="submit" disabled={!isFormValid}>
                  Cadastrar
                </Button>
              </ButtonSet>
            </form>
            {error && (
              <ToastNotification
                className="toast-notification"
                role="status"
                timeout={0}
                title={error}
              />
            )}
          </AspectRatio>
        </main>
      </article>
    </Tile>
  );
}
