import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsAction";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

export default function Home() {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (pageNo) =>{

    setCurrentPage(pageNo)
   
}
  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }
    dispatch(getProducts(null,null,currentPage));
  }, [error, dispatch,currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product col={3} key={product._id} product={product} />
                ))}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-center mt-5">
              <ReactPaginate
                pageCount={Math.ceil(productsCount / resPerPage)}
                onPageChange={({ selected }) => setCurrentPageNo(selected + 1)}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                forcePage={currentPage - 1}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}
