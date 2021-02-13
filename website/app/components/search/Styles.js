import styled from 'styled-components';
import { Navbar,Container } from 'reactstrap';
import { device } from './device'

export const SearchWrapper = styled.div`
    width:100%;
    margin-bottom:${props => props.type == 'mobile' ?  "0": '30px' };
    position:relative;
    padding: ${props => props.type == 'mobile' ?  "20px": '0' };
    box-shadow:6px 6px 60px rgba(0,0,0,0.1);

`;
export const SearchInput = styled.input`
    width:100%;
    border:medium none;
    border-radius:5px;
    height:40px;
    font-size:12px;
    padding-left:45px;
`;

export const SearchIcon = styled.div`
    background-image:url(${props => props.searchImage});
    background-size:contain;
    position:absolute;
    top:${props => props.type == 'mobile' ?  "30px": '10px' };
    left:${props => props.type == 'mobile' ?  "35px": '15px' };
    height:20px;
    width:20px;
    opacity:0.6;
`;





