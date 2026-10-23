import Loader from "@/components/Loader";
import ProductItem from "@/features/admin/components/ProductItem";
import { getProducts } from "@/features/products/productApi";
import styled from "styled-components";

const Page = styled.main`
  padding-inline: 2em;
`;

const Items = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export default function AdminProductsPage() {
  return (
    <Page>
      <section>
        <h1>Products Management</h1>
      </section>
      <Loader
        queryKey={["products"]}
        fetcher={getProducts}
        renderOnSuccess={(data) => (
          <Items>
            {data.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))}
          </Items>
        )}
      />
    </Page>
  );
}
