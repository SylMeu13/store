import Loader from "@/components/Loader";
import {
  deleteProduct,
  editProduct,
  getProduct,
} from "@/features/products/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { formatCurrency } from "@/utils/formats";
import { useState } from "react";
import ProductItemEdit from "./ProductItemEdit";

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

  img {
    width: 5em;
  }
`;

const Content = styled.div`
  width: 100%;

  .highlight {
    color: var(--text-h);
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`;

const RemoveButton = styled.button`
  background-color: #aa0000;
  border-radius: 0.5em;
  border-width: 1px;
  border-color: var(--border);
  padding: 0.5em 1em;
  font-weight: bold;
`;

const EditButton = styled.button`
  background-color: orange;
  border-radius: 0.5em;
  border-width: 1px;
  border-color: var(--border);
  padding: 0.5em 1em;
  font-weight: bold;
`;

export default function ProductItem({ id }) {
  const client = useQueryClient();
  const deleteMutator = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => client.invalidateQueries(["products", id]),
  });
  const editMutator = useMutation({
    mutationFn: (data) => editProduct(id, data),
    onSuccess: () => {
      client.invalidateQueries(["products", id]);
      setEditing(false);
    },
  });
  const [isEditing, setEditing] = useState(false);

  function handleRemove() {
    deleteMutator.mutate();
  }

  function handleEdit(data) {
    editMutator.mutate(data);
  }

  return (
    <Loader
      queryKey={["product", id]}
      fetcher={() => getProduct(id)}
      renderOnSuccess={(product) => {
        return isEditing ? (
          <ProductItemEdit
            product={product}
            onEdit={handleEdit}
            onCancel={() => setEditing(false)}
            editing={editMutator.isPending}
          />
        ) : (
          <Item>
            <img src={product.image} alt={product.title} />
            <Content>
              <h2>{product.title}</h2>
              <p className="highlight">{product.category}</p>
              <p>{product.description}</p>
            </Content>
            <p>{formatCurrency(product.price)}</p>
            <Buttons>
              <EditButton
                onClick={() => setEditing(true)}
                disabled={deleteMutator.isPending || editMutator.isPending}
              >
                Edit
              </EditButton>
              <RemoveButton
                onClick={handleRemove}
                disabled={deleteMutator.isPending || editMutator.isPending}
              >
                Remove
              </RemoveButton>
            </Buttons>
          </Item>
        );
      }}
    />
  );
}
