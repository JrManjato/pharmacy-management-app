import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { SortAscendingOutlined, SortDescendingOutlined} from '@ant-design/icons';
import tw from "twin.macro";
import { GlobalFilter } from "./globalFilter";
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


export function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => console.log(err));

    if (response) {
      const products = response.data;

      console.log("Products: ", products);
      console.log("Products[0]: ", products[0]);
      setProducts(products);
    }
  };

  const productsData = useMemo(() => [...products], [products]);

  const sousObjet = ['rate', 'count'];
  const forHeader = ['Id', 'Titre', 'Prix', 'Déscription', 'Catégorie'];

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
          .map((key, i) => {
            if (key === "image") {
              return {
                Header: key,
                accessor: key,
                Cell: ({ value }) => <img src={value} alt="" width='50px' />
              }
            } else if (key === "rating") {
              return {
                Header: key,
                accessor: key,
                Cell: ({ value }) => <ul>{sousObjet.map((elt, i) => <li key={i++}>{value[elt]}</li>)}</ul>
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
        Header: "Edit",
        Cell: ({ row }) => (
          <Button onClick={() => alert("Editing: " + row.values.price)}>
            Edit
          </Button>
        ),
      },
      {
        id: "Add",
        Header: "Add",
        Cell: ({ row }) => (
          <Button 
          onClick={() => alert("Editing: " + row.values.rating.rate)}
          className="tag-badge"
          >
            Add
          </Button>
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
    fetchProducts();
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
                  {column.isSorted ? (column.isSortedDesc ? <SortAscendingOutlined /> : <SortDescendingOutlined />) : <SortDescendingOutlined />}
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
                style={isEven(idx) ? {backgroundColor:""} : null}
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
