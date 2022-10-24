import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useGlobalFilter, useSortBy, useTable } from "react-table";

import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import tw from "twin.macro";

import { GlobalFilter } from "../httpRequest/globalFilter";
import { getMedicines } from "../httpRequest/Get";

import { Popovers } from "../components/ux/PopOver"

import { Button, Menu } from "antd";
import './table.css';
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



export function Products() {
  //Data
  const [products, setProducts] = useState([]);

  //List
  const [treatmentList, setTreatmentList] = useState([]);
  const [admissionList, setAdmissionList] = useState([]);

  //Filter
  const [treatmentFilter, setTreatmentFilter] = useState();
  const [admissionFilter, setAdmissionFilter] = useState();

  //Pageable
  const [page, setPage] = useState(1);
  const [nbrPerPage, setNbrPerPage] = useState(5);
  const [tes, setTes] = useState(1);

  const getTreatments = async () => {
    const response = await axios
      .get("http://localhost:8080/treatment-list")
      .catch((err) => console.log(err));

    if (response) {
      const traitementNameList = response.data;
      traitementNameList.unshift({
        "idTreatment": 0,
        "treatmentName": "Tout"
      });
      setTreatmentList(traitementNameList);
    }
  };

  const getAdmission = async () => {
    const response = await axios
      .get("http://localhost:8080/admissions")
      .catch((err) => console.log(err));

    if (response) {
      const admissionNameList = response.data;
      admissionNameList.unshift({
        "idAdmission": 0,
        "admissionName": "Tout"
      });
      setAdmissionList(admissionNameList);
    }
  };

  const getMedicinesByFilter = async () => {

    let treatmentFilterUrl = "http://localhost:8080/medicines?pageNumber=" + page + "&pageSize=" + nbrPerPage;

    if ((treatmentFilter == null || treatmentFilter == "Tout") && (admissionFilter == null || admissionFilter == "Tout")) {
      treatmentFilterUrl = "http://localhost:8080/medicines?pageNumber=" + page + "&pageSize=" + nbrPerPage;
    } else if (treatmentFilter != null && admissionFilter == null || admissionFilter == "Tout") {
      treatmentFilterUrl = "http://localhost:8080/medicines?treatmentName=" + treatmentFilter + "&pageNumber=" + page + "&pageSize=" + nbrPerPage;
    } else if (admissionFilter != null && treatmentFilter == null || treatmentFilter == "Tout") {
      treatmentFilterUrl = "http://localhost:8080/medicines?admissionName=" + admissionFilter + "&pageNumber=" + page + "&pageSize=" + nbrPerPage;
    } else if (treatmentFilter && admissionFilter) {
      treatmentFilterUrl = "http://localhost:8080/medicines?treatmentName=" + treatmentFilter + "&admissionName=" + admissionFilter + "&pageNumber=" + page + "&pageSize=" + nbrPerPage;
    }

    const response = await axios
      .get(treatmentFilterUrl)
      .catch((err) => console.log(err));

    if (response) {
      const medicines = response.data;
      setProducts(medicines);
    }
  };


  useEffect(() => {
    getTreatments();
    getAdmission();
    getMedicinesByFilter();
  }, [treatmentFilter, admissionFilter, page, nbrPerPage, tes]);

  const handleChangeSelectAdmission = (e) => {
    setAdmissionFilter(e.currentTarget.value);
  }

  const handleChangeSelectTreatment = (e) => {
    setTreatmentFilter(e.currentTarget.value);
  }

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
          <Popovers row={row} setProducts={setProducts} setTes={setTes} tes={tes} />
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
      <div className="table-header">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />

        <div className="table-filter">
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

          <div>
            <select id="task-option" onChange={(e) => handleChangeSelectTreatment(e)}>
              {treatmentList.map((elt) => (
                <option key={`${elt.idTreatment}`} value={elt.treatmentName}>{elt.treatmentName}</option>
              ))}
            </select>
          </div>

          <div>
            <select id="task-option" onChange={(e) => handleChangeSelectAdmission(e)}>
              {admissionList.map((elt) => (
                <option key={`${elt.idAdmission}`} value={elt.admissionName}>{elt.admissionName}</option>
              ))}
            </select>
          </div>

          <div>
            <Button
              onClick={getMedicinesByFilter}
              style={{ color: "rgb(25, 152, 255)", border: "1px solid rgb(25, 152, 255)" }}
            >
              Filtrer
            </Button>
          </div>

          <div>
            <Menu theme="light" mode="inline">
              <Menu.Item key="6">
                <NavLink to="/ajout">
                  <Button
                    style={{ color: "green", border: "1px solid green" }}>
                    Ajouter
                  </Button>
                </NavLink>
              </Menu.Item>
            </Menu>
          </div>

        </div>
      </div>
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
      <Pagination page={page} setPage={setPage} />
    </>
  );
}
