import styled from 'styled-components';
import { Navbar,Container,Button ,Col,Row} from 'reactstrap';
import { device } from './device'

export const FilterWrapper = styled.div`
`;
export const WrapperX = styled.div`
    padding-bottom:170px;
    margin:0 30px 150px;

`;
export const FilterTitle = styled.h3`
    font-size:14px;
    font-weight:400;
    color:#555;
    letter-spacing:1px;
`;
export const RowButton = styled(Row)`
    margin: 0;
    padding: 0;
`;
export const ColButton = styled(Col)`
    margin: 0;
    padding: 0;
`;
export const ClearWrapper = styled.div`
    position:fixed;
    width:25vw;
    background-color:#43b96d;
    bottom:0;
`;

export const ClearInner = styled.div`

`;
export const ClearButton = styled(Button)`
    text-transform: uppercase;
    font-size :14px;
    padding-top:14px;
    padding-bottom:12px;
    color:#fff;
    border-radius:0;
    border:none medium;
`;







