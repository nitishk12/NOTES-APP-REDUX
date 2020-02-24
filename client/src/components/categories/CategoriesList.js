import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CategoryForm from './CategoryForm'
import { startRemoveCategory, startAddCategory } from '../../actions/categoriesAction'
import Swal from 'sweetalert2'

function CategoriesList(props) {

    const handleSubmit = (formData) => {
        console.log(formData)
        props.dispatch(startAddCategory(formData))
    }

    const handleRemove = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                props.dispatch(startRemoveCategory(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }



    return (
        <div className="row">
            <div className="col-md-8">
                <h2>categories - {props.categories.length}</h2>
                <ul className="list-group">
                    {props.categories.map(cat => {
                        return <li key={cat._id}
                            className="list-group-item"><span className="text-uppercase">{cat.name}
                                <button onClick={() => {
                                    handleRemove(cat._id)
                                }} className="btn btn-danger btn-sm float-right">remove</button>
                                <Link to={`/categories/category-detail/${cat._id}`} ><button className="btn btn-success btn-sm float-right">view detail</button></Link></span></li>
                    })}
                </ul>
            </div>
            <div className="col-md-4">
                <h1> Add Category</h1>
                <CategoryForm handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(CategoriesList)