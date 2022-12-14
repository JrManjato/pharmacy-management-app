import axios from "axios";
import React, { useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";

import { DeleteOutlined } from '@ant-design/icons';
import tw from "twin.macro";

import { GlobalFilter } from "../httpRequest/globalFilter";
import { showConfirm } from '../components/ux/DeleteConfirm'

import { Button } from "antd";
import Pagination from "../components/Pagination";

const Table = tw.table`

`;

const TableHead = tw.thead`
 
`;

const TableRow = tw.tr`

`;

const TableHeader = tw.th`
`;

const TableBody = tw.tbody`

`;

const TableData = tw.td`
`;


export function HistoryTable() {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [nbrPerPage, setNbrPerPage] = useState(5);
  const [tes, setTes] = useState(10);

  const productsData = useMemo(() => [...products], [products]);

  const forHeader = ['Id', 'Description', 'Opération', 'Date', 'Quantité'];

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
          .map((key, i) => {
            if (key === "description") {
              return {
                Header: "Déscription",
                accessor: key,
                Cell: ({ value }) => value != null ? <span>{value}</span> : <span>vide</span>
              }
            }
            else if (key === "medicine") {
              return {
                Header: "Médicament",
                accessor: key,
                Cell: ({ value }) => <span>{value["medicineName"]}</span>
              }
            }
            else if (key === "operationDateTime") {
              return {
                Header: "Date",
                accessor: key,
                Cell: ({ value }) => <span>{new Date(value).toLocaleDateString()}</span>
              }
            }
            return { Header: forHeader[i], accessor: key };
          })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Effacer",
        Header: "Effacer",
        Cell: ({ row }) => (
          <DeleteOutlined
            onClick={() =>
              showConfirm(
                <h4 style={{ fontSize: "1rem" }}>Êtes-vous sûr de vouloir supprimer cet élément ?</h4>,
                <>
                  <p>Médicament: <span>{row.values.medicine.medicineName}</span></p>
                  <p>Opération: <span>{row.values.operation}</span></p>
                  <p>Date: <span>{new Date(row.values.operationDateTime).toUTCString()}</span></p>
                </>,
                row.values.idHistory,
                "history",
                setTes,
                tes
              )}
            style={{ fontSize: '16px', color: 'red' }}
            theme="outlined"
          />
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  React.useEffect(() => {

    const abortController = new AbortController();

    axios
      .get("http://localhost:8080/histories?pageNumber=" + page + "&pageSize=" + nbrPerPage,
        { signal: abortController.signal, }
      )
      .then((response) => {
        setProducts(response?.data)
      })
      .catch((error) => {
        console.log('Error', error);
      })
    return () => {
      abortController.abort();
    }

  }, [tes, nbrPerPage, page]);



  const isEven = (idx) => idx % 2 === 0;

  return (
    <>
      <div className="table-header">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
        <div>
          <span>Nombre par page: </span>
          <select name="number-page-option"
            id=""
            onChange={(e) => setNbrPerPage(e.target.value)}
          >
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
      <Table {...getTableProps()} className="table table-striped table-sm">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} className="table_header">
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="table_header_cell"
                >
                  <span className="header_title">
                    {column.render("Header")}
                  </span>
                  {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : " ▼"}
                  {/* {column.isSorted ? (column.isSortedDesc ? <SortAscendingOutlined /> : <SortDescendingOutlined />) : <SortDescendingOutlined />} */}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);

            return (
              <TableRow
                {...row.getRowProps()}
                className="table_row"
                style={isEven(idx) ? { backgroundColor: "" } : null}
              >
                {row.cells.map((cell, idx) => (
                  <TableData {...cell.getCellProps()} className="table_cell">
                    {cell.render("Cell")}
                  </TableData>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination page={page} setPage={setPage} />
    </>
  );
}