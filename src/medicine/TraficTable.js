import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { putMedicinesTrafic } from "../httpRequest/Put";

import { SortAscendingOutlined, SortDescendingOutlined, UploadOutlined, DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import tw from "twin.macro";

import { GlobalFilter } from "../httpRequest/globalFilter";
import { getMedicines } from "../httpRequest/Get";

import { Popovers } from "../components/ux/PopOver"

import { Button, Modal } from "antd";
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



export function Trafic({products, setProducts}) {

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
                                                    style={{ marginRight: "1.15rem" }}
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
                                    putMedicinesTrafic(row.values.idMedicine, description, "approvisionemment", quantity, "replenishement");
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
                                                    style={{ marginRight: "1.15rem" }}
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
                                    putMedicinesTrafic(row.values.idMedicine, description, "export", quantity, "consumption");
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
