import { useState } from "react";
import {
  FormGroup,
  Button,
  ButtonSet,
  Tile,
  ToastNotification,
  AspectRatio,
  FileUploader,
} from "@carbon/react";
import Image from "../../../../services/Image";

export default function Form({ items, setItems, cycleId, handlerShowForm }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("edit");

  const reset = () => {
    handlerShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("uploading");
    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.append("cycle_id", cycleId);
      const ImagesDB = await Image.create(formData);

      await ImagesDB.forEach((ImageDB) => {
        ImageDB.id = ImageDB.id.toString();
      });

      setItems([...ImagesDB, ...items]);
      handlerShowForm(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleChangeField = () => {
    const form = document.querySelector("#upload-files");
    const inputs = form.querySelectorAll("input");
    if (inputs[0].files.length > 0) {
      setIsFormValid(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <Tile className="tile-card">
        <article>
          <header>
            <h2>Upload: </h2>
          </header>
          <main>
            <AspectRatio as="article" ratio="16x9">
              <FormGroup legendText="">
                <FileUploader
                  id="upload-files"
                  labelTitle="Upload de arquivos"
                  labelDescription="O tamanho máximo do arquivo é de 500 MB. Somente arquivos .jpg e .png são suportados."
                  buttonLabel="Adicionar arquivo"
                  buttonKind="primary"
                  size="md"
                  filenameStatus={status}
                  accept={[".jpg", ".png"]}
                  multiple={true}
                  disabled={false}
                  iconDescription="Delete file"
                  name="files"
                  onChange={handleChangeField}
                />
              </FormGroup>
              <ButtonSet className="button-set-actions">
                <Button size="xl" kind="secondary" onClick={reset}>
                  Limpar
                </Button>
                <Button size="xl" type="submit" disabled={!isFormValid}>
                  Enviar
                </Button>
              </ButtonSet>
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
    </form>
  );
}
