import styled from 'styled-components';
import { Navbar,Container } from 'reactstrap';
import { device } from './device'


export const Wrapper = styled(Container)`
    background-color: #fef5f0;
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

export const SideFilter = styled.div`
height:100%;
overflow:scroll;

`;






