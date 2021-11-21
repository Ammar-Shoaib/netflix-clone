import { Link, useLocation } from "react-router-dom";
import "./list.css";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";
import storage from "../../firebase";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/apiCalls";

export default function List() {
    
    const location = useLocation()
    const list = location.list
    const { dispatch } = useContext(ListContext)

    const [lists, setLists] = useState(list)

    const handleChange = (e) => {
        const { name, value } = e.target
        setLists({ ...lists, [name]:value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        updateList(lists, dispatch)
        window.location='/lists'
    }
console.log(lists)
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newlist">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <span className="productName">{list.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{list._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{list.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">type:</span>
                      <span className="productInfoValue">{list.type}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>List Title</label>
                  <input type="text" placeholder={list.title} name='title' onChange={handleChange} />
                  <label>Type</label>
                  <input type="text" placeholder={list.type} name='type' onChange={handleChange} />
                  <label>Genre</label>
                  <input type="text" placeholder={list.genre} name='genre' onChange={handleChange} />
              </div>
              <div className="productFormRight">
                  <button className="productButton" onClick={handleSubmit}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
