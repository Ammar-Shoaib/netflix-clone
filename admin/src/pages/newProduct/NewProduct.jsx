import { useContext, useState } from "react";
import { createMovie } from "../../context/movieContext/apiCalls";
import storage from "../../firebase";
import { MovieContext } from '../../context/movieContext/MovieContext'
import "./newProduct.css";

export default function NewProduct() {

  const [movie, setMovie] = useState(null)
  const [img, setImg] = useState(null)
  const [imgTitle, setImgTitle] = useState(null)
  const [imgSm, setImgSm] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [video, setVideo] = useState(null)
  const [uploaded, setUploaded] = useState(0)

  const { dispatch } = useContext(MovieContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setMovie({ ...movie, [name]:value })
  }

  const upload = (items) => {
    items.forEach(item => {
      console.log(item)
      const fileName = new Date().getTime() + item.label + item.file.name
      const uplaodTask = storage.ref(`/items/${fileName}`).put(item.file)
      uplaodTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + ' & done.')
      },
      err => console.log(err),
      () => {
        uplaodTask.snapshot.ref.getDownloadURL().then(url => {
          setMovie(prev => { return { ...prev, [item.label]:url} })
          setUploaded(prev => prev + 1)
        })
      }
    )})
  }

  const handleUpload = e => {
    e.preventDefault()
    upload([
      { file:img, label:'img' },
      { file:imgTitle, label:'imgTitle' },
      { file:imgSm, label:'imgSm' },
      { file:trailer, label:'trailer' },
      { file:video, label:'video' },
    ])
  }

  const handleSubmit = e => {
    e.preventDefault()
    createMovie(movie, dispatch)
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" onChange={e => setImg(e.target.files[0])} name='img' />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle" name='imgTitle' onChange={e => setImgTitle(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input type="file" id="imgSm" onChange={e => setImgSm(e.target.files[0])} name='imgSm' />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="John Wick" onChange={handleChange} name='title' />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="description" onChange={handleChange} name='desc' />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="year" onChange={handleChange} name='year' />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="genre" onChange={handleChange} name='genre' />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="duration" onChange={handleChange} name='duration' />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="limit" onChange={handleChange} name='limit' />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="active" id="isSeries" onChange={handleChange} name='isSeries'>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" onChange={e => setTrailer(e.target.files[0])} name='trailer' />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name='video' onChange={e => setVideo(e.target.files[0])} />
        </div>
        {uploaded >= 5 ? (
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
}
