import React from 'react'
import { connect } from 'react-redux'
import CategoryForm from './CategoryForm'
import { startEditCategory } from '../../actions/categoriesAction'

class CategoryEdit extends React.Component {

    handleSubmit = (formData) => {
        const redirect = () => this.props.history.push(`/categories/category-detail/${this.props.match.params.category}`)
        this.props.dispatch(startEditCategory(this.props.match.params.category, formData, redirect))
    }

    render() {
        return (
            <div>
                <h1>Edit Category</h1>
                <br></br>
                <CategoryForm handleSubmit={this.handleSubmit} category={this.props.match.params.category} />
            </div>
        )
    }
}

export default connect()(CategoryEdit)