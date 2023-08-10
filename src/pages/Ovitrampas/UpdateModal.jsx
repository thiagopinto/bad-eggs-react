import { useState } from "react";
import { Edit } from "@carbon/icons-react";
import { FormGroup, ToastNotification, Modal, IconButton } from "@carbon/react";
import Ovitrampa from "../../services/Ovitrampa";
import ComponentForm from "../../components/ComponentForm";
import SchemaForm from "./SchemaForm";

export default function UpdateModal({ row, saads, updateList }) {
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

    const ovitrampa = {
      id: row.id,
      saad_id: form["saad_id"].value,
      description: form["description"].value,
      address: form["address"].value,
      neighborhood: form["neighborhood"].value,
    };

    try {
      await Ovitrampa.update(ovitrampa);
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
      schema.saad_id.id = row.id;
      schema.saad_id.options = saads;
      schema.saad_id.value = row.saad_id;
      schema.saad_id.invalid = false;
      schema.description.id = row.id;
      schema.description.value = row.description;
      schema.description.invalid = false;
      schema.address.id = row.id;
      schema.address.value = row.address;
      schema.address.invalid = false;
      schema.neighborhood.id = row.id;
      schema.neighborhood.value = row.neighborhood;
      schema.neighborhood.invalid = false;
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
        modalHeading="Atualizar Ovitrampa"
        modalLabel="Atualizar"
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
