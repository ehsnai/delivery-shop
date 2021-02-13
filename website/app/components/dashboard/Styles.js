import styled from 'styled-components';
import { Navbar,Container,Button ,Col,Row,Card} from 'reactstrap';
import { device } from './device'

export const ListWrapper = styled.div`
    display: flex;
    font-size: 14px;
    align-items: center;
    color: #313131;
    width:100%;
`;

export const WrapperX = styled.div`
    width:100%;
    background-color:#fff;

`;

export const ListTitle = styled.div`
    flex-grow: 1;
    position:relative;
`;

export const ListBody = styled.div`
    flex: 1 0 auto;
    margin:${props => props.mobile == 'mobile' ?  "0": '0 -10px' };

`;

export const ListCardBody = styled.div`
    display: flex;
    flex-direction: column;    
    padding: 10px;
`;

export const ListCard = styled(Card)`
    border:medium none;
`;

export const MobileNavMenu = styled.a`
    position:absolute;
    right:0;
    top:0;
    width:30px;
    height:30px;
    cursor:pointer;
`;
export const NotFoundCartCol = styled(Col)`
    box-shadow: 4px 4px 40px rgba(0,0,0,0.1);
    margin-bottom:90px;
    border-radius:0.25rem;
`;



