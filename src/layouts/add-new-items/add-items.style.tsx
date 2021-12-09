import styled from "styled-components";

export const AddItemRootContainer = styled.div`
    padding: 1rem;
`

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  background: #f1f1f1;
  width: 100%;
  @media only screen and (max-width: 600px) {
    padding-top: 1.5rem;
  }
`

export const AddItemSearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 13px;
  @media only screen and (max-width: 600px) {
    justify-content: left;
  }
  
`
export const CloseContainer = styled.div`
  position: relative;
`

export const CloseBtnWrapper = styled.div`
  position: absolute;
  right: 19px;
  top: 0.7rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  .close-icon{
    font-size: 2.5rem;
    color: #37B063;
  }
  @media only screen and (max-width: 600px) {
    right: -8px;
    top: -1.7rem;
  }
  
`

export const AddItemVariantWrapper = styled.div`
  width: 100%;
  height: 100vh;
`

export const DoneContainer = styled.div`
  position: sticky;
  z-index: 999;
  bottom: 2rem;
  display: flex;
  justify-content: flex-end;
 
`

export const DoneWrapper  = styled.div`
  position: relative;
  background: #37b063;
  color: white;
  width: 4rem;
  height: 4rem;
  border-radius: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 1rem;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    width: 3rem;
    height: 3rem;
  }
  
`