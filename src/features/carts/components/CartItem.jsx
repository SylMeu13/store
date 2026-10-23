import Loader from "@/components/Loader";
import { getProduct } from "@/features/products/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart, setQuantity } from "../cartApi";
import styled from "styled-components";
import { formatCurrency } from "@/utils/formats";

const Item = styled.article`
  border: 1px solid var(--accent-border);
  border-radius: 1em;
  background-color: var(--accent-bg);
  padding: 1em;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2em;
  align-items: center;
  text-align: left;

  p {
    white-space: nowrap;
  }

  h2 {
    width: 100%;
  }

  img {
    height: 5em;
  }

  input {
    width: 2em;
  }
`;

const RemoveButton = styled.button`
  background-color: #aa0000;
  border-radius: 0.5em;
  border-width: 1px;
  border-color: var(--border);
  padding: 0.5em 1em;
  font-weight: bold;
`;

export default function CartItem({ productId, quantity }) {
  const client = useQueryClient();
  const quantityMutator = useMutation({
    mutationFn: (newQuantity) => setQuantity(productId, newQuantity),
    onSuccess: () => client.invalidateQueries(["carts", 1]),
  });
  const deleteMutator = useMutation({
    mutationFn: () => removeFromCart(productId),
    onSuccess: () => client.invalidateQueries(["carts", 1]),
  });

  function handleQuantityChange(event) {
    quantityMutator.mutate(event.target.valueAsNumber);
  }
  function handleRemove() {
    deleteMutator.mutate();
  }
  return (
    <Loader
      queryKey={["product", productId]}
      fetcher={() => getProduct(productId)}
      renderOnSuccess={(product) => (
        <Item>
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>
            {formatCurrency(product.price)} X{" "}
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              disabled={quantityMutator.isPending || deleteMutator.isPending}
            />{" "}
            = {formatCurrency(product.price * quantity)}
          </p>
          <RemoveButton
            onClick={handleRemove}
            disabled={quantityMutator.isPending || deleteMutator.isPending}
          >
            Remove
          </RemoveButton>
        </Item>
      )}
    />
  );
}
