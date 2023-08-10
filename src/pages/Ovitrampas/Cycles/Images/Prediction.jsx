import { useParams } from "react-router-dom";
import Image from "../../../../services/Image";
import { useState, useEffect } from "react";
import {
  Tile,
  Row,
  Column,
  FlexGrid,
  Loading,
  Modal,
  ToastNotification,
  Button,
} from "@carbon/react";
let isCanceled = false;

export default function Prediction() {
  const [images, setImages] = useState([]);
  const [imageOrigin, setImageOrigin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectOriginal, setSelectOriginal] = useState("");
  let { ImageId } = useParams();
  useEffect(() => {
    if (!isCanceled) {
      isCanceled = true;
      setLoading(true);
      try {
        Image.show(ImageId).then(async (item) => {
          setImages(item.segments);
          setImageOrigin(item);
        });
      } catch (error) {
        setError(error);
      }
    }
    setLoading(false);
    return () => {
      isCanceled = false;
    };
  }, []);
  return (
    <FlexGrid fullWidth>
      <Row>
        {loading && (
          <Column sm={4} md={2} lg={4}>
            <div className="loading">
              <Loading active={loading} withOverlay={false} />
            </div>
          </Column>
        )}
        {!loading && (
          <>
            <Row className="mt-1">
              {images.map((item, index) => {
                return (
                  <Column key={index} sm={4} md={2} lg={4}>
                    <Tile>
                      <article>
                        <main className="cds--aspect-ratio cds--aspect-ratio--1x1">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectOriginal(item);
                              setOpen(true);
                            }}
                            href="#"
                          >
                            <img
                              className="thumbnail"
                              src={`${process.env.API_URL}/storage/predict/${imageOrigin.file_name}/${item.file_name}`}
                              alt="preticted image"
                            />
                          </a>
                        </main>
                      </article>
                    </Tile>
                  </Column>
                );
              })}
            </Row>
            {open && (
              <Modal
                modalHeading="Imagem"
                modalLabel="Imagem Original"
                size="lg"
                passiveModal={true}
                open={open}
                onRequestClose={() => {
                  setOpen(false);
                  setSelectOriginal("");
                }}
              >
                <Tile className="tile-card">
                  <main>
                    <figure>
                      <img
                        className="responsive"
                        src={`${process.env.API_URL}/storage/predict/${imageOrigin.file_name}/${selectOriginal.file_name}`}
                        alt="preticted image"
                      />
                    </figure>
                  </main>
                </Tile>
              </Modal>
            )}
            {error && (
              <ToastNotification
                className="toast-notification"
                role="status"
                timeout={0}
                title={error}
              />
            )}
          </>
        )}
      </Row>
    </FlexGrid>
  );
}
