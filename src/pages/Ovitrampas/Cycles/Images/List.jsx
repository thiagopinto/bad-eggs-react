import { useState, useEffect } from "react";
import Image from "../../../../services/Image";
import {
  Tile,
  Row,
  Column,
  FlexGrid,
  Loading,
  // Modal,
  ToastNotification,
  IconButton,
  PaginationNav,
} from "@carbon/react";
import { TrashCan, View } from "@carbon/icons-react";
let isCanceled = false;
import { Link } from "react-router-dom";
import Overlay from "./Overlay";
export default function List({ items, setItems, cycleId }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [open, setOpen] = useState(false);
  const [selectImagem, setSelectImagem] = useState(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const size = 10;

  const handlerResponseList = async (list) => {
    setPage(list.page);
    setPages(list.pages);

    await list.items.forEach((item) => {
      item.id = item.id.toString();
    });
    return list.items;
  };

  useEffect(() => {
    if (!isCanceled) {
      isCanceled = true;
      setLoading(true);
      try {
        Image.list({ size, cycle_id: cycleId }).then(async (list) => {
          setItems(await handlerResponseList(list));
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

  const handlerChangePage = (p = page - 1) => {
    setLoading(true);
    Image.list({ size, page: p + 1, cycle_id: cycleId }).then(async (list) => {
      setItems(await handlerResponseList(list));
    });
    setLoading(false);
  };

  const deleteImage = async (id) => {
    try {
      await Image.delete(id);
      setLoading(true);
      await handlerChangePage();
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <FlexGrid fullWidth>
      <Row>
        <Column>
          {pages > 1 && (
            <PaginationNav
              page={page - 1}
              itemsShown={4}
              totalItems={pages}
              onChange={(p) => {
                handlerChangePage(p);
              }}
            />
          )}
        </Column>
      </Row>
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
              {items.map((item) => {
                return (
                  <Column key={item.id} sm={4} md={2} lg={4}>
                    <Tile>
                      <article>
                        <main>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectImagem(item);
                              toggleOverlay();
                            }}
                            href="#"
                          >
                            <img
                              className="responsive"
                              src={`${process.env.API_URL}${item.thumbnail}`}
                              alt="train"
                            />
                          </a>
                        </main>
                        <footer className="between">
                          <IconButton
                            as={Link}
                            to={`prediction/${item.id}`}
                            size="sm"
                            label="Predição"
                          >
                            <View />
                          </IconButton>
                          <span>Ovos: {item.eggs}</span>
                          <IconButton
                            label="Delete"
                            size="sm"
                            className="cds--btn--danger"
                            onClick={() => {
                              deleteImage(item.id);
                            }}
                          >
                            <TrashCan />
                          </IconButton>
                        </footer>
                      </article>
                    </Tile>
                  </Column>
                );
              })}
            </Row>

            {showOverlay && <Overlay toggleOverlay={toggleOverlay} selectImagem={selectImagem} />}

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

/*             
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
                        src={`${process.env.API_URL}${selectOriginal}`}
                        alt="train"
                      />
                    </figure>
                  </main>
                </Tile>
              </Modal>
            )} */
