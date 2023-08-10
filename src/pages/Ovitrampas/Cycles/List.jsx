import { useEffect, useState } from "react";
import Cycle from "../../../services/Cycle";
import {
  Tile,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  ToastNotification,
  PaginationNav,
  IconButton,
  Loading,
} from "@carbon/react";
import { Image, TrashCan } from "@carbon/icons-react";
import UpdateModal from "./UpdateModal";
import { Link } from "react-router-dom";

let isCanceled = false;
export default function List({ items, setItems, ovitrampaId }) {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const size = 10;

  const handlerResponseList = async (list) => {
    setPage(list.page);
    setPages(list.pages);

    await list.items.forEach((item) => {
      item.id = item.id.toString();
      item.start = item.start
        ? new Date(`${item.start} 00:00:00`).toLocaleDateString("pt-BR")
        : null;
      item.end = item.end
        ? new Date(`${item.end} 00:00:00`).toLocaleDateString("pt-BR")
        : null;
    });

    return list.items;
  };

  useEffect(() => {
    if (!isCanceled) {
      isCanceled = true;
      try {
        Cycle.list({ size, ovitrampa_id: ovitrampaId }).then(async (list) => {
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
    Cycle.list({ size, page: p + 1, ovitrampa_id: ovitrampaId }).then(
      async (list) => {
        setItems(await handlerResponseList(list));
      }
    );
    setLoading(false);
  };

  const deleteImage = async (id) => {
    try {
      await Cycle.delete(id);
      setLoading(true);
      await handlerChangePage();
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const headers = [
    {
      key: "start",
      header: "Início",
    },
    {
      key: "end",
      header: "Fim",
    },
    {
      key: "eggs",
      header: "Ovos",
    },
  ];

  return (
    <Tile className="tile-card">
      <article>
        <header></header>
        <main>
          {loading && (
            <div className="loading">
              <Loading active={loading} withOverlay={false} />
            </div>
          )}
          {!loading && (
            <DataTable rows={items} headers={headers} locale="pt">
              {({
                rows,
                headers,
                getTableProps,
                getHeaderProps,
                getRowProps,
              }) => (
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header, index) => (
                        <TableHeader
                          key={index}
                          {...getHeaderProps({ header, isSortable: true })}
                        >
                          {header.header}
                        </TableHeader>
                      ))}
                      <TableHeader>Ações</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => {
                      return (
                        <TableRow
                          key={row.id}
                          {...getRowProps({ row })}
                          className="animate-show"
                        >
                          {row.cells.map((cell) => {
                            return (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            );
                          })}
                          <TableCell>
                            <div className="table-actions">
                              <UpdateModal
                                row={items[index]}
                                updateList={handlerChangePage}
                              />
                              <IconButton
                                label="Delete"
                                size="sm"
                                className="cds--btn--danger"
                                onClick={() => {
                                  deleteImage(row.id);
                                }}
                              >
                                <TrashCan />
                              </IconButton>
                              <IconButton
                                as={Link}
                                kind="tertiary"
                                size="sm"
                                label="Imagens"
                                to={`cycle/${row.id}`}
                              >
                                <Image />
                              </IconButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </DataTable>
          )}
        </main>
        <footer>
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
        </footer>
      </article>
      {error && (
        <ToastNotification
          className="toast-notification"
          role="status"
          timeout={0}
          title={error}
        />
      )}
    </Tile>
  );
}
