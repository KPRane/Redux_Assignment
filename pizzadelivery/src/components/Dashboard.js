import React, { useEffect, useState } from 'react'
import { getPosts } from '../config/MyService'
import { connect } from "react-redux";
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from "react-redux";

function Dashboard(props) {
  const [postdata, setPostdata] = useState([])
  const [uid,setUid]=useState('')
  const cart = useSelector((state) => state.cartItems);
  console.log(cart);
  const dispatch = useDispatch();
 
  useEffect(()=>{
      
    if(localStorage.getItem('_token')!=undefined){
        let token=localStorage.getItem('_token');
        let decode=jwt_decode(token);
        console.log(decode)
        setUid(decode.uid)
        getPosts()
        .then(res=>{
            console.log(res.data);
            if(res.data.err==0){
                setPostdata(res.data.data);
            }
        })
    }
 },[])
  console.log(postdata)
  return (
    <div style={{backgroundColor:"#D7E9F7"}}>
    <div className="container">
      {/* {postdata[0].name} */}
     <p >WELCOME USER  :  {uid}</p>
      <div className=" row">
        {postdata.map((val, index) =>
          <div className=" container col-md-4">
            <div className="card" >
              <img src={val.image} className="card-img-top" alt="..." height="200px" />
              <div className="card-body">
                <h5 className="card-title">{val.name}</h5>
                <p className="card-text">Price:${val.price}</p>
                <a className="btn btn-dark" onClick={() =>
                  props.cart(
                    val._id,
                    val.image,
                    val.name,
                    val.price
                  )
                }>Add to cart</a>
              </div>
            </div>
          </div>)}

      </div></div>

    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};

const mapDispatchTopProps = (dispatch) => {
  return {
    cart: function (_id, image, name, price) {
      dispatch({
        type: "CART",
        payload: {
          id: _id,
          image: image,
          name: name,
          price: price
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchTopProps)(Dashboard);