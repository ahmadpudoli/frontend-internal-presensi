import ReactPaginate from 'react-paginate';

const PaginateCustom = (props: any) => {
    const { LastPage, CallbackSetPage }: any = props;

    return (
        <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={LastPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(ret: any) => {
                CallbackSetPage(ret.selected + 1);
            }}
            containerClassName={'pagination react-paginate justify-content-center'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            breakLinkClassName="page-link"
        />
    );
};

export default PaginateCustom;
