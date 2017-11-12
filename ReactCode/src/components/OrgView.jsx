import React from 'react'
import OrgStore from  '../data/stores/OrgStore'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import { getAllVolOpsByOrg } from "../actions/org_actions";
import { Button } from 'react-materialize'

export default class OrgView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          ...props
        }
    }

    render(){
        const allVolOps = this.state.allVolOps
        return(
            <div id='org-view' className='view-container'>
                <Link to='/newvolop'><Button>New Volunteer Opportunity</Button></Link>
                <div id='org-view-volops'>
                  <h3>ID{this.state._id}</h3>
                  <h3>Org Name{this.state.orgName}</h3>
                </div>
            </div>
        )
    }
}
