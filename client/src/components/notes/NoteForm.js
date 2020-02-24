import React from 'react'
import { Button, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css'

class NoteForm extends React.Component {

    constructor(props) {
        super()
        console.log('propsssss', props.categories)
        this.state = {
            title: props.note ? props.note.title : '',
            description: props.note ? props.note.description : '',
            categories: props.categories,
            category: ''
        }
    }

    handleForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitNote = (e) => {
        e.preventDefault()
        const formData = {}
        formData.title = this.state.title
        formData.description = this.state.description
        this.state.category != "" && (formData.category = this.state.category)

        console.log(formData)

        this.props.handleSubmitNote(formData)
    }

    handleCategory = (e) => {
        console.log(e.target.value)
        this.setState({ category: e.target.value })
    }

    render() {
        return (
            <div>{console.log('temp', this.props.note)}

                <Form>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" value={this.state.title} onChange={this.handleForm} placeholder="Enter your Title" />
                    <br></br>
                    <Label for="description">Description</Label>
                    <Input type="textarea" name="description" id="description" value={this.state.description} onChange={this.handleForm} placeholder="with a placeholder" />
                    <Label for="category">Select Category</Label>
                    <Input type="select" name="category" id="category" onChange={this.handleCategory} >
                        <option>Select</option>
                        {
                            this.props.categories.map(cat => {
                                return <option key={cat._id} value={cat._id} >{cat.name}</option>
                            })
                        }
                    </Input>
                    <br></br>
                    <Button color="primary" onClick={this.handleSubmitNote} >SUBMIT</Button>{' '}
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        categories: state.categories,
        note: state.notes.find(note => note._id == props.note)
    }
}

export default connect(mapStateToProps)(NoteForm)