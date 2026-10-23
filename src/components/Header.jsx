import { Link, NavLink } from "react-router";
import styled from "styled-components";
import Loader from "./Loader";
import { getCategories } from "@/features/products/productApi";
import CartIcon from "@/features/carts/components/CartIcon";

const SHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  border-bottom: 1px solid var(--border);
  height: 2em;
`;

const SNav = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2em;

  a {
    font-size: large;

    &.active {
      font-weight: bold;
      color: var(--text-h);
    }
  }
`;

const Logo = styled.span`
  font-size: xx-large;
  font-weight: bold;
  color: var(--text-h);
`;

export default function Header() {
  return (
    <SHeader>
      <Link to="/">
        <Logo>Store</Logo>
      </Link>

      <SNav>
        <Loader
          queryKey={["categories"]}
          fetcher={getCategories}
          renderOnSuccess={(categories) =>
            categories.map((category) => (
              <NavLink to={"/category/" + category}>{category}</NavLink>
            ))
          }
        />
      </SNav>
      <CartIcon />
    </SHeader>
  );
}
