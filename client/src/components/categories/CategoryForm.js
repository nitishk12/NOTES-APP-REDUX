import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';

class CategoryForm extends React.Component {

    constructor(props) {
        super()
        this.state = {
            name: props.category ? props.category.name : ''
        }
    }

    handleFormChamge = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        console.log(formData)
        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div>
                <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleFormChamge} placeholder="Enter Category" style={{ width: "200px" }} />
                <br></br>
                <Button color="primary" onClick={this.handleSubmit} >submit</Button>{' '}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        category: state.categories.find(cat => cat._id == props.category)
    }
}

export default connect(mapStateToProps)(CategoryForm)