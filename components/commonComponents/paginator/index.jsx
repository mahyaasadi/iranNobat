import React from "react";
import FeatherIcon from "feather-icons-react";

const Paginator = ({ nPages, currentPage, setCurrentPage }) => {
    const maxPageNumbersDisplayed = 4; // adjust this number as per your need
    const middlePagesCount = 3;

    const startPage = Math.max(2, currentPage - Math.floor(middlePagesCount / 2));
    const endPage = Math.min(nPages - 1, currentPage + Math.floor(middlePagesCount / 2));

    let pageNumbers = [];

    if (nPages <= maxPageNumbersDisplayed) {
        pageNumbers = [...Array(nPages + 1).keys()].slice(1);
    } else {
        pageNumbers = [1];

        if (startPage > 2) pageNumbers.push('...');
        pageNumbers.push(...Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx));
        if (endPage < nPages - 1) pageNumbers.push('...');

        pageNumbers.push(nPages);
    }

    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="pagination d-flex flex-wrap items-center justify-center gap-3 mt-4 marginb-3">
            <button onClick={prevPage} className="paginateBtn">
                <FeatherIcon
                    icon="arrow-right"
                    style={{ width: "13px", color: "white" }}
                />
            </button>

            <div dir="rtl" className="d-flex flex-wrap justify-center gap-3">
                {pageNumbers.map((pgNumber, idx) => (
                    <button
                        key={idx}
                        onClick={() => typeof pgNumber === 'number' && setCurrentPage(pgNumber)}
                        className={`paginateBtn gap-2 ${currentPage === pgNumber ? "activePaginateBtn" : ""}`}
                    >
                        {pgNumber}
                    </button>
                ))}
            </div>

            <button onClick={nextPage} className="paginateBtn">
                <FeatherIcon
                    icon="arrow-left"
                    style={{ width: "13px", color: "white" }}
                />
            </button>
        </div>
    );
};

export default Paginator;