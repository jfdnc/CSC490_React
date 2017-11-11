import React from 'react'
import OrgStore from  '../data/stores/OrgStore'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import {getAllVolOpsByOrg} from "../actions/org_actions";
import VolOpListing from "./VolOpListing"

export default class OrgView extends React.Component {
    constructor(props) {
        super(props)

        this.state = { orgState: {}, volOpState: {}, allVolOps: [] }
    }

    componentWillMount(){
        const orgInfo = JSON.parse(localStorage.getItem('orgInfo'))
        getAllVolOpsByOrg(orgInfo.orgVolOps)

        this.setState({orgState: OrgStore.getAll().org})
        this.setState({volOpState: OrgStore.getAll().volOp})
        this.setState({allVolOps: OrgStore.getAll().allVolOps})

        OrgStore.on('change', () => {
            this.setState({orgState: OrgStore.getAll().org})
            this.setState({volOpState: OrgStore.getAll().volOp})
            this.setState({allVolOps: OrgStore.getAll().allVolOps})
        })
    }

    render(){
        const allVolOps = this.state.allVolOps
        return(
            <div id='org-view' className='view-container'>
                <Dashboard type='org' />
                <Link to='/newvolop' className='btn btn-success'>New Volunteer Opportunity</Link>
                <div id='org-view-volops'>
                    {allVolOps.map(volop =>{
                        return(
                            <VolOpListing {...volop}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}
