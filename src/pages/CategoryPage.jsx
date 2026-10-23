import CategorizedProducts from "@/features/products/components/CategorizedProducts";
import { useParams } from "react-router";
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

const Section = styled.section`
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export default function CategoryPage() {
  const { category } = useParams();
  return (
    <main>
      <Presentation>
        <Title>{category}</Title>
      </Presentation>
      <Section>
        <CategorizedProducts category={category} />
      </Section>
    </main>
  );
}
