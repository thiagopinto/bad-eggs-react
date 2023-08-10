import { useParams } from "react-router-dom";
import { useState } from "react";
import Form from "./Form";
import List from "./List";
import { Row, Column, FlexGrid, Button } from "@carbon/react";

export default function index() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sizeColumn, setSizeColumn] = useState({ sm: 4, md: 8, lg: 16 });
  let { ovitrampaId } = useParams();

  const handlerShowForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setSizeColumn({ sm: 4, md: 8, lg: 16 });
    } else {
      setSizeColumn({ sm: 4, md: 5, lg: 10 });
    }
  };

  return (
    <>
      <FlexGrid fullWidth>
        <Row>
          <Column sm={4} md={3} lg={6}>
            <Button onClick={handlerShowForm}>Cadastar</Button>
          </Column>
        </Row>
      </FlexGrid>
      <FlexGrid fullWidth>
        <Row>
          {showForm && (
            <Column sm={4} md={3} lg={6} className="animate-show">
              <Form
                items={items}
                setItems={setItems}
                closeForm={handlerShowForm}
                ovitrampaId={ovitrampaId}
              />
            </Column>
          )}
          <Column sm={sizeColumn.sm} md={sizeColumn.md} lg={sizeColumn.lg}>
            <List items={items} setItems={setItems} ovitrampaId={ovitrampaId} />
          </Column>
        </Row>
      </FlexGrid>
    </>
  );
}
