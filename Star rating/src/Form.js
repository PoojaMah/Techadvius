import React, {useEffect, useState} from "react";
import StarRating from "./starrating";

const StarRatingStatic = (props) => {
    return (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (props.rating) ? "on" : "off"}
                >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
      );
}

const Form = () => {
    const initialValues = {username:""};
    const [formValue, setFormValue] = useState(initialValues);
    const [starRating, setStarRating]  = useState(0);
    const [userInfo, setUserInfo] = useState([]);
    const [sortParam, setSortParam] = useState("Highest")
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
        };

    useEffect(() => {
        console.log("sort", sortParam)
        if (sortParam == "Highest") {
            userInfo.sort(function(x,y){return x["rating"]-y["rating"]});
        } else{
            userInfo.sort(function(x,y){return y["rating"]-x["rating"]});
        }
    }, [sortParam, userInfo])
    const handleCancel = (e) => {
    // e.preventDefault();
        setFormValue(initialValues);
        setStarRating(0)
        };

        const handleAdd = (e) => {
            const tempArr = [...userInfo];
            e.rating = starRating;
            tempArr.push(e);
            if (sortParam == "Highest") {
                tempArr.sort(function(x,y){return y["rating"]-x["rating"]});
                
            } else{
                tempArr.sort(function(x,y){return x["rating"]-y["rating"]});
            }
            setUserInfo(tempArr);
            setFormValue(initialValues);
        };
    return(
        <div className="container">
            <div className="max600px">
                <div className="row">
                    <label>User Name</label><br />
                    <input value={formValue.username} className="form-control" type="text" name="username" onChange={handleChange} />
                    <label> Star Rating</label>
                    <StarRating updateStarRating={(e) => setStarRating(e)} />
                </div>
                <div className="buttondiv">
                    <button className="btn btn-secondary button" onClick={() => handleCancel()}>Cancel</button>
                    <button className="btn btn-primary button" onClick={() =>handleAdd(formValue)}>Save</button>
                </div>
                { userInfo && userInfo.length !=0 && <div className="row rowhead">
                    <div className='col-sm-2 tabl'>Sort by:-</div>
                    <div onChange={(e) => setSortParam(e.target.value)}>
                        <input type="radio" value="Highest" name="gender" checked={sortParam == "Highest"} /> Highest rating first &nbsp;
                        <input type="radio" value="lowest" name="gender" /> Lowest rating first
                    </div>
                </div>}
                { userInfo && userInfo.map((e,i) => <div key={i} className="row rowdata">
                    
                    <div className='col-sm-4'>{e.username}</div>
                    <div className='col-sm-8'><StarRatingStatic rating={e.rating} /> </div>
                </div>)}
            </div>
        </div>
    )
}

export default Form;