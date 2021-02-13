import React from "react";
import PropTypes from "prop-types";

// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import {Link} from 'react-router-dom';

import Info from "components/Typography/Info.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import axios from 'axios';
import { API_URL } from '../../config'

import Moment from 'moment'

import {users} from './data'

import swal from "sweetalert";


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const requestData = (sorted,pageSize,page) => {

  return new Promise((resolve, reject) => {

    console.log("token:",localStorage.getItem('token'))

      let orderBy = '_id', desc = 'true', wheres = null;
      sorted.map(sort => {
       orderBy = sort.id;
desc = sort.desc;
     });

      axios({
          method: "get",
          url: `${API_URL}users?page=${page}&pageSize=${pageSize}&sOrderBy=${orderBy}&sDesc=${desc}`,
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `${localStorage.getItem('token')}`
          }
      })       
      .then((response) => {
          console.log("response : ==> ", response)

      const res = {
          rows: response.data.data,
          pages: Math.ceil(response.data.totalCount / pageSize),
          count: response.data.totalCount
      };
      setTimeout(() => resolve(res), 500);

    })
});
};

class UserList extends React.Component {

  constructor() {
    super()
    this.state = {
      data       : [],
      pages      : null,
      loading    : false,
      count      : null,
      selected   : [],
      selectAll  : 0,

    }
    this.fetchData = this.fetchData.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  fetchData(state, instance) {
    this.setState({loading: true});
    requestData(
        state.sorted,
        state.pageSize,
        state.page,
    ).then(res => {
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false,
        count: res.count
      });
    })
  }

  toggleRow(id) {
    console.log("id for delete ===>>", id)
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[id] = !this.state.selected[id];
    this.setState({
        selected: newSelected,
        selectAll: 2
    }
    ,()=>{
        console.log("selected state ===>>", this.state.selected)
    });
  }

  toggleSelectAll() {
    let newSelected = {};
    if (this.state.selectAll === 0) {
        this.state.data.forEach(x => {
            console.log("xxxx ==> ", x)
            newSelected[x._id] = true;
        });
    }
    this.setState({
        selected: newSelected,
        selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  handleDelete(evt) {

    const userId = evt.currentTarget.value

        swal({
            title: "Are you sure ?",
            text: "If you accept your data won't restore again",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

              axios({
                  method: "put",
                  url: `${API_URL}usersDelete`,
                  headers: {
                      'Content-Type': 'application/json',
                      "authorization": `${localStorage.getItem('token')}`
                  },
                  data : {
                    userId : userId
                  }
              })         
              .then((response) => {

                  if (response.status === 200) {
      
                      swal("Your records has been Deactivate", {
                        icon: "success",
                      }).then((response) => {
                        window.location.reload();
                      });
          
                    } else {
                      swal("Error in Server", "You clicked the button!", "error");
                    }
  
              });
  

            } else {

                console.log("nothing")

            }

        });


  }


  render() {

    const { classes } = this.props;
    const { data, pages, loading, count, message } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Users
                <small> - <Link to={`/admin/product`} >Add Product</Link> </small>                               
                
              </h4>

            </CardHeader>
            <CardBody>
              <ReactTable
                data={data}
                loading={loading} 
                onFetchData={this.fetchData} 
                defaultPageSize={10}
                pages={pages} 
                filterable
                columns={[
                  {
                    id: "checkbox",
                    accessor: "",
                    Cell: ( row ) => {
                        return (
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={this.state.selected[row.original._id] === true}
                                onChange={() => this.toggleRow(row.original._id)}
                            />
                        );
                    },
                    Header: title => {
                        return (
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={this.state.selectAll === 1}
                                ref={input => {
                                    if (input) {
                                        input.indeterminate = this.state.selectAll === 2;
                                    }
                                }}
                                onChange={() => this.toggleSelectAll()}
                            />
                        );
                    },
                    filterable: false,
                    sortable : false,
                    width: 40,
                    },                
                    {
                    Header: title => {
                        return(<span>Num</span>)
                    },
                    width: 70,
                    filterable: false,
                    sortable : false,
                    Cell: row => {
                        return(
                            `${row.index + 1}`
                        )
                    }
                  },
                  {
                    Header: title =>{
                        return(<span>Profile Pic</span>)
                    },
                    width: 110,
                    filterable: false,
                    sortable : false,
                    Cell: row => {

                        return(
                            <a href="">
                                <div className="datatable-profile" style={{backgroundImage: `url(${row.original.cardIdImage})`}}></div>
                            </a>
                        )
                    }
                },

                  {
                    Header: "Name",
                    id: "firstName",
                    accessor: d => d.firstName,
                    width: 150,
                    filterable: false,
                  },

                  {
                    Header: "Last Name",
                    id: "lastName",
                    accessor: d => d.lastName,
                    width: 150,
                    filterable: false,
                  },

                  {
                    Header: "Email",
                    id: "email",
                    accessor: d => d.email,
                    width: 250,
                    filterable: false,
                  },

                  {
                    Header: "Mobile",
                    id: "mobile",
                    accessor: d => d.mobile,
                    width: 150,
                    filterable: false,
                  },

                  {
                    Header: "ID Number",
                    id: "idNumber",
                    accessor: d => d.idNumber,
                    width: 150,
                    filterable: false,
                  },

                  {
                    Header: "type",
                    id: "type",
                    accessor: d => d.type,
                    width: 150,
                    filterable: false,
                  },
                  {
                    Header: "Membership",
                    id: "membership",
                    accessor: d => d.membership,
                    width: 150,
                    filterable: false,
                  },
                  {
                    Header: "status",
                    id: "status",
                    accessor: d => d.status,
                    width: 150,
                    filterable: false,
                  },
                  {
                    Header: "Orders",
                    id: "orders",
                    width: 150,
                    filterable: false,
                    Cell : row => {
                        return(
                          <Link to={`/userOrder/${row.value}`} className="mr-2">
                            {row.original.orders}
                        </Link>
                        )
                    }
                  },
                  {
                      Header: "Purchase",
                      id: "purchase",
                      width: 150,
                      filterable: false,
                      Cell : row => {
                          return(
                            <Link to={`/userPurchase/${row.value}`} className="mr-2">
                              {row.original.purchase}
                          </Link>
                          )
                      }
                  },
                  {
                    Header: "Tickets",
                    id: "tickets",
                    width: 150,
                    filterable: false,
                    Cell : row => {
                        return(
                          <Link to={`/userTickets/${row.value}`} className="mr-2">
                            {row.original.tickets}
                        </Link>
                        )
                    }
                  },
                  {
                    Header: "Coupons",
                    id: "coupons",
                    width: 150,
                    filterable: false,
                    Cell : row => {
                        return(
                          <Link to={`/userCoupons/${row.value}`} className="mr-2">
                            {row.original.coupons}
                        </Link>
                        )
                    }
                  },
                  {
                    Header: "Register Time",
                    id: "lastOnlineStatus",
                    width: 200,
                    filterable: false,
                    Cell : row => {
                        return(
                            <span className='text-success'>{Moment(row.original.lastOnlineStatus).format("lll")}</span>
                        )
                    }
                },

                  {
                    Header:"Operations",
                    accessor: "_id",
                    filterable: false,
                    sortable : false,
                    minWidth:150,
                    Cell: row => (
                      console.log(row),
                      <div>
                        {
                          /*
                        <Link to={`/users/edit/${row.value}`} className="mr-2">
                          <Button color="warning" className="jr-btn btn-orange jr-btn-xs">
                            Edit
                          </Button>
                        </Link>

                          */

                        }


                        <Button color="danger" value={row.value} className="jr-btn btn-red jr-btn-xs" onClick={this.handleDelete}>
                            Delete
                        </Button>

                      </div>
                    )            

                }



                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );

  }
  
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
