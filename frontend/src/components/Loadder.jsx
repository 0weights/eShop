import Spinner from 'react-bootstrap/Spinner';

const Loadder = ()=>{
  return (
    <Spinner 
      animation="border"
      ariant="primary"
      role="status"
      style={{
        width : '100px',
        height: '100px',
        display: 'block',
        margin : 'auto'
      }}
    ></Spinner>
  )
}
export default Loadder;
