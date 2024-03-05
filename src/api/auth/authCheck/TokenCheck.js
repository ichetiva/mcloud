import axios from 'axios';

const TokenCheck = (Action) => {
  return (
    axios.get('http://94.198.219.99:8000/api/users/me', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
           
      })
      .catch(function (error) {
      Action()
      
      }));
  
};

export default TokenCheck