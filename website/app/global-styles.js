import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size:14px;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .font-12{
    font-size:12px !important;
  }

  #app {
    background-color: #fff;
    min-height: 100%;
    min-width: 100%;
  }

  button > * {
    pointer-events: none;
  }

  p,
  label {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  }

  a{
    text-decoration:none !important;
    color: #333;
    background-color: transparent;

  }
  button:focus{
    box-shadow: unset !important;

  }

  .header {

  }
  img.icon{
    width:20px;
    height:20px;
    margin-right:5px;
    margin-top:-3px;
  }

  .modal{

  }

  .modal-dialog{
    height:calc(100% - 1rem);
  }
  .modal-content{
    border:medium none;
  }

  .modal-title{
    text-align:center;
    width:100%;
    margin: 20px 0 ;
  }

  .modal-content{
  }

  .modal-body{
    margin-top: 30px;
  }

  .modal-header{
    background: #fff;
    z-index:999;
  }
  .modal-title{
    font-size:17px !important;
  }

  .modal-header .close{
    padding:0;
    margin:0;
    position: absolute;
    right:20px;
    top: 15px;
    width: 70px;
    height: 70px;
    border: medium none;
    border-radius:50%;
    font-size: 24px;
    font-weight: normal;
    color:#212529;
    z-index:999;
    cursor:pointer;
    text-align: center;
    opacity:1;
    text-shadow:none;
  }

  .content {
    padding:260px 40px 20px;
  }

  .content.mobile {
    padding:275px 20px 20px;
  }

  .delivery-abx{
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .delivery-abx.mobile{
    font-size: 12px;
    font-weight: normal;

    text-transform: uppercase;
  }
  
  .delivery-abt{
    text-decoration: none;
    color: #42beef;
    background-color: transparent;
    font-size: 12px;
    cursor: default;
    position: relative;
    display: inline-block;
    z-index: 21;
    border: 0;
    padding: 0;
    margin: 0;
    margin-top: -4px;
  }
  .delivery-abu{
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  }
  .delivery-aaU {
    font-size: 14px;
    color: #414141;
  }
  .border-none{
    border:medium none !important;
  }
  .price-items{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .price-title {
    font-size: 12px;
    color: #adadad;
    margin-bottom: 3px;
  }
  .price-price {
    font-size: 14px;
    color: #414141;
  }

  .price-item-active {
    background-color: #FEF5F0 !important;
    position: relative !important;
    z-index: 4;
}



.item-props-title{
  font-size: .625em;
  margin-right: .1875em;
  text-transform: uppercase;
  -webkit-font-smoothing: auto;
}
.item-props-price{
  font-size: .875em;
}
.potify-tO {
  -webkit-box-flex: 1;
  -ms-flex: 1 0 25%;
  flex: 1 0 25%;
}
.potify-wF {
  display: inline-block;
  text-align: center;
}
.potify-wO {
  position: relative;
  width: 44px;
  height: 34px;
  line-height: 34px;
}
.potify-wN, .potify-wO {
  display: inline-block;
  vertical-align: top;
}
.potify-wO {
  position: relative;
  width: 44px;
  height: 34px;
  line-height: 34px;
}

.potify-wM {
  background-color: transparent;
  width: 44px;
  height: 44px;
  display: table-cell;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  color: #fef5f0;
  cursor: pointer;
  outline: 0!important;
}

.potify-sl {
  width: 18px;
  height: 3px;
}

.potify-wM {
  position: absolute;
  top: -5px;
}

.potify-wG {
  font-size: 12px;
  color: #adadad;
  margin-bottom: 3px;
}

.potify-wK .potify-wG {
  color: #505050;
}

.potify-wH {
  font-size: 14px;
  color: #414141;
}

.potify-wO {
  position: relative;
  width: 44px;
  height: 34px;
  line-height: 34px;
}

.potify-wM {
  background-color: transparent;
  width: 44px;
  height: 44px;
  display: table-cell;
  align-items: center;
  justify-content: center;
  border: 1px solid #888;
  border-radius: 50%;
  color: #888;
  cursor: pointer;
  outline: 0!important;
}

.potify-wM {
  position: absolute;
  top: -5px;
}

.potify-sn {
  width: 18px;
  height: 18px;
}

.potify-wN {
  margin: 0 20px;
  min-width: 45px;
}

.potify-tP {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 5px;
  flex: auto;
  position: relative;
}

.modal-title {
  font-size: 2rem;
  font-weight: normal;
}

.form-control{
  border-radius: 4px !important;
  font-size:14px;
  font-weight:normal;
  height: calc(2em + 1rem + 2px);
  padding: .5rem 1rem !important;
}

.form-control:hover{
  box-shadow:none;

}

.cartStokNum{
  height: calc(1em + 0.5rem + 2px);
  padding: .5rem 0.5rem !important;
}

.filterCheckbox{
  opacity:0;
}

.pointer{
  cursor:pointer;
}

.table.cart-table{
  font-size:12px;
}

.table.cart-table td{
  padding:15px 5px;
  vertical-align: middle;
}

.table.cart-table th{
  padding: 15px 5px;
}

.form-control.stock-cart-select{
  font-size: 12px !important;
  height: 35px !important;
  padding: 0 5px 0 !important;
}

.dropdown-item{
  font-size:14px;
  padding:.5rem 1.5rem;
  cursor:pointer
}

.list-group-item.active{
  border-radius:4px;
}

.btn-secondary:not(:disabled):not(.disabled).active, 
.btn-secondary:not(:disabled):not(.disabled):active, 
.show>.btn-secondary.dropdown-toggle {
  background-color: #f5f5f5;
  border-color: #28a745;
}


.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{
  background-color:#e9f7e0;
  border-color:#43b96d !important;
}


.nav-tabs{
  border-bottom:medium none;
}

.wizard-navbar {
  margin: 60px auto 20px;
}

.wizard-navbar > ul {
  display: table;
  width: 100%;
  text-align: center;
  margin: 0;
  font-weight: normal;
  padding: 0;
  list-style: none outside none;
  table-layout: fixed;
}

.wizard-navbar > ul li {
  display: table-cell;
  width: 1%;
  position: relative;
  padding: 0 10px;
}

.wizard-navbar > ul li:before, 
.wizard-navbar > ul li:after {
  content: '';
  position: absolute;
  height: 4px;
  width: 50%;
  background-color: #eeeeee;
  top: -32px;
  left: 0;
}

.wizard-navbar > ul li a{
  font-size:11px;
  text-transform: capitalize;
}

.wizard-navbar > ul li.active:before, 
.wizard-navbar > ul li.active:after {
  background-color: #ef4040;
}

.wizard-navbar > ul li.active a, .wizard-navbar > ul li.completed a {
  color: #505050;
}

.wizard-navbar > ul li:after {
  left: auto;
  right: 0;
}

.wizard-navbar > ul li.active:before, .wizard-navbar > ul li.active:after {
  background-color: #ef4040;
}



.wizard-navbar > ul li a span {
  background-color: #eee;
  border-radius: 50%;
  color: #898b8f;
  display: block;
  height: 40px;
  left: 50%;
  line-height: 40px;
  margin-left: -20px;
  margin-top: -50px;
  position: absolute;
  text-align: center;
  transition: all 300ms ease-in-out 0s;
  -webkit-transition: all 300ms ease-in-out 0s;
  -o-transition: all 300ms ease-in-out 0s;
  -moz-transition: all 300ms ease-in-out 0s;
  width: 40px;
  z-index: 5;
}


.wizard-navbar > ul li.active a span {
  background-color: #ef4040;
  color: #FFF;
}

.toast{
  border:medium none;
  width:70px;
  text-align: center;
}
.toast-body{
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.toast-header{
  padding: .75rem .75rem;
  font-size:10px;
}

.toast-header strong{
  font-weight:normal;
  color:#222;
}

.toast:not(:last-child){
  margin-bottom:0;
}

.table thead th{
  border-bottom: medium none;
}

.wizard-navbar > ul li.completed a span {
  background-color: #80bd4a;
  color: #FFF;
}

.wizard-navbar > ul li.completed:before, .wizard-navbar > ul li.completed:after {
  background-color: #80bd4a;
}

.wizard-navbar > ul li.completed:before, .wizard-navbar > ul li.completed:after {
  background-color: #80bd4a;
}




.btn-file {
  position: relative;
  overflow: hidden;
  vertical-align: middle;
}
.btn-file > input {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 23px;
  cursor: pointer;
  filter: alpha(opacity=0);
  opacity: 0;

  direction: ltr;
}
.fileinput {
  &.text-center {
    text-align: center;
  }
  .fa {
    font-size: 14px;
    margin-top: -6px;
    position: relative;
    top: 2px;
    margin-right: 4px;
  }
  display: inline-block;
  margin-bottom: 9px;

  input[type="file"] {
    display: none;
  }
}
.fileinput .form-control {
  display: inline-block;
  padding-top: 7px;
  padding-bottom: 5px;
  margin-bottom: 0;
  vertical-align: middle;
  cursor: text;
}
.fileinput .thumbnail {
  display: inline-block;
  margin-bottom: 10px;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  max-width: 250px;
  @include shadow-big();

  &.img-circle {
    border-radius: 50%;
    max-width: 100px;
  }
}
.fileinput .thumbnail > img {
  max-height: 100%;
  width: 100%;
  height: auto;
  margin-right: auto;
  margin-left: auto;
  display: block;
  max-width: 100%;
}
.fileinput .btn {
  vertical-align: middle;
}
.fileinput-exists .fileinput-new,
.fileinput-new .fileinput-exists {
  display: none;
}
.fileinput-inline .fileinput-controls {
  display: inline;
}
.fileinput-filename {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.form-control .fileinput-filename {
  vertical-align: bottom;
}
.fileinput.input-group {
  display: table;
}
.fileinput.input-group > * {
  position: relative;
  z-index: 2;
}
.fileinput.input-group > .btn-file {
  z-index: 1;
}
.fileinput-new.input-group .btn-file,
.fileinput-new .input-group .btn-file {
  border-radius: 0 4px 4px 0;
}
.fileinput-new.input-group .btn-file.btn-xs,
.fileinput-new .input-group .btn-file.btn-xs,
.fileinput-new.input-group .btn-file.btn-sm,
.fileinput-new .input-group .btn-file.btn-sm {
  border-radius: 0 3px 3px 0;
}
.fileinput-new.input-group .btn-file.btn-lg,
.fileinput-new .input-group .btn-file.btn-lg {
  border-radius: 0 6px 6px 0;
}
.form-group.has-warning .fileinput .fileinput-preview {
  color: #80bd4a;
}
.form-group.has-warning .fileinput .thumbnail {
  border-color: #80bd4a;
}
.form-group.has-error .fileinput .fileinput-preview {
  color: #80bd4a;
}
.form-group.has-error .fileinput .thumbnail {
  border-color: #80bd4a;
}
.form-group.has-success .fileinput .fileinput-preview {
  color: #80bd4a;
}
.form-group.has-success .fileinput .thumbnail {
  border-color: #80bd4a;
}
.input-group-addon:not(:first-child) {
  border-left: 0;
}
.thumbnail {
  border: 0 none;
  border-radius: 4px;
  padding: 0;
}
.picture-container {
  position: relative;
  cursor: pointer;
  text-align: center;
  .picture {
    width: 106px;
    height: 106px;
    background-color: #999999;
    border: 4px solid #cccccc;
    color: #ffffff;
    border-radius: 50%;
    margin: 5px auto;
    overflow: hidden;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;

    &:hover {
      border-color: $pink;
    }

    input[type="file"] {
      cursor: pointer;
      display: block;
      height: 100%;
      left: 0;
      opacity: 0 !important;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
  .picture-src {
    width: 100%;
  }
}



`;

export default GlobalStyle;
