
import React, { useState } from 'react'
import { login } from '../config/MyService'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
export default function Login() {
    const [state, setState] = useState({ email: '', password: '', name: '', age: '' });
    const handler = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value })
    }
    const History = useHistory();
    const postRegis = (event) => {
        event.preventDefault();
        login(state)
            .then(res => {
                console.log(res.data.msg)
                if (res.data.err == 0) {
                    localStorage.setItem("_token", res.data.token);
                    localStorage.setItem("userdetails", state.email);
                    History.push("/Dash")
                }
                if (res.data.err == 1) {
                    console.log(res.data)
                }
            })
    }
    return (
        <div style={{ backgroundColor: "#D7E9F7", height: "500px" }}>
            <br /><br />
            <div className="container  bg-light col-5" style={{ height: "400px" }}>
                <h1 className="text-center display-4 text-uppercase">Login</h1>
                <br /><br />
                <form method="post" onSubmit={postRegis}>
                    <div className="form-group">
                        <label> EMAIL</label>
                        <input type="email" name="email" className="form-control" onChange={handler} />
                    </div><br /><br />
                    <div className="form-group">
                        <label> PASSWORD</label>
                        <input type="password" name="password" className="form-control" onChange={handler} />
                    </div><br /><br />
                    <div className="row">
                        
                        <div className="col-6 text-center">
                        <input type="submit" value="LOGIN" className="btn btn-dark " />
                        </div> 
                        <div className="col-6 text-center">
                        <p className=" text-uppercase btn btn-dark"> <Link to="/Reg" style={{ "color": "white" ,textDecoration:"none"}}>Register </Link></p>
                        </div>

                    </div>
                </form><br /><br />
              
            </div>
        </div>

    )
}

