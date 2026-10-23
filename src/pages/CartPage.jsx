import Loader from "@/components/Loader";
import { getCart } from "@/features/carts/cartApi";
import CartItem from "@/features/carts/components/CartItem";
import styled from "styled-components";

const Page = styled.main`
  padding-inline: 2em;
`;

// const Content = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

const Items = styled.section`
  /* width: 80%; */

  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export default function CartPage() {
  return (
    <Loader
      queryKey={["carts", 1]}
      fetcher={() => getCart()}
      renderOnSuccess={(cart) => (
        <Page>
          <section>
            <h1>Panier</h1>
          </section>
          <Items>
            {cart.products.map((product) => (
              <CartItem {...product} />
            ))}
          </Items>
        </Page>
      )}
    />
  );
}
