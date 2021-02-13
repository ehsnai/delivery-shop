import styled from 'styled-components';
import { 
    Navbar,
    Container,
    Button ,
    Col,
    Row,
    Card,
    NavItem,
    NavLink,
    TabContent,
    Input,

} from 'reactstrap';
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

export const SearchWrapper = styled.div`
    width:100%;
    margin-bottom:10px;
    position:relative;
    border:1px solid #dee2e6;
    border-radius: 4px !important;
    font-size: 14px;
    font-weight: normal;
    height: calc(2em + 1rem + 2px);
    padding: 0;
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

export const CustomNavItem = styled(NavItem)`
    width: 100%;
    margin-bottom:1rem !important;
`;

export const CustomNavLink = styled(NavLink)`
    border-radius:.25rem;
    cursor:pointer;
    border-color:#dee2e6!important;
    padding:1.25rem 1rem;
    display:flex;
    position: relative;
    &:hover{
        border-color:#43b96d !important;
    }
`;

export const CustomTabContent = styled(TabContent)`
    margin-left:1rem;
    padding:10px;
    border:1px solid #dee2e6;
    border-radius:.25rem;
`;

export const WizardWrapper = styled.div`
    padding: 10px 0;
`;

export const OrderBWrapper = styled.div`
    margin-left:20px;
    flex:1;
    font-size:12px;
`;

export const ArrowOrderIcon = styled.div`
    background-image:url(${props => props.bg});
    background-size:contain;
    position:absolute;
    top:calc(50% - 10px);
    right:10px;
    height:20px;
    width:20px;


`;


export const StockInput = styled(Input)`
    font-size: 12px !important;
    height: 35px !important;
    padding: 0 5px 0 !important;
`

export const StockCountInput = styled(Input)`
    font-size: 12px !important;
    height: 35px !important;
    padding: 0 5px 0 !important;
`

