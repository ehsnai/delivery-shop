import styled from 'styled-components';
import { Navbar,Button } from 'reactstrap';
import { device } from './device'


export const CheckWrapper = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 75vw;
    background-color: #333;
`;

export const CheckButton = styled(Button)`
    text-transform: uppercase;
    font-size :14px;
    padding-top:14px;
    padding-bottom:12px;
    color:#fff;
    border-radius:0;
    border:none medium;
`;




