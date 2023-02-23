import { Link } from 'react-router-dom';

const Error = () => {
  
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured. </p>
    
      <p>Go to the <Link to="/">HomePage</Link>.</p>
    </div>
  );
  
  }  
  export default Error;
