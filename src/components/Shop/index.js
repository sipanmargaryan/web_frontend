import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row, Spinner
} from 'reactstrap';
import { addBasket, getProduct } from '../../actions/shop';

const Shop = () => {

  const dispatch = useDispatch();
  const products = useSelector(state => state.shop.products);
  const loading = useSelector(state => state.shop.loading);

  const addBaskets = (id) => {
    let product = products.find(item => item.pk === id);
    product.count = 1;
    dispatch(addBasket(product));
  };

  // useEffect(() => {
  //   dispatch(getProduct())
  // },[dispatch]);


  return (
    <>
    <Row className={`${loading ? 'justify-content-center align-items-center' : ''} mr-0 ml-0`}>
    {
      loading ?
        <Spinner color="primary" />:
      products.map(item => (
        <Col lg="3" key={item.pk}>
          <Card>
            <CardImg
              top
              width="100%"
              src={require("../../assets/visitCard.jpg")}
              alt="Card image cap"/>
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              <CardSubtitle>Mount:  {item.unit_amount}</CardSubtitle>
              <Button onClick={() => addBaskets(item.pk)}>Add</Button>
            </CardBody>
          </Card>
        </Col>
      ))
    }
    </Row>
    </>
  )

};

export default Shop;
