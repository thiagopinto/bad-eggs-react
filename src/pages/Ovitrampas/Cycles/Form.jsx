import { useState } from "react";
import {
  FormGroup,
  Button,
  ButtonSet,
  Tile,
  ToastNotification,
  AspectRatio,
} from "@carbon/react";
import Cycle from "../../../services/Cycle";
import ComponentForm from "../../../components/ComponentForm";
import SchemaForm from "./SchemaForm";

export default function Form({ items, setItems, ovitrampaId, closeForm }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(new SchemaForm());

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
    const newCycle = {
      ovitrampa_id: ovitrampaId,
      start: form["start"].value
        ? form["start"].value.toISOString().substring(0, 10)
        : "",
      end: form["end"].value
        ? form["end"].value.toISOString().substring(0, 10)
        : null,
    };
    closeForm()
    try {
      const cycleDB = await Cycle.create(newCycle);
      cycleDB.id = cycleDB.id.toString();
      setItems([cycleDB, ...items]);
    } catch (error) {
      setError(error);
    }
  };

  const handleChangeField = (event) => {
    const currentName = event.target.name;
    form[currentName].value = event.target.value;

    form[currentName].invalid = !form[event.target.name].isValid(
      form[currentName].value
    );

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
          <h2>Cadastro: </h2>
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
        <footer></footer>
      </article>
    </Tile>
  );
}
