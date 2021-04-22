import React from "react"
import { useAuth0 } from "@auth0/auth0-react";
import Col from "../col/col"


const CommentsCard = (props) => {

    const { user } = useAuth0();

    // console.log(props)

    return (
<>
<Col className="col-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.userName}</h5>
                    {user.sub===props.id?<button onClick={props.onClick}>{'\u270E'}</button>:null}
                    {user.sub===props.id?<button id={props._id} onClick={props.onClick2} >{'\u2715'}</button>:null}
                </div>
            </div>
</Col>
<Col className="col-10">
<div className="card">
                <form className="card-body" onSubmit={props.onSubmit}>
                    <p>{props.date.split('T')[0]}</p>
                    <input type="text" id={props._id}placeholder={props.body}  disabled></input>
                    <button type="submit" className="editButton">OK</button>

                </form>
            </div>
</Col>
</>

    )
}

export default CommentsCard

