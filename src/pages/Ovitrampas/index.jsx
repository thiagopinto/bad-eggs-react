import { useState, useEffect } from "react";
import Form from "./Form";
import List from "./List";
import {
  Row,
  Column,
  FlexGrid,
  Button,
  ToastNotification,
} from "@carbon/react";
import Saad from "../../services/Saad";
let isCanceledSaaad = false;

export default function index() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sizeColumn, setSizeColumn] = useState({ sm: 4, md: 8, lg: 16 });
  const [saads, setSaads] = useState([]);
  const [error, setError] = useState(null);

  const handlerShowForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setSizeColumn({ sm: 4, md: 8, lg: 16 });
    } else {
      setSizeColumn({ sm: 4, md: 5, lg: 10 });
    }
  };

  useEffect(() => {
    if (!isCanceledSaaad) {
      isCanceledSaaad = true;
      try {
        Saad.list().then(async (list) => {
          await list.forEach((item) => {
            item.id = item.id.toString();
          });
          setSaads(list);
        });
      } catch (error) {
        setError(error);
      }
    }
    return () => {
      isCanceledSaaad = false;
    };
  }, []);

  return (
    <>
      {error && (
        <ToastNotification
          className="toast-notification"
          role="status"
          timeout={0}
          title={error}
        />
      )}
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
                saads={saads}
              />
            </Column>
          )}
          <Column sm={sizeColumn.sm} md={sizeColumn.md} lg={sizeColumn.lg}>
            <List items={items} setItems={setItems} saads={saads} />
          </Column>
        </Row>
      </FlexGrid>
    </>
  );
}
