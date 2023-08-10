import { useState } from "react";
import { Edit } from "@carbon/icons-react";
import {
  FormGroup,
  TextInput,
  PasswordInput,
  ToastNotification,
  Modal,
  IconButton,
} from "@carbon/react";
import { min } from "../../helpers/validation";
import User from "../../services/User";

export default function UpdateModal({ row }) {
  let userRow = null;

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    password: {
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null);

  //Resert Form
  const reset = () => {
    Object.keys(user).forEach((field) => {
      user[field].invalid = true;
      user[field].value = "";
    });
    setIsFormValid(false);
    setUser({ ...user });
  };

  //Submit event
  const handleSubmit = async (event) => {
    event.preventDefault();
    userRow.password = user["password"].value;
    try {
      await User.update(userRow);
    } catch (error) {
      setError(error);
    }
    //
  };

  //Tratar evento change
  const handleChangeField = (event) => {
    const name = event.target.name;
    user[name].value = event.target.value;
    if (name === "passwordConfirmation") {
      user[name].invalid = !user[event.target.name].isValid(
        user[name].value,
        user["password"].value
      );
    } else {
      user[name].invalid = !user[event.target.name].isValid(user[name].value);
    }
    let isValid = true;
    Object.keys(user).forEach(async (field) => {
      if (user[field].invalid) {
        isValid = false;
      }
    });
    setIsFormValid(isValid);
    setUser({ ...user });
  };

  const handleOpen = () => {
    try {
      userRow = User.show(row.id);
    } catch (error) {
      setError(error);
    }
    setOpen(true)
  };

  return (
    <>
      <IconButton size="sm" label="Editar" onClick={() => handleOpen()}>
        <Edit />
      </IconButton>
      <Modal
        modalHeading="Reset Senha"
        modalLabel="Reset Senha"
        primaryButtonText="Salvar"
        secondaryButtonText="Limpar"
        open={open}
        onRequestClose={() => setOpen(false)}
        size="sm"
        primaryButtonDisabled={!isFormValid}
        onRequestSubmit={handleSubmit}
        onSecondarySubmit={reset}
      >
        <article>
          <main>
            <form onSubmit={handleSubmit} method="POST">
              <FormGroup legendText="">
                {Object.keys(user).map((field, index) => {
                  return (
                    <div key={index}>
                      {user[field].type === "password" ? (
                        <PasswordInput
                          id={`${field}-${row.id}`}
                          name={field}
                          type={user[field].type}
                          labelText={user[field].labelText}
                          helperText={user[field].helperText}
                          invalidText={user[field].invalidText}
                          invalid={user[field].invalid}
                          value={user[field].value}
                          onChange={handleChangeField}
                          required={user[field].required}
                        />
                      ) : (
                        <TextInput
                          id={`${field}-${row.id}`}
                          name={field}
                          type={user[field].type}
                          labelText={user[field].labelText}
                          helperText={user[field].helperText}
                          invalidText={user[field].invalidText}
                          invalid={user[field].invalid}
                          value={user[field].value}
                          onChange={handleChangeField}
                          required={user[field].required}
                        />
                      )}

                      <br />
                    </div>
                  );
                })}
              </FormGroup>
            </form>
            {error && (
              <ToastNotification
                className="toast-notification"
                role="status"
                timeout={0}
                title={error}
              />
            )}
          </main>
        </article>
      </Modal>
    </>
  );
}
