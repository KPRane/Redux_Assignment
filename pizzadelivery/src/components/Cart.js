import { connect } from "react-redux";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";



const Cart = (props) => {
  const cart = useSelector((state) => state.cartItems);
  console.log(cart);
  // const dispatch = useDispatch();
  const newState = JSON.stringify(cart);
  console.log(newState)
  localStorage.setItem("LState", newState);
  const LState = localStorage.getItem("LState");
  console.log(newState);
  const [card, setCard] = useState('')

  const handler = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    setCard(e.target.value)

  }
  const addorder = (e) => {
    e.preventDefault();
    console.log("http://localhost:8000/api/addorder");
    axios.post("http://localhost:8000/api/addorder", {
      // name:name.toString(),
      // mobile:mobile.toString(),
      // id:Math.floor(Math.random()*100)
      cart: cart,
      card: card,
      user: localStorage.getItem("userdetails")
    })
      .then(res => {
        console.log(cart)
      })
    alert("Order Completed")
  }
  let total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }

  console.log(cart[0])
  return (
    <div style={{backgroundColor:"#D7E9F7"}}>
    <div className="container "  >
      <h2 className="display-6">CART ITEMS</h2>


      <form method="post" >
        <div className="container  row ">
          {cart == "" ? <h4 className="display-6">NO ITEMS IS THERE</h4> : cart.map((val, index) =>
            <div className="col-lg-6">
              <div className="card" >
                <img src={val.image} className="card-img-top" alt="..." height="200px" />
                <div className="card-body">
                  <h5 className="card-title" name="name">{val.name}</h5>
                  <p className="card-text" name="price"> Price:{val.price}</p>

                </div>
              </div>
            </div>)}
         

        </div>
      </form>
<br/><br/>
      <div className="container card col-6 bg-light" >
        <br/>
        <div className="row">
          <div className="col-6"><h5>TOTAL:</h5>
          </div>
          <div className="col-6"><h5>{total}</h5>
          </div>
        </div><br/>

        <div className="row">
          <div className="col-6">
            <input type="text" className="form-control" placeholder="Enter Credit card details" onChange={handler} aria-label="default input example" />
          </div>
          <div className="col-6">
            <button type="submit" class="btn btn-dark" onClick={addorder}>CHECKOUT</button>
          </div>  </div>
        <div><br/>
          <div className="row">
            <div className="col-6"><h5>CLEAR CART DATA:</h5>
            </div>
            <div className="col-6">
              <a href="#" className="btn btn-dark "
                onClick={() => props.remove()}>CLEAR </a>
            </div>
          </div><br/>

        </div>
      </div>

      <br/><br/><br/><br/>

    </div></div>
  );
};

const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};
const mapDispatchTopProps = (dispatch) => {
  return {
    remove: function () {
      dispatch({
        type: "REMOVE",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchTopProps)(Cart);
