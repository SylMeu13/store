import SearchBar from "@/components/SearchBar";
import Products from "@/features/products/components/Products";
import { useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: xxx-large;
`;

const Presentation = styled.section`
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StoreSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
`;

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <main>
      <Presentation>
        <Title>Store</Title>
      </Presentation>
      <StoreSection>
        <SearchBar onSearch={setSearch} />
        <Products search={search} />
      </StoreSection>
    </main>
  );
}
