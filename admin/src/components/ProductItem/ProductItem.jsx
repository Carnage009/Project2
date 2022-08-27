import React from "react";
import styled from "styled-components";

const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductItem = (props) => {
  return (
    <ProductWrapper>
      <h4>{props.product._id}</h4>
      <h5>{props.product.name}</h5>
      <p>{props.product.price}</p>
    </ProductWrapper>
  );
};

export default ProductItem;
