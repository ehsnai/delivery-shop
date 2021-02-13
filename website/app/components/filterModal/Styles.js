import styled from 'styled-components';
import { Navbar,Container } from 'reactstrap';
import { device } from './device'

export const FilterModalWrapper = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 70px;
    height: 70px;
    background: #28a745;
    z-index: 99;
    border-radius:50%;
    cursor:pointer;
    box-shadow: 4px 4px 40px rgba(0,0,0,0.1);
    text-align: center;
    padding-top:20px;
`;





