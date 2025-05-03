import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsAction";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.productsState
  );
  console.log(products);
  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    } 
    dispatch(getProducts);
  }, [error]);

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
                products.map((product) => <Product product={product} />)}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
