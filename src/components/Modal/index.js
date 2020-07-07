import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Modal,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addBasket } from '../../actions/shop';

import './style.css';


const Modals = ({isOpen, toggle, history}) => {

  const [total, setTotal] = useState(0);

  const basketProducts = useSelector(state => state.shop.basket);

  const getTotal = useCallback(() => {
    let sum = 0;
    sum = basketProducts.map(item => sum + (item.count * item.unit_amount)).reduce((a,b) => a + b, 0);
    setTotal(sum)
  },[basketProducts]);

  const changeCount = (e,id) => {
    let product = basketProducts.find(item => item.pk === id);
    product.count = e.target.value;
    getTotal();
  };

  const buyProduct = (e) => {
    e.preventDefault();
    addBasket(basketProducts);
    toggle()
    history.push('/pay')
  };

  useEffect(() => {
    getTotal();
  },[isOpen,getTotal]);

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      className="modal-position">
      <ModalHeader toggle={toggle}>Product list</ModalHeader>
      <ModalBody>
        <Table borderless className="text-center">
          <thead>
          <tr>
            <th>Img</th>
            <th>Name</th>
            <th>Price</th>
            <th>Count</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          {
            basketProducts.map(product => (
              <tr key={product.pk}>
                <th>
                  <img
                    src={require("../../assets/visitCard.jpg")}
                    alt="product-alt"
                    className="product-img"/>
                </th>
                <td className="align-middle">{product.name}</td>
                <td className="align-middle">{product.unit_amount}</td>
                <td className="align-middle w-25">
                  <Input
                    min={1}
                    onChange={(e) => changeCount(e,product.pk)}
                    defaultValue={product.count}
                    type="number"
                    name="count"
                  />
                </td>
                <td className="align-middle">{product.count*product.unit_amount}</td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <h3>total: {total}</h3>
        <Button color="primary" onClick={buyProduct}>Buy</Button>{' '}
      </ModalFooter>
    </Modal>
  )

};

Modals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Modals);