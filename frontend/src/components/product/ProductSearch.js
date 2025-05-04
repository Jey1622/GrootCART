import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsAction";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

export default function ProductSearch() {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 100000]);
  const { keyword } = useParams();
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };
  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }
    dispatch(getProducts(price,keyword, currentPage));
  }, [error, dispatch, currentPage, keyword,price]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 id="products_heading">Search Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mb-5 mt-5">
                <div className="px-5">
                  <Slider
                    range={true}
                    marks={{
                      1: "₹1",
                      100000: "₹100000",
                    }}
                    min={1}
                    max={100000}
                    defaultValue={price}
                    onChangeComplete ={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`₹${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}> </div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Product col={4} key={product._id} product={product} />
                    ))}
                </div>
              </div>
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
