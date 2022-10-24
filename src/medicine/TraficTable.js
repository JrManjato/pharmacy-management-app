import axios from "axios";
import React, { useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { putMedicinesTrafic } from "../httpRequest/Put";
import Pagination from "../components/Pagination";

import { UploadOutlined, DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import tw from "twin.macro";

import { GlobalFilter } from "../httpRequest/globalFilter";

import { Button, Modal } from "antd";
import './table.css';
import pagination from "../components/Pagination";

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



export function Trafic() {
    const [products, setProducts] = useState([]);
    const [threshold, setThreshold] = useState(9999);
    const [page, setPage] = useState(1);
    const [nbrPerPage, setNbrPerPage] = useState(5);
    const [tes, setTes] = useState(1);

    const productsData = useMemo(() => [...products], [products]);

    var description = "";
    var quantity = 0;

    const forHeader = ['Id', 'Nom', 'Traitement', 'Quantité'];

    const { confirm } = Modal;

    const productsColumns = useMemo(
        () =>
            products[0]
                ? Object.keys(products[0])
                    .filter((key) => key !== "treatmentList" && key !== "admission")
                    .map((key, i) => {
                        if (key === "compartment") {
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
                id: "Appro",
                Header: "Approvisionner",
                Cell: ({ row }) => (
                    <DownloadOutlined
                        onClick={() => {
                            confirm({
                                title: "Approvisionnement",
                                icon: <ExclamationCircleOutlined />,
                                content: <>
                                    <form className="forms text-center">
                                        <div className="floating-form">
                                            <div className="floating-label">
                                                <span className="input__label">Description: </span>
                                                <input className="floating-input" type="text" onChange={(e) => description = e.target.value} />
                                            </div>
                                            <div className="floating-label">
                                                <span
                                                    className="input__label"
                                                >Quantité:</span>
                                                <input className="floating-input" type="text" onChange={(e) => quantity = e.target.value} />
                                            </div>
                                        </div>
                                    </form>
                                </>,
                                width: '30%',
                                okText: 'Approvisionner',
                                cancelText: 'Annuler',
                                width: 1000,
                                height: 600,
                                onOk() {
                                    putMedicinesTrafic(row.values.idMedicine, description, "approvisionemment", quantity, "replenishement", setTes, tes);
                                },

                                onCancel() {
                                    console.log('Cancel');
                                }
                            });
                        }
                        }
                    />
                ),
            },
            {
                id: "Export",
                Header: "Exporter",
                Cell: ({ row }) => (
                    <UploadOutlined
                        onClick={() => {
                            confirm({
                                title: "Exportation",
                                icon: <ExclamationCircleOutlined />,
                                content: <>
                                    <form className="forms text-center">
                                        <div className="floating-form">
                                            <div className="floating-label">
                                                <span className="input__label">Description: </span>
                                                <input className="floating-input" type="text" onChange={(e) => description = e.target.value} />
                                            </div>
                                            <div className="floating-label">
                                                <span
                                                    className="input__label"
                                                >Quantité:</span>
                                                <input className="floating-input" type="text" onChange={(e) => quantity = e.target.value} />
                                            </div>
                                        </div>
                                    </form>
                                </>,
                                width: '30%',
                                okText: 'Exporter',
                                cancelText: 'Annuler',
                                width: 1000,
                                height: 600,
                                onOk() {
                                    putMedicinesTrafic(row.values.idMedicine, description, "export", quantity, "consumption", setTes, tes);
                                },

                                onCancel() {
                                    console.log('Cancel');
                                }
                            });
                        }
                        }
                    />
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

    React.useEffect(() => {

        const abortController = new AbortController();

        axios
            .get("http://localhost:8080/medicines/" + threshold + "?pageNumber=" + page + "&pageSize=" + nbrPerPage,
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

    }, [page, nbrPerPage, threshold, tes]);


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
                    <div
                    >
                        <span>Quantité inférieur ou égal à:  <select name="number-page-option"
                            id=""
                            onChange={(e) => setThreshold(e.target.value)}
                        >
                            <option value="">---</option>
                            <option value="300">300</option>
                            <option value="200">200</option>
                            <option value="100">100</option>
                            <option value="0">0</option>
                        </select>
                        </span>
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
