import React, { useContext, useEffect, useState } from "react";
import Style from "./AllOrders.module.css";
import { UserContext } from "../../Context/UserOrderContext";
import LoadingScreen from './../loadingScreen/loadingScreen';
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const [AllOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let { getUserOrder } = useContext(UserContext);
  const { id, name } = jwtDecode(localStorage.getItem("userToken"));

  async function getAllUserOrder(id) {
    setIsLoading(true);
    let response = await getUserOrder(id);
    setAllOrders(response);
    setIsLoading(false);
  }
                
  useEffect(() => {
    getAllUserOrder(id);
  }, []);


  return (
    <>
     <Helmet>
        <title>All Orders</title>
        <meta name="description" content="Cart Page" />
      </Helmet>
      <div className="container w-75 bg-main-light px-4 vh-100  overflow-y-scroll rounded-3 shadow py-2 my-4">
        {isLoading && <LoadingScreen />}
        <h2>
          hi, <span className="text-success">{name}</span>
        </h2>
        <h2 className="text-center mb-4">All Orders</h2>
        {AllOrders?.data?.map((ele, idx) => (
          <div key={idx} className="order shadow border p-3 rounded-2 mb-5">
            <div className="d-flex mb-3 justify-content-between">
              <h3 className="mb-3 h4">Order : {idx + 1}</h3>
              <h3 className="btn p-1 w-50 h6 btn-success">
                {" "}
                Total price : {ele.totalOrderPrice}
              </h3>
            </div>
            {ele.cartItems.map((item, idx) => (
              <ul key={idx}>
                <li className="row d-flex align-items-center pb-3 list-unstyled">
                    <div className="col-md-3 col-sm-4  ">
                      <img
                        src={item.product.imageCover}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className=" col-md-9 col-sm-8 ">
                      <h3 className="h5 mt-2 text-main">{item.product.title}</h3>
                      <p>Count: {item.count}</p>
                      <p>{item.price} EGP</p>
                    </div>
                  <hr className="border-bottom-green" />
                </li>
              </ul>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}