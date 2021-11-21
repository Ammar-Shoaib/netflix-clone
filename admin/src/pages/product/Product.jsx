import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";
import storage from "../../firebase";

export default function Product() {

    const location = useLocation()
    const movie = location.movie

    const [movies, setMovies] = useState(movie)
    const [imgs, setImgs] = useState(null)
    const [trailers, setTrailers] = useState(null)
    const [videos, setVideos] = useState(null)
    const [uploaded, setUploaded] = useState(0)


    const { dispatch } = useContext(MovieContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        setMovies({ ...movies, [name]:value })
    }
console.log(movies)
    const handleUpdate = (e) => {
        e.preventDefault()
        updateMovie(movies, dispatch)
        window.location = '/movies'
    }

    const upload = (items) => {
        items.forEach(item => {
        const fileName = new Date().getTime() + item.label + item.file.name
        const uplaodTask = storage.ref(`/items/updated/${fileName}`).put(item.file)
        uplaodTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + ' & done.')
        },
        err => console.log(err),
        () => {
            uplaodTask.snapshot.ref.getDownloadURL().then(url => {
                setMovies(prev => { return { ...prev, [item.label]:url} })
                setUploaded(prev => prev + 1)
            })
        }
        )})
    }

    const handleUpload = e => {
        e.preventDefault()
        upload([
        { file:imgs, label:'img' },
        { file:trailers, label:'trailer' },
        { file:videos, label:'video' },
        ])
    }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={movie.img} alt="" className="productInfoImg" />
                  <span className="productName">{movie.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{movie._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{movie.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year:</span>
                      <span className="productInfoValue">{movie.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">limit:</span>
                      <span className="productInfoValue">{movie.limit}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie Title</label>
                  <input type="text" placeholder={movie.title} name='title' onChange={handleChange} />
                  <label>Year</label>
                  <input type="text" placeholder={movie.year} name='year' onChange={handleChange} />
                  <label>Genre</label>
                  <input type="text" placeholder={movie.genre} name='genre' onChange={handleChange} />
                  <label>Limit</label>
                  <input type="text" placeholder={movie.limit} name='limit' onChange={handleChange} />
                  <label>Trailer</label>
                  <input type="file" placeholder={movie.trailer} name='trailer' onChange={e => setTrailers(e.target.files[0])} />
                  <label>Video</label>
                  <input type="file" placeholder={movie.video} name='video' onChange={e => setVideos(e.target.files[0])} />
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={movie.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} name='imgs' onChange={e => setImgs(e.target.files[0])} />
                  </div>
                  {uploaded === 3 ? (
                  <button className="productButton" onClick={handleUpdate}>Update</button>
                  ) : (
                  <button className="productButton" onClick={handleUpload}>Upload</button>
                    )}
              </div>
          </form>
      </div>
    </div>
  );
}
