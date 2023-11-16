import axios from 'axios';

const GetUser = (Action , refresh) => {
  return (
    axios.get('https://ichetiva.ru/api/users/me', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
        console.log(response)
        
      })
      .catch(function (error) {
      Action()
      refresh()

      }));
  
};

export default GetUser