import styled from 'styled-components';
import { Navbar } from 'reactstrap';
import { device } from './device'


export const BrandHeader = styled.h1`
    font-size:21px;
    color:#3F3B3A;
    text-transform:uppercase;
    margin-top:10px;
`;

export const BrandHeaderScroll = styled.h1`
    font-size:21px;
    color:#3F3B3A;
    text-transform:uppercase;
    float:left;
    margin-left:15px;
    margin-top:8px;
`;

export const MobileBrandHeaderScroll = styled.h1`
    font-size:21px;
    color:#3F3B3A;
    text-transform:uppercase;
    float:left;
    margin-left:15px;
    margin-top:8px;
`;

export const BrandWrapper = styled.div`
    border:5px solid #fff;
    box-shadow:6px 6px 60px rgba(0,0,0,0.1);

    cursor:pointer;
    text-align:center;
    padding-bottom: 10px;
    border-radius:5px;
    margin:30px;
    height: ${props => props.type == 'scroll' ?  "70px": '190px' };
    padding-top: ${props => props.type == 'scroll' ?  "10px": '20px' };
    -webkit-transition: height 0.4s; 
    transition: height 0.4s;
    &:after {
        content: "";
        clear:both;
        height: 0;
        width: 0;
        display:table;
      }
`

export const MobileBrandWrapper = styled.div`
    text-align:center;
    height: ${props => props.type == 'scroll' ?  "70px": '170px' };
    -webkit-transition: height 0.4s; 
    transition: height 0.4s;
    &:after {
        content: "";
        clear:both;
        height: 0;
        width: 0;
        display:table;
      }
`




export const BrandScrollImg = styled.img`
    width:100%;
    text-align:center;
    height:40px;
    width:auto;
    float:left;
    margin-left:30px;
`;


export const MobileBrandScrollImg = styled.img`
    width:100%;
    text-align:center;
    height:40px;
    width:auto;
    float:left;
`;




