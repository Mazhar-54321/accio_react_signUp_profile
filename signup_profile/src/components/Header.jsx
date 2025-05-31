// src/components/Header.js
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '10px',display:'flex',width:'99%', justifyContent:'flex-end',borderBottom:'1px solid white' }}>
      <nav style={{marginRight:'100px'}}>
        <Link to="/signup" style={{ marginRight: '10px',color:'white' }}>Signup</Link>
        <Link to="/profile" style={{color:'white'}}>Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
