import { useState } from "react";
import { Edit } from "@carbon/icons-react";
import { FormGroup, ToastNotification, Modal, IconButton } from "@carbon/react";
import Cycle from "../../../services/Cycle";
import ComponentForm from "../../../components/ComponentForm";
import SchemaForm from "./SchemaForm";
import { stringToDate } from "../../../utils/";

export default function UpdateModal({ row, updateList }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
  const [error, setError] = useState(null);

  //Resert Form
  const reset = () => {
    Object.keys(form).forEach((field) => {
      form[field].invalid = true;
      form[field].value = "";
    });
    setIsFormValid(false);
    setForm({ ...form });
  };

  //Submit event
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(row);
    const ovitrampa = {
      id: row.id,
      start: form["start"].value
        ? form["start"].value.toISOString().substring(0, 10)
        : null,
      end: form["end"].value
        ? form["end"].value.toISOString().substring(0, 10)
        : null,
    };

    try {
      await Cycle.update(ovitrampa);
      updateList();
      setOpen(false);
    } catch (error) {
      setError(error);
    }
    //
  };

  //Tratar evento change
  const handleChangeField = (event) => {
    const name = event.target.name;
    form[name].value = event.target.value;
    form[name].invalid = !form[event.target.name].isValid(form[name].value);
    let isValid = true;
    Object.keys(form).forEach(async (field) => {
      if (form[field].invalid) {
        isValid = false;
      }
    });
    setIsFormValid(isValid);
    setForm({ ...form });
  };

  const handleOpen = async () => {
    try {
      const schema = new SchemaForm();
      schema.start.id = row.id
      schema.start.value = row.start ? stringToDate(row.start) : null;
      schema.start.invalid = false;
      schema.end.id = row.id
      schema.end.value = row.end ? stringToDate(row.end) : null;
      schema.end.invalid = false;
      setForm({ ...schema });
    } catch (error) {
      setError(error);
    }
    setOpen(true);
  };

  return (
    <>
      <IconButton size="sm" label="Editar" onClick={() => handleOpen()}>
        <Edit />
      </IconButton>
      <Modal
        modalHeading="Atualizar Cyclo"
        modalLabel="Atualizar Cyclo"
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
