import Loader from "@/components/Loader";
import { getProducts } from "../productApi";
import styled from "styled-components";
import ProductThumbnail from "./ProductThumbnail";

const SProducts = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em 1em;
  justify-content: center;
`;

export default function Products({ search }) {
  const lowerCasedSearch = search.toLowerCase();
  return (
    <Loader
      queryKey={["products"]}
      fetcher={getProducts}
      renderOnSuccess={(data) => (
        <SProducts>
          {data
            .filter((product) =>
              product.title.toLowerCase().includes(lowerCasedSearch),
            )
            .map((product) => (
              <ProductThumbnail key={product.id} {...product} />
            ))}
        </SProducts>
      )}
    />
  );
}
