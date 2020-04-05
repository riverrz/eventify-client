import React, { useCallback } from "react";
import { times } from "react-icons-kit/fa/times";
import Icon from "react-icons-kit";
import styled from "styled-components";
import { cover } from "polished";

export default function ({
  zIndex,
  data: { content, title, onClose, id },
  closeModal,
}) {
  const handleClose = useCallback(() => {
    if (typeof onClose === "function") {
      onClose();
    }
    closeModal();
  }, [id]);
  return (
    <Wrapper style={{ zIndex: zIndex * 10 }}>
      <div className="modal">
        {title && <h2 className="title">{title}</h2>}
        <Icon className="close" icon={times} onClick={handleClose} />
        {React.cloneElement(content, { closeModal: handleClose })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${cover()}
  position: fixed;
  .title {
    text-align: center;
  }
  .modal {
    position: relative;
    background-color: #fff;

    .close {
      position: fixed;
      top: 1rem;
      right: 1rem;
      color: red;
    }
  }
`;
