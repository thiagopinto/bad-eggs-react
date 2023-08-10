import { useState, useEffect } from "react";
import { Row, Column, Tile, Form, Button } from "@carbon/react";
import { ImageWithZoom } from "pure-react-carousel";
import ComponentForm from "../../../../components/ComponentForm";
import SchemaForm from "./SchemaForm";
import Segment from "../../../../services/Segment";

export default function UpdateModal({
  children,
  selectImagem,
  segment,
  handlerClickClose,
}) {
  const [form, setForm] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      const schema = new SchemaForm();
      schema.eggs.id = segment.id;
      schema.eggs.value = segment.eggs;
      schema.eggs.invalid = false;
      schema.bad_eggs.id = segment.id;
      schema.bad_eggs.value = segment.bad_eggs;
      schema.bad_eggs.invalid = false;
      schema.false_positive.id = segment.id;
      schema.false_positive.value = segment.false_positive;
      schema.false_negative.invalid = false;
      schema.false_negative.id = segment.id;
      schema.false_negative.value = segment.false_negative;
      schema.false_negative.invalid = false;
      setForm({ ...schema });
    } catch (error) {
      setError(error);
    }
  }, [segment]);

  const handleChangeField = (event) => {
    const name = event.target.name;
    console.log(segment);

    form[name].value =
    form[name].type == "checkbox" ? !form[name].value : event.target.value;
    form[name].invalid = !form[event.target.name].isValid(form[name].value);
    let isValid = true;

    Object.keys(form).forEach(async (field) => {
      if (form[field].invalid) {
        isValid = false;
      }
    });
    setIsFormValid(isValid);
    console.log(form);
    setForm({ ...form });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ovitrampa = {
      id: segment.id,
      eggs: form["eggs"].value,
      bad_eggs: form["bad_eggs"].value,
      false_positive: form["false_positive"].value,
      false_negative: form["false_negative"].value,
    };

    try {
      await Segment.update(ovitrampa);
    } catch (error) {
      setError(error);
    }
    //
  };
  return (
    <Tile className="tile-card">
      {children}
      <article>
        <header>
          <Row>
            <Column>
              <Form
                onSubmit={handleSubmit}
                method="POST"
                className="form-slider"
              >
                <Row>
                  {Object.keys(form).map((field, index) => {
                    return (
                      <Column key={index}>
                        <ComponentForm
                          field={form[field]}
                          handleChangeField={handleChangeField}
                        />

                        <br />
                      </Column>
                    );
                  })}
                  <Column>
                    <Button type="submit" disabled={!isFormValid}>
                      Salvar
                    </Button>
                  </Column>
                </Row>
              </Form>
            </Column>
          </Row>
        </header>
        <main>
          <Row>
            <Column>
              <Tile>
                <article>
                  <header>
                    <h2>Original:</h2>
                  </header>
                  <main>
                    <figure>
                      <img
                        className="responsive"
                        src={`${process.env.API_URL}/storage/processed/${selectImagem.file_name}/${segment.file_name}`}
                        alt="train"
                      />
                    </figure>
                  </main>
                </article>
              </Tile>
            </Column>
            <Column>
              <Tile>
                <article>
                  <header>
                    <h2>Predições:</h2>
                  </header>
                  <main>
                    <figure>
                      <img
                        className="responsive"
                        src={`${process.env.API_URL}/storage/predict/${selectImagem.file_name}/${segment.file_name}`}
                        alt="train"
                      />
                    </figure>
                  </main>
                </article>
              </Tile>
            </Column>
          </Row>
        </main>
      </article>
    </Tile>
  );
}
