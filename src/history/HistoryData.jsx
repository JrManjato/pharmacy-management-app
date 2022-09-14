import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";

import { SortAscendingOutlined, SortDescendingOutlined, DeleteOutlined } from '@ant-design/icons';
import tw from "twin.macro";

import { GlobalFilter } from "../httpRequest/globalFilter";
import { getHistories } from "../httpRequest/Get";
import { showConfirm } from '../components/ux/DeleteConfirm'

import { Button } from "antd";

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
                "history"
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

  useEffect(() => {
    getHistories(setProducts);
  }, []);

  const isEven = (idx) => idx % 2 === 0;

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
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
    </>
  );
}


// "Êtes-vous sûr de vouloir supprimer cet élément ?",
//               [row.values.medicine.medicineName, row.values.operation, new Date(row.values.operationDateTime)],
//               row.values.idHistory,
//               "history"