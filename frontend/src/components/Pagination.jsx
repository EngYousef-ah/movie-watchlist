
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center gap-4 mt-10 pb-10">
            <button
                className="px-4 py-2 bg-[#f0503d] hover:bg-[#c23222] rounded disabled:opacity-50 text-white transition-all duration-300"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            <span className="text-white font-bold">Page {currentPage} of {totalPages}</span>

            <button
                className="px-4 py-2 bg-[#f0503d] hover:bg-[#c23222] rounded disabled:opacity-50 text-white transition-all duration-300"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;