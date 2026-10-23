import styled from "styled-components";

const SFooter = styled.footer`
  border-top: 1px solid var(--border);
  margin-top: 1em;
  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  a {
    color: var(--accent);
  }
`;

export default function Footer() {
  return (
    <SFooter>
      <p>
        Ce site utilise <a href="https://fakestoreapi.com">Fake Store API</a>.
      </p>
      <p>Aucune modification des produits ou du panier n'est fonctionelle.</p>
    </SFooter>
  );
}
