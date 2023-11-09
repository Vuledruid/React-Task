import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  const error = useRouteError();
  console.log(error);

  function returnToHomePage() {
    navigate("/")
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <button className='btn-home' onClick={returnToHomePage}>HOME</button>
    </div>
  );
}

export default Error;
