import React from 'react';
import Container from '../container/container';
import Logo from '../Logo';
import FunctionBtn from '../FunctionBtn';
function Header({ isSidebarOpen }) {
 
  return (
    <header className="py-3.5 shadow bg-[#124170] z-10 relative">
      <Container>
        <div className="flex justify-between items-center transition-all duration-300">
          {/* Move only Logo */}
          <div
            className="transition-all duration-300"
            style={{
              marginLeft: isSidebarOpen ? '250px' : '80px', // match sidebar width
            }}
          >
            <Logo />
          </div>

          {/* Right Side - Buttons */}
          <div className="flex gap-4">
            <FunctionBtn>Signup</FunctionBtn>
            <FunctionBtn>Login</FunctionBtn>
            <FunctionBtn>Logout</FunctionBtn>
          </div>
        </div>
      </Container>
    </header>
  );
}
export default Header;

