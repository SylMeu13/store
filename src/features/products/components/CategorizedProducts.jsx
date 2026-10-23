import Loader from "@/components/Loader";
import { getProductsInCategory } from "../productApi";
import styled from "styled-components";
import ProductThumbnail from "./ProductThumbnail";

const SProducts = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em 1em;
  justify-content: center;
`;

export default function CategorizedProducts({ category }) {
  return (
    <Loader
      queryKey={["products", category]}
      fetcher={() => getProductsInCategory(category, 5)}
      renderOnSuccess={(data) => (
        <SProducts>
          {data.map((product) => (
            <ProductThumbnail key={product.id} {...product} />
          ))}
        </SProducts>
      )}
    />
  );
}
