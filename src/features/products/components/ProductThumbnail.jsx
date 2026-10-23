import styled from "styled-components";
import PriceTag from "./PriceTag";
import { useNavigate } from "react-router";

const CHAR_LIMIT = 115;

const SProduct = styled.article`
  position: relative;
  width: 20em;
  border: var(--accent-border) 2px solid;
  border-radius: 1em;
  background-color: var(--accent-bg);
  padding: 0.2em;
  cursor: pointer;

  transition: transform 0.4s;

  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.4s;
  }

  img {
    width: 100%;
    height: 20em;
    min-height: 20em;
    object-fit: contain;
  }
`;

const Content = styled.p`
  height: 100%;
`;

export default function ProductThumbnail({
  id,
  title,
  price,
  description,
  image,
}) {
  const navigate = useNavigate();

  if (description.length > CHAR_LIMIT) {
    description =
      description.substring(0, description.indexOf(" ", CHAR_LIMIT - 10)) +
      "...";
  }
  return (
    <SProduct onClick={() => navigate("/product/" + id)}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <Content>{description}</Content>
      <PriceTag value={price} top="0.5em" right="0.5em" />
    </SProduct>
  );
}
