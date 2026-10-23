import { formatCurrency } from "@/utils/formats";
import styled from "styled-components";

const SPriceTag = styled.p`
  position: absolute;
  width: fit-content;
  padding: 0.2em 0.5em;
  background-color: var(--accent);
  border: var(--accent-border) 1px solid;
  border-radius: 0.5em;
  color: var(--text-h);
  font-weight: bold;
  margin-left: auto;
`;

export default function PriceTag({
  value,
  top = undefined,
  bottom = undefined,
  left = undefined,
  right = undefined,
}) {
  return (
    <SPriceTag style={{ top, bottom, left, right }}>
      {formatCurrency(value)}
    </SPriceTag>
  );
}
