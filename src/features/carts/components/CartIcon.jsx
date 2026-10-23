import image from "@/assets/shopping_cart.svg";
import Loader from "@/components/Loader";
import { getCart } from "../cartApi";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Container = styled.div`
  position: relative;
  height: 100%;
  cursor: pointer;

  img {
    height: 100%;
  }
`;

const Count = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: blueviolet;
  border-radius: 5em;
  color: white;
  font-size: 0.65em;
  font-weight: bolder;
  padding: 0;
  height: 1.5em;
  width: 1.5em;
  text-shadow: var(--shadow);
  box-shadow: var(--shadow);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CartIcon() {
  const navigate = useNavigate();
  return (
    <Loader
      queryKey={["carts", 1]}
      fetcher={() => getCart()}
      renderOnSuccess={(data) => (
        <Container onClick={() => navigate("/cart")}>
          <img src={image} alt="cart" />
          {data.products.length > 0 && <Count>{data.products.length}</Count>}
        </Container>
      )}
    />
  );
}
