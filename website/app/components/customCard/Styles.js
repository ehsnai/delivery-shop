import styled from 'styled-components';
import { Navbar,Button } from 'reactstrap';
import { device } from './device'

export const CardWrapper = styled.div`
    padding: ${props => props.mobile == 'mobile' ?  "0": '10px' };
    display: flex;
    flex-direction: column;
    margin-bottom:25px;
`;

export const WrapperX = styled.a`
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const WrapperY = styled.div`
`
export const WrapperZ = styled.div`
    display:flex;
    flex: 1 0 auto;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    background-clip: content-box;
    overflow: visible;
`

export const WrapperF = styled.div`
    border-radius: 8px;
    transition: box-shadow .1s;
    transition: box-shadow .1s,-webkit-box-shadow .1s;
`

export const CardImg = styled.div`
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    position: relative;
    margin-bottom:20px;
    box-shadow: ${props => props.type == 'modal' ? 'unset':'4px 4px 40px rgba(0,0,0,0.1)'} ;
    cursor:pointer;
    border-bottom:${props => props.type == 'modal' ? '1px solid #dedede':'unset'} ;
    width: 100%;
    padding-top: 66%; /* 1:1 Aspect Ratio */
    position: relative; /* If you want text inside of it */
`

export const CardPrice = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin:12px 0 10px 0;
`

export const CardBody = styled.div`
    padding: 0;
    width: 100%;
`

export const CardCart = styled.div`

`

export const PriceItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: none;
    width: 25%;
    cursor:pointer;
`
export const PriceItemY = styled(Button)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
    flex: auto;
    position: relative;
    border: 1px solid #888;
    background:transparent;
    border-radius:10px;
    margin-right:5px;
    &:hover{
        border-color:#28a745;
        background:transparent;

    }

`

export const AddToCard = styled(Button)`
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    font-size: 14px;
    text-align: center;
    padding: 12px;
    text-transform: uppercase;
    z-index: 3;
    position: relative;
    cursor: pointer;
    outline: 0!important;
    height: 100%;
`

export const CardPropsWrappr = styled.div`
    overflow: hidden;
    flex: none;
`

export const CardProps = styled.div`
    color: #fff;
    padding: .5em .3125em;
    text-align: center;
    font-size: 14px;
    color:#555;
`

export const CardPropsItems = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
`

export const CardPropsItem = styled.div`
    padding: .1875em .25em;
`

export const CatOfItem = styled.div`
    align-items: center;
    padding: 2px 7px;
    justify-content: center;
    display: flex;
    border-radius: 5px;
    text-transform: uppercase;
    color: #fff;
    font-size: 11px;
    background-color: rgb(255, 143, 0);
    position: absolute;
    ${props => props.type == 'modal' ? '':'right: 20px;top: 20px;'}
    
    
`

export const CartHeader = styled.div`

`




