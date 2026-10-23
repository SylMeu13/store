import styled from "styled-components";
import loadingSVG from "@/assets/LoadingSquare.svg";

const Frame = styled.div`
  width: 100%;
  min-height: 40vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;

  img {
    width: 106px;
  }
`;

export default function LoadingFrame({ label }) {
  return (
    <Frame>
      <img src={loadingSVG} alt="Loading" />
      {label && <p>{label}</p>}
    </Frame>
  );
}
