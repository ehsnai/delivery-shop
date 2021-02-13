import styled from 'styled-components';
import { Navbar,Container,Button ,Col,Row,Card} from 'reactstrap';
import { device } from './device'

export const ListWrapper = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    color: #313131;
    width:100%;
`;

export const WrapperX = styled.div`
    width:100%;
    background-color:#fff;
`;

export const WrapperY = styled.div`
    padding-left:30px;
`;

export const ProfileInfo = styled.div`
    text-align:center;
`;

export const ProfilePic = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    box-shadow: 4px 4px 40px rgba(0,0,0,0.1);
    background-image:url(${props => props.bg});
    margin-bottom:30px;
`;

export const ProfileStatus = styled.div`
    position: absolute;
    bottom:-10px;
    padding:2px 15px 3px;
    background-color: #fff;
    font-size: 11px;
    left:calc(50% - 27px);
    border-radius: 5px;
    color:#28a745;
    box-shadow: 4px 4px 40px rgba(0,0,0,0.1);
`;

export const ProfileCard = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    height:100%;
    width:100%;
`;






