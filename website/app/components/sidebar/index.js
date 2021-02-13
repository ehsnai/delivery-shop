import React from 'react';
import Brand from 'components/brand'
import Filter from 'components/filter'
import {Wrapper,BrandWrapper,SideFilter} from './Styles';
import ProfileSidebar from 'components/profileSidebar'




class Sidebar extends React.Component {

    constructor(props){
        super()

    }



  render() {
    console.log("path ------>",this.props.path)

    return (
        <Wrapper>

            <Brand
                src = {this.props.logo}
                alt ={this.props.subBrand}
                className ={this.props.brandClasses}
            />

            {this.props.path == 'home' && 

                <SideFilter>

                    <Filter
                        filters = {this.props.filters}
                        searchText = 'Search Products'
                    />

                </SideFilter>

            } 

            {this.props.path != 'home' && 
            
                <SideFilter>

                    <ProfileSidebar path={this.props.path} />

                </SideFilter>

            }









        </Wrapper>
    );
  }
}

export default Sidebar;
