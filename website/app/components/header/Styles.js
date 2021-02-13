import styled from 'styled-components';
import { 
    Navbar,
    Container,
    Button,
    ButtonGroup ,
    FormGroup,
    Col,
    Row,
    Nav,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    DropdownToggle,

} from 'reactstrap';
import { device } from './device'

export const HeaderWrapper = styled.div`
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #dedede;
    z-index: 7;
    padding-bottom:${props => props.type == 'scroll' ? '5px': '40px' };
    position: fixed;
    height: ${props => props.type == 'scroll' ? '100px': '220px' };
    width:75vw;
    z-index:99;
    -webkit-transition: height 0.4s; /* Safari prior 6.1 */
    transition: height 0.4s;
`;
export const MobileHeaderWrapper = styled.div`
    background-color: #fff;
    box-sizing: border-box;
    z-index: 7;
    width: calc(100%);
    padding-bottom:${props => props.type == 'scroll' ? '5px': '40px' };
    position: fixed;
    height: ${props => props.type == 'scroll' ? '82px': '275px' };
    z-index:99;
    -webkit-transition: height 0.4s; /* Safari prior 6.1 */
    transition: height 0.4s;
    padding:20px;
    box-shadow:${props => props.type == 'scroll' ? '4px 5px 30px rgba(0,0,0,0.1)': 'unset' };

`;



export const WrapperX = styled.div`
    width: 100%;
    padding: ${props => props.isMobile ? '20px': '40px' };

`;

export const WrapperTabs = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin-left:-15px;
`;

export const MobileWrapperTabs = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin-left:-3px;
`;

export const WrapperMenu = styled.div`
`;

export const WrapperNav = styled(Nav)`
    margin-left:-1rem;
`;

export const MobileWrapperNav = styled(Nav)`
    justify-content: flex-end;
`;

export const HeaderCard = styled.div`
    padding: 3px 15px 10px 15px;
    font-size: 13px;
    line-height: 24px;
    border-left:1px solid #dedede;
    min-height:85px;
`;

export const MobileHeaderCard = styled.div`
    border: 1px solid #dedede;
    margin-left: 6px;
    padding: 5px 5px 0;
    border-radius: 5px;
    text-align:center;

`;

export const HeaderCardImg = styled.img`
    width: 34px;
    height: 34px;
    vertical-align: center;
`;
export const MobileHeaderCardImg = styled.img`
    width: 24px;
    height: 24px;
    margin-bottom:5px;
`;

export const HeaderCardBody = styled.div`
    margin-left: 8px;
    display: inline-block;
    max-width: calc(100% - 42px);
    vertical-align: top;
    margin-top: -5px;
`;

export const MobileHeaderCardBody = styled.div`
    display: inline-block;
    vertical-align: top;
    width: 100%;
    margin-bottom:5px;
`;

export const HeaderTools = styled.div`
    margin-left:auto;
`
export const MobileHeaderTools = styled.div`
    position: absolute;
    right:20px;
    top:30px;
`
export const RegisterLink = styled(Button)`
    font-size:12px;
    color:#fff;
    background-color:#2196f3;
    border-radius:5px;
    padding:7px 14px;
    border-color:#2196f3;
    text-decoration: none;
`

export const ProfileLink = styled(DropdownToggle)`
    font-size:12px;
    border-radius:5px;
    padding:7px 14px;
    text-decoration: none;
`

export const LoginRegisterLink = styled(Button)`
    font-size:12px;
    border-radius:5px;
    padding:7px 14px;
    text-decoration: none;
`

export const LoginLink = styled.div`
    font-size:12px;
    color:#2196f3;
    padding:7px 14px;
    background-color:transparent;
    border:medium none;
    cursor:pointer;
    &:hover{
        background-color:transparent;
        color:#222;
    }

`

export const HeaderCart = styled.div`
    margin-right:10px;
    margin-left:10px;
    margin-top:5px;
    width:20px;
    height:20px;
    position:relative;
    background-color:transparent;
    border:medium none;
    color:#333;
    cursor:pointer;
    &:hover{
        background-color:transparent;
        color:#222;
    }
    &:focus{
        background-color:transparent;
        color:#222;
    }
`

export const HeaderAddress = styled(Button)`
    display:block;
    padding:0;
    margin-right:10px;
    margin-left:10px;
    margin-top:3px;
    width:20px;
    height:20px;
    position:relative;
    background-color:transparent;
    background-image:url(${props => props.bg});
    background-size:contain;

    border:medium none;
    color:#333;
    cursor:pointer;
    &:hover{
        background-color:transparent;
        color:#222;
    }
    &:focus{
        background-color:transparent;
        color:#222;
    }
`


export const HeaderSignIn = styled.div`
    margin-left:auto;
    margin-right:20px;
    margin-left:20px;
    width:20px;
    height:20px;
    background-image:url(${props => props.cartImage});
    background-size:contain;
    position:relative;
    background-color:transparent;
    border:medium none;
    color:#333;
    cursor:pointer;
    &:hover{
        background-color:transparent;
        color:#222;
    }
    &:focus{
        background-color:transparent;
        color:#222;
    }
`

export const HeaderCartB = styled.div`
    position:absolute;
    font-size:11px;
    padding:2px 4px;
    top:-5px;
    right:-5px;
    background-color:#fff8e1;
    border-radius:5px;
`
export const HeaderAddressB = styled.div`
    position:absolute;
    font-size:11px;
    padding:2px 4px;
    top:-5px;
    right:-5px;
    border-radius:5px;
`

export const ModalRegisterHeader = styled(ModalHeader)`
    text-align:center;
    justify-content:center;
    align-items: center;

`
export const ModalRegisterBody = styled(ModalBody)`
    padding: 1rem;
`
export const ModalRegisterFooter = styled(ModalFooter)`
    padding: 1rem;
    justify-content:center;
    align-items: center;
    text-align:center;
    display:block;
    border:medium none;
`

export const ModalLoginHeader = styled(ModalHeader)`
    text-align:center;
    justify-content:center;
    align-items: center;
`
export const ModalLoginBody = styled(ModalBody)`
`
export const ModalLoginFooter = styled(ModalFooter)`
    padding: 2rem 1rem;
    justify-content:center;
    align-items: center;
    text-align:center;
    display:block;
    border:medium none;
`

export const CartFormGroup = styled(FormGroup)`
    width:100%;
`

export const CartButtonGroup = styled(ButtonGroup)`
    width:100%;
`

export const CartTabButton = styled(Button)`
    color: ${props => props.status == 'select' ? '#fff': '#28a745' };
    background-color:${props => props.status == 'select' ? '#28a745': 'transparent' }; 
    border-color: #28a745;
`

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

export const DeleteCartButton = styled(Button)`
    height:20px;
    width: 20px;
    background-image:url(${props => props.bg});
    background-repeat:no-repeat;
    background-size: contain;
    padding:0;
    border:medium none;
`


 





