import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";

import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import tw from "twin.macro";

import { GlobalFilter } from "../httpRequest/globalFilter";
import { getMedicines } from "../httpRequest/Get";

import { Popovers } from "../components/ux/PopOver"

import { Button } from "antd";
import './table.css';

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



export function Products({products, setProducts}) {
  
  const productsData = useMemo(() => [...products], [products]);

  const forHeader = ['Id', 'Nom', 'Traitement', 'Admission', 'Compartiment', 'Quantité'];

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
          .map((key, i) => {
            if (key === "treatmentList") {
              return {
                Header: "Traitement",
                accessor: key,
                Cell: ({ value }) => <ul>{value.map((elt) => <li key={elt?.idTreatment}>{elt?.treatmentName}</li>)}</ul>
              }
            }
            else if (key === "admission") {
              return {
                Header: "Admission",
                accessor: key,
                Cell: ({ value }) => <span>{value?.["admissionName"]}</span>
              }
            }
            else if (key === "compartment") {
              return {
                Header: "Compartiment",
                accessor: key,
                Cell: ({ value }) => <span>{value?.["compartmentName"]}</span>
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
        id: "Edit",
        Header: "",
        Cell: ({ row }) => (
          <Popovers row={row} setProducts={setProducts} />
        ),
      }
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
    getMedicines(setProducts);
  }, []);

  const isEven = (idx) => idx % 2 === 0;

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <Table {...getTableProps()} className="table table-striped table-sm" style={{ margin: "auto" }}>
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
    </>
  );
}
