import { useEffect, useState } from "react";
import Ovitrampa from "../../services/Ovitrampa";
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
import { Pause, Play, PartitionAuto } from "@carbon/icons-react";
import UpdateModal from "./UpdateModal";
import { Link } from "react-router-dom";


let isCanceled = false;
export default function List({ items, setItems, saads }) {
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
      item.saad = item.saad.name;
    });

    return list.items;
  };

  useEffect(() => {
    if (!isCanceled) {
      isCanceled = true;
      try {
        Ovitrampa.list({ size }).then(async (list) => {
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
    Ovitrampa.list({ size, page: p + 1 }).then(async (list) => {
      setItems(await handlerResponseList(list));
    });
    setLoading(false);
  };

  const handlerDisablend = async (id) => {
    try {
      setLoading(true);
      setItems([]);
      let ovitrampa = null;
      const list = [...items];
      await list.forEach((item) => {
        if (item.id == id) {
          item.disabled = !item.disabled;
          ovitrampa = { ...item };
        }
      });
      await Ovitrampa.update(ovitrampa);
      setItems(list);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const headers = [
    {
      key: "description",
      header: "Descrição",
    },
    {
      key: "address",
      header: "Endereço",
    },
    {
      key: "neighborhood",
      header: "Bairro",
    },
    {
      key: "saad",
      header: "SAAD",
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
            <DataTable rows={items} headers={headers}>
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
                      // console.log(row);
                      return (
                        <TableRow
                          key={row.id}
                          {...getRowProps({ row })}
                          className="animate-show"
                        >
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                          <TableCell>
                            <div className="table-actions">
                              <UpdateModal
                                row={items[index]}
                                saads={saads}
                                updateList={handlerChangePage}
                              />
                              <IconButton as={Link}
                                kind="tertiary"
                                size="sm"
                                label="Ciclos"
                                disabled={row.disabled}
                                to={`${row.id}`}
                              >
                                <PartitionAuto />
                              </IconButton>
                              {row.disabled ? (
                                <IconButton
                                  kind="tertiary"
                                  size="sm"
                                  label="Desabilitar"
                                  onClick={() => {
                                    handlerDisablend(row.id);
                                  }}
                                >
                                  <Play />
                                </IconButton>
                              ) : (
                                <IconButton
                                  kind="tertiary"
                                  size="sm"
                                  label="Desabilitar"
                                  onClick={() => {
                                    handlerDisablend(row.id);
                                  }}
                                >
                                  <Pause />
                                </IconButton>
                              )}
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
