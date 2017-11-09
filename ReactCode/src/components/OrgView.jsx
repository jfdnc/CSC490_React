import React from 'react'
import OrgStore from  '../data/stores/OrgStore'
import { Link } from 'react-router-dom'

export default class OrgView extends React.Component {
    constructor(props) {
        super(props)

        this.state = { orgState: {}, volOpState: [] }
    }

    componentWillMount(){
        this.setState({orgState: OrgStore.getAll().org})

        OrgStore.on('change', () => {
            this.setState({orgState: OrgStore.getAll().org})
        })
    }

    render(){
        return(
            <div id='org-view' className='view-container'>
                <Link to='/newvolop' className='btn btn-success'>New Volunteer Opportunity</Link>
            </div>
        )
    }
}
