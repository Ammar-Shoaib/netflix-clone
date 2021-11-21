import { useContext, useEffect, useState } from "react";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import storage from "../../firebase";
import { MovieContext } from '../../context/movieContext/MovieContext'
import "./newList.css";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";

export default function NewList() {

  const [list, setList] = useState(null)
  const { movies, dispatch: movieDispatch } = useContext(MovieContext)
  const { dispatch } = useContext(ListContext)
console.log(list)
  useEffect(() => {
    getMovies(movieDispatch)
  }, [movieDispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setList({ ...list, [name]:value })
  }

  const handleSelect = e => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value)
    setList({ ...list, [e.target.name]:value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createList(list, dispatch)
    window.location = '/lists'
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder="Popular movies" onChange={handleChange} name='title' />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input type="text" placeholder="action" onChange={handleChange} name='genre' />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange} id="type">
              <option>--Type--</option>
              <option value='movie'>Movies</option>
              <option value='series'>Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select multiple name="content" onChange={handleSelect} id="content" style={{ height:'283px' }}>
              {movies.map(movie => (
                <option key={movie._id} value={movie._id}>{movie.title}</option>
              ))}
            </select>
          </div>
        </div>
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
