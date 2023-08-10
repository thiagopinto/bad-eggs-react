import { useState } from "react";
import {
  Row,
  Column,
  FlexGrid,
  FormGroup,
  TextInput,
  PasswordInput,
  Button,
  ButtonSet,
  Tile,
  ToastNotification,
  AspectRatio,
} from "@carbon/react";
import { min, isMail } from "../../helpers/validation";
import { useNavigate } from "react-router-dom";
import Auth from "../../services/Auth";
import { useAuthProvider } from "../../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [user, setUser] = useState({
    email: {
      value: "",
      labelText: "E-mail",
      helperText: "Digite seu melhoras email",
      invalidText: "Campo obrigatório(*) ou email não válido",
      invalid: false,
      type: "email",
      required: true,
      isValid: (value) => {
        return isMail(value);
      },
    },
    password: {
      value: "",
      labelText: "Senha",
      helperText: "Digite uma boa senha",
      invalidText: "Campo obrigatório(*)",
      invalid: false,
      type: "password",
      required: true,
      isValid: (value) => {
        return min(value, 6);
      },
    },
  });

  let { intevalRefresToken, setUserAuth, getUserAuth } = useAuthProvider();

  const reset = () => {
    Object.keys(user).forEach((field) => {
      user[field].invalid = true;
      user[field].value = "";
    });
    setIsFormValid(false);
    setUser({ ...user });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("username", user.email.value);
    formData.append("password", user.password.value);
    formData.append("client_id", process.env.CLIENT_ID);
    formData.append("client_secret", process.env.CLIENT_SECRET);

    try {
      await Auth.login(formData);
      if (intevalRefresToken !== null) {
        clearInterval(intevalRefresToken);
      }

      if (intevalRefresToken === null) {
        intevalRefresToken = setInterval(async () => {
          if (!(await Auth.refresh())) {
            clearInterval(intevalRefresToken);
            return;
          }
        }, 360000);
      }
      setUserAuth(getUserAuth());
      navigate("/");
    } catch (error) {
      console.log(
        "################################################################"
      );
      console.error(error);
      console.log(
        "################################################################"
      );
      setError(error);
    }
  };

  const handleChangeField = (event) => {
    const name = event.target.name;
    user[name].value = event.target.value;
    user[name].invalid = !user[event.target.name].isValid(user[name].value);

    let isValid = true;
    Object.keys(user).forEach((field) => {
      if (user[field].invalid) {
        isValid = false;
      }
    });
    setIsFormValid(isValid);
    setUser({ ...user });
  };

  return (
    <FlexGrid>
      <Row>
        <Column sm={4} md={{ span: 6, offset: 1 }} lg={{ span: 10, offset: 3 }}>
          <Tile>
            <AspectRatio as="article" ratio="16x9">
              <h2>Login</h2>
              <form onSubmit={handleSubmit} method="POST">
                <FormGroup legendText="">
                  <AspectRatio as="article" ratio="16x9">
                    {Object.keys(user).map((field, index) => {
                      return (
                        <div key={index}>
                          {user[field].type === "password" ? (
                            <PasswordInput
                              id={field}
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
                              id={field}
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
                  </AspectRatio>
                </FormGroup>
                <ButtonSet className="button-set-actions">
                <Button size="xl" kind="danger" onClick={reset}>
                    Limpar
                  </Button>
                  <Button size="xl" type="submit" disabled={!isFormValid}>
                    Login
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
          </Tile>
        </Column>
      </Row>
    </FlexGrid>
  );
}
