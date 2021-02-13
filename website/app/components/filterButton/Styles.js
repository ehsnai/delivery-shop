import styled from 'styled-components';
import { Navbar,Container,Button,Label } from 'reactstrap';
import { device } from './device'

export const ButtonWrapper = styled(Label)`
    position: relative;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 0;
    border: ${props => props.status == 'active' ? '1px solid #43b96d':'1px solid #dedede'};
    font-size: 12px;
    text-transform: uppercase;
    margin: 0 -1px 0 0;
    background-color:${props => props.status == 'active' ? '#e9f7e0':'#fff'};;
    padding: 12px 12px;
    color: #424242;
    font-weight: 600;
    border-radius: 5px;
    margin: 2px;
    min-width: 80px;

    @media ${device.desktop} {
    }

    @media ${device.labtop} {
    }

    @media ${device.tablet} {
    }

    @media ${device.mobileL} {

    }

`;

export const ButtonIcon = styled.div`
    flex: 0 0 auto;
    font-size: 12px;
    text-transform: uppercase;
    color: #424242;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    margin-left:-12px;
`;

export const ButtomIconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const ButtonText = styled.span`
    displau:block;
`;
export const ButtonImg = styled.img`
    margin-bottom: 10px;
    height: 34px;
`;








