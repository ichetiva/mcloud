import axios from 'axios';
import GetPlaylists from '../Playlists/GetPlaylists';

const GetUser = ({setUser}) => {
  return (
    axios.get('http://94.198.219.99:8000/api/users/me', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) { 
        setUser(response)
      })
      .catch(function (error) {
      console.log(error)
      
      }));
  
};

export default GetUser