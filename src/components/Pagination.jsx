import React from 'react'
import { Button } from "antd";

export default function Pagination(Props) {
    const { page, setPage } = Props;
    return (
        <div className="pagination">
            <Button
                onClick={() => page >= 2 ? setPage(page - 1) : null}
                style={{ marginRight: ".5rem" }}
            >
                {'<'}
            </Button>
            <Button
                style={{ marginRight: ".5rem" }}
            >
                {page}
            </Button>
            <Button
                onClick={() => setPage(page + 1)}
            >
                {'>'}
            </Button>
        </div>
    )
}
