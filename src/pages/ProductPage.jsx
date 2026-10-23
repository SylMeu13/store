import Loader from "@/components/Loader";
import { addToCart } from "@/features/carts/cartApi";
import PriceTag from "@/features/products/components/PriceTag";
import { getProduct } from "@/features/products/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import styled from "styled-components";

const Page = styled.main`
  padding: 2em;
  text-align: left;

  display: flex;
  flex-direction: row;
  gap: 2em;

  h1 {
    font-size: xx-large;
  }

  section:first {
    width: 40%;

    img {
      width: 100%;
    }
  }
`;

const Content = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid var(--accent-border);
  background-color: var(--accent-bg);
  padding: 0.5em 1em;
  border-radius: 2em;

  h1 {
    margin-top: 0.5em;
  }
`;

const Buttton = styled.button`
  border: 1px solid var(--accent-border);
  background-color: var(--accent);
  border-radius: 2em;

  font-size: medium;
  font-weight: bold;
  padding: 0.5em 1em;
`;

export default function ProductPage() {
  const { id } = useParams();
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (productId) => addToCart(productId),
    onSuccess: () => client.invalidateQueries(["carts", 1]),
  });

  function handleCartAdd() {
    mutate(id);
  }

  return (
    <Loader
      queryKey={["product", id]}
      fetcher={() => getProduct(id)}
      renderOnSuccess={(product) => (
        <Page>
          <section>
            <img src={product.image} alt={product.title} />
          </section>
          <Content>
            <div>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
            </div>
            <Buttton onClick={handleCartAdd} disabled={isPending}>
              Ajouter au Panier
            </Buttton>
            <PriceTag value={product.price} top="1em" right="1em" />
          </Content>
        </Page>
      )}
    />
  );
}
