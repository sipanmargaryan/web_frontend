import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from 'reactstrap';
import {FaShoppingBasket} from 'react-icons/fa';

import Modals from '../Modal';


const Header = () => {
  const count = useSelector(state => state.shop.basket.length);
  const [productCount, setProductCount] = useState(count);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setProductCount(count)
  }, [count]);

  return (
    <Navbar color="light" light expand="md" className="mb-3">
      <NavbarBrand href="/">Shop</NavbarBrand>
      <NavbarToggler/>
      <Collapse navbar>
        <Nav className="mr-auto" navbar>
        </Nav>
        <NavbarText>
          <FaShoppingBasket
            size={45}
            onClick={toggle}
          />
          {productCount}
        </NavbarText>
      </Collapse>
      <Modals isOpen={isOpen} toggle={toggle}/>
    </Navbar>
  );

};

export default Header;