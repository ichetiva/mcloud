import axios from 'axios';
const TrackCreatePost = async ( label, image, track, startLoad, stopLoad, closeModal) => {
  startLoad()
  let formData = new FormData();
  formData.append("data", JSON.stringify({title: label, "publish_after_creation": true}))
  formData.append("poster_file", image)
  formData.append("track_file", track)
  return (
  
  await axios.post('http://94.198.219.99:8000/api/tracks/', 
     formData , 
    {
        headers: 
        {"Authorization": `Bearer ${localStorage.getItem('Token')}`}
    })
      .then(function (response) {
        console.log(response)
        stopLoad()
        closeModal()
        return response
      })
      .catch(function (error) {
        console.log(error)
        stopLoad()
        return error
      }));
   
/*
  axios.post({
    method: "post",
    url: 'https://ichetiva.ru/api/tracks/',
    data: formData,
    headers: {"Authorization": `Bearer ${localStorage.getItem('Token')}`}
  })
  
  )*/
};

export default TrackCreatePost