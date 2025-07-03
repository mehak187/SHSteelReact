import React, { useEffect } from "react";
import styled from "styled-components";

const Loader = ({ loading }) => {
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [loading]);
  if (!loading) return null;
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 9999; /* ensure it's above other content */

  .loader {
    width: 44.8px;
    height: 44.8px;
    color: #88191f;
    position: relative;
    background: radial-gradient(11.2px, currentColor 94%, #0000);
  }

  .loader:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
          10.08px at bottom right,
          #0000 94%,
          currentColor
        )
        top left,
      radial-gradient(10.08px at bottom left, #0000 94%, currentColor) top right,
      radial-gradient(10.08px at top right, #0000 94%, currentColor) bottom left,
      radial-gradient(10.08px at top left, #0000 94%, currentColor) bottom right;
    background-size: 22.4px 22.4px;
    background-repeat: no-repeat;
    animation: loader 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
  }

  @keyframes loader {
    33% {
      inset: -11.2px;
      transform: rotate(0deg);
    }

    66% {
      inset: -11.2px;
      transform: rotate(90deg);
    }

    100% {
      inset: 0;
      transform: rotate(90deg);
    }
  }
`;

export default Loader;
