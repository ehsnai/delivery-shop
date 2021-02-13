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

import {product} from './data'


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const requestData = (userType,sorted,pageSize,page,searchText,dateStart,dateEnd) => {

  return new Promise((resolve, reject) => {

      let orderBy = '_id', desc = 'true', wheres = null;
      sorted.map(sort => {
       orderBy = sort.id;
        desc = sort.desc;
     });

      axios({
          method: "get",
          url: `${API_URL}tickets?page=${page}&pageSize=${pageSize}&sOrderBy=${orderBy}&sDesc=${desc}&wheres=${searchText}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
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

  });
});
};

class TicketList extends React.Component {


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

  }

  fetchData(state, instance) {
    this.setState({loading: true});
    requestData(
        this.state.userType,
        state.sorted,
        state.pageSize,
        state.page,
        this.state.searchText,
        this.state.dateStart,
        this.state.dateEnd,
    ).then(res => {
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false,
        count: res.count
      });
    });
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
                Ticket
                <small> - <Link to={`/admin/product`} >Ticket List</Link> </small>                               
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
                    width: 50,
                    filterable: false,
                    sortable : false,
                    Cell: row => {
                        return(
                            `${row.index + 1}`
                        )
                    }
                  },

                  {
                    Header: " Text",
                    id: "text",
                    accessor: d => d.text,
                    width: 150,
                    filterable: false,
                  },


                  {
                    Header: "Type",
                    id: "type",
                    accessor: d => d.type,
                    width: 90,
                    filterable: false,
                  },

                  {
                    Header: "Status",
                    id: "status",
                    accessor: d => d.status,
                    width: 90,
                    filterable: false,
                  },

                  {
                    Header:"Operations",
                    accessor: "_id",
                    filterable: false,
                    sortable : false,
                    width:150,
                    Cell: row => (
                      <div>

                        <Link to={`/tickets/edit/${row.value}`} className="mr-2">
                          <Button color="primary" className="jr-btn btn-orange jr-btn-xs">
                            view ticket
                          </Button>
                        </Link>

                        <Button color="danger" className="jr-btn btn-red jr-btn-xs" onClick={(evt) => this.remove(row.value)}>
                            ignore
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

TicketList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TicketList);
