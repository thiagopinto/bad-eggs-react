import { useEffect, useState } from "react";
import User from "../../services/User";
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
} from "@carbon/react";
import { TrashCan } from "@carbon/icons-react";
import UpdateModal from "./UpdateModal";

let isCanceled = false;
export default function List({ items, setItems }) {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState(null);
  const size = 10;

  useEffect(() => {
    if (!isCanceled) {
      isCanceled = true;
      try {
        User.list({ size }).then(async (list) => {
          setPage(list.page);
          setPages(list.pages);
          await list.items.forEach((item) => {
            item.id = item.id.toString();
          });
          setItems(list.items);
        });
      } catch (error) {
        setError(error);
      }
    }
    return () => {
      isCanceled = false;
    };
  }, []);

  const handlerChangePage = (p = page - 1) => {
    User.list({ size, page: p + 1 }).then(async (list) => {
      setPage(list.page);
      setPages(list.pages);
      await list.items.forEach((item) => {
        item.id = item.id.toString();
      });
      setItems(list.items);
    });
  };

  const handlerDelete = async (id) => {
    try {
      User.delete(id).then(() => {
        User.list({ size, page }).then(async (list) => {
          setPage(list.page);
          setPages(list.pages);
          await list.items.forEach((item) => {
            item.id = item.id.toString();
          });
          setItems(list.items);
        });
      });
    } catch (error) {
      setError(error);
    }
  };

  const headers = [
    {
      key: "name",
      header: "Nome",
    },
    {
      key: "username",
      header: "E-mail",
    },
  ];

  return (
    <Tile className="tile-card">
      <article>
        <header></header>
        <main>
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
                  {rows.map((row) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                      <TableCell>
                        <div className="table-actions">
                          <UpdateModal row={row} />
                          <IconButton
                            kind="tertiary"
                            size="sm"
                            label="Deletar"
                            onClick={() => {
                              handlerDelete(row.id);
                            }}
                          >
                            <TrashCan />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
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
