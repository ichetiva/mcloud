import axios from 'axios';

const GetUserById = (data, {setUsername}) => {
    const userfound = parseInt(data)
    
  return (
    axios.get(`http://94.198.219.99:8000/api/users/${userfound}`,
    {

        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) { 
        setUsername(response.data.username)
      })
      .catch(function (error) {
      console.log(error)
      
      }));
  
};

export default GetUserById