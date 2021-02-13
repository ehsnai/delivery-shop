import styled from 'styled-components';
import { Navbar,Container } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { device } from './device'


export const Wrapper = styled(Container)`
    background-color: #f5f5f5;
    position: fixed;
    width: 25vw;
    height: 100%;
    border-right: 1px solid #dedede;
    top: 0;
    bottom: 0;
    left: 0;
    padding:0;
    margin:0;
`;

export const ProfileSideMenu = styled.div`
    margin:0 30px 30px;
`;

export const ProfileListGroupItem = styled(ListGroupItem)`
    border:medium none;
    border-radius:0px;
    background-color: transparent;
    padding: 1rem 1.25rem;
    border-bottom:1px solid #fff;
    text-transform: uppercase;
    &:first-child {
    }
    &:last-child {
        border-bottom:medium none;

    }

`;

export const ProfileListGroup = styled(ListGroup)`
    border:medium none;

`;






