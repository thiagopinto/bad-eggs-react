import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "./Form";
import FormMediaDevices from "./FormMediaDevices";
import List from "./List";
import {
  Row,
  Column,
  FlexGrid,
  Button,
  ButtonSet,
} from "@carbon/react";

export default function index() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormMediaDevices, setShowFormMediaDevices] = useState(false);
  const [sizeColumn, setSizeColumn] = useState({ sm: 4, md: 8, lg: 16 });
  let { cycleId } = useParams();



  const handlerShowForm = () => {
    setShowForm(!showForm);
    if (showFormMediaDevices) {
      setShowFormMediaDevices(!showFormMediaDevices);
    }
    if (showForm) {
      setSizeColumn({ sm: 4, md: 8, lg: 16 });
    } else {
      setSizeColumn({ sm: 4, md: 5, lg: 10 });
    }
  };
  const handlerShowFormMediaDevices = () => {
    setShowFormMediaDevices(!showFormMediaDevices);
    if (showForm) {
      setShowForm(!showForm);
    }
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
            <ButtonSet>
              <Button onClick={handlerShowForm} size={"sm"}>
                Upload
              </Button>
              <Button onClick={handlerShowFormMediaDevices} size={"sm"}>
                Captura
              </Button>
            </ButtonSet>
          </Column>
        </Row>
      </FlexGrid>
      {showFormMediaDevices && (
        <>
          <FormMediaDevices
            handlerShowForm={handlerShowForm}
            items={items}
            setItems={setItems}
            cycleId={cycleId}
          />
        </>
      )}
      <FlexGrid fullWidth>
        <Row>
          {showForm && (
            <Column sm={4} md={3} lg={6} className="animate-show">
              <Form
                handlerShowForm={handlerShowForm}
                items={items}
                setItems={setItems}
                cycleId={cycleId}
              />
            </Column>
          )}
          <Column sm={sizeColumn.sm} md={sizeColumn.md} lg={sizeColumn.lg}>
            <List items={items} setItems={setItems} cycleId={cycleId} />
          </Column>
        </Row>
      </FlexGrid>
    </>
  );
}
