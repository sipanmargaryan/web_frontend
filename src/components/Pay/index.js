import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CreditCardInput from 'react-credit-card-input';
import {Col, Row, Button, Form, FormGroup, Label, Input, Spinner} from 'reactstrap';
import {payForProduct} from '../../actions/shop';

const Pay = () => {

  const dispatch = useDispatch();
  const basket = useSelector(state => state.shop.basket);
  const loading = useSelector(state => state.shop.loading);
  const [billingDetails, setBillingDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    city: '',
    postal_code: '',
    line1: '',
    line2: '',
    country: '',
    state: '',
    count: basket.length > 0 ? basket[0].count : 1,
    product: basket.length ? basket[0].pk : '',
  });

  const handleChange = ({target: {name, value}}) => {
    setBillingDetails({...billingDetails, [name]: value})
  };

  const resetData = () => {
    setBillingDetails({
      number: '',
      expiry: '',
      cvc: '',
      name: '',
      city: '',
      postal_code: '',
      line1: '',
      line2: '',
      country: '',
      state: '',
      count: basket.length > 0 ? basket[0].count : 1,
      product: basket.length ? basket[0].pk : '',
    })
  };

  const payProduct = () => {
    let expiry = billingDetails.expiry.split(' / ');
    billingDetails.exp_month = expiry[0];
    billingDetails.exp_year = expiry[1];
    delete billingDetails.expiry;
    dispatch(payForProduct(billingDetails));
    resetData()
  };

  return (
    <div className="d-flex justify-content-center">
      {
        loading ?
          <Spinner color="primary"/> :
          <Form className="w-25">
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                required
                value={billingDetails.name}
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                placeholder="Jone Doe"/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleAddress">Address Line 1</Label>
              <Input
                value={billingDetails.line1}
                onChange={handleChange}
                type="text"
                name="line1"
                id="exampleAddress"
                placeholder="1234 Main St"/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleAddress2">Address Line 2</Label>
              <Input
                value={billingDetails.line2}
                onChange={handleChange}
                type="text"
                name="line2"
                id="exampleAddress2"
                placeholder="Apartment, studio, or floor"/>
            </FormGroup>
            <FormGroup>
              <Label for="country">Country</Label>
              <Input
                value={billingDetails.country}
                onChange={handleChange}
                type="text"
                name="country"
                id="country"
                placeholder="USA"/>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">City</Label>
                  <Input
                    value={billingDetails.city}
                    onChange={handleChange}
                    type="text"
                    name="city"
                    id="exampleCity"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">State</Label>
                  <Input
                    value={billingDetails.state}
                    onChange={handleChange}
                    type="text"
                    name="state"
                    id="exampleState"/>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="exampleZip">Zip</Label>
                  <Input
                    value={billingDetails.postal_code}
                    onChange={handleChange}
                    type="text"
                    name="postal_code"
                    id="exampleZip"/>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <CreditCardInput
                cardNumberInputProps={{
                  value: billingDetails.number,
                  onChange: (e) => setBillingDetails({...billingDetails, number: e.target.value})
                }}
                cardExpiryInputProps={{
                  value: billingDetails.expiry,
                  onChange: (e) => setBillingDetails({...billingDetails, expiry: e.target.value})
                }}
                cardCVCInputProps={{
                  value: billingDetails.cvc,
                  onChange: (e) => setBillingDetails({...billingDetails, cvc: e.target.value})
                }}
                fieldClassName="input"
              />
            </FormGroup>
            <FormGroup className="text-center">
              <Button
                onClick={payProduct}
                color="primary"
                size="lg"
                block>
                Sign in
              </Button>
            </FormGroup>
          </Form>
      }
    </div>
  );
};

export default Pay;