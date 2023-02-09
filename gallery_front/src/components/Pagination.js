import React from "react";

const Pagination = ({ totalPages, pageNumber, setPageNumber }) => {
  const pages = new Array(totalPages).fill(null).map((x, i) => i);

  const goToPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const goToNext = () => {
    setPageNumber(Math.min(totalPages - 1, pageNumber + 1));
  };
  return (
    <div>
      <button onClick={goToPrevious} className="btn btn-dark">
        Previous
      </button>
      {pages.map((pageIndex) => (
        <button
          onClick={() => setPageNumber(pageIndex)}
          key={pageIndex}
          className="btn btn-dark"
        >
          {pageIndex + 1}
        </button>
      ))}
      <button onClick={goToNext} className="btn btn-dark">
        Next
      </button>
    </div>
  );
};

export default Pagination;
