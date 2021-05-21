import styled from 'styled-components';

export const ignoredChildClassName = 'ignore-child';

export const Button = styled.button`
  align-items: center;
  background-color: ${
    // eslint-disable-next-line no-confusing-arrow
    props => props.primary ? '#0056E0' : '#3D3D3D'
};
  border: 0;
  border-radius: 6px;
  display: flex;
  font-weight: unset;
  justify-content: center;

  &:hover {
    background-color: ${
    // eslint-disable-next-line no-confusing-arrow
    props => props.primary ? '#246FE5' : '#525252'
};
  }
`;

export const Container = styled.div`
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  position: relative;
  padding: 0 ${props => props.theme.panePadding}px;

  & > * + *:not(.${ignoredChildClassName}) {
    margin-top: 16px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Close = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 20px;
  justify-content: center;
  width: 20px;

  &:before, &:after {
    content: '';
    background-color: #a4b8d1;
    border-radius: 2px;
    height: 2px;
    position: absolute;
    transform-origin: center center;
    width: 21px;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const Footer = styled.div`
  background-color: #141414;
  display: flex;
  justify-content: flex-end;
  padding: 24px ${props => props.theme.panePadding}px;

  & > *:not(:last-child) {
    margin-right: 16px;
  }
`;

export const Header = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: ${props => props.theme.headerSize}px;
  padding: 0 20px;
`;

export const PollCreateButton = styled(Button).attrs({
    primary: true
})`
  font-size: 15px;
  height: 40px;
  width: 100%;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

export const PollSubmitAnswerButton = styled(Button).attrs({
    primary: true
})`
  font-size: 15px;
  height: 40px;
  width: 100%;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

export const PollSubmitCreateButton = styled(Button).attrs({
    primary: true
})`
  font-size: 15px;
  height: 40px;
  width: 100%;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
