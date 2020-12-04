import React from 'react'
import Joi from 'joi-browser'
import { login } from '../repository'
import { Form } from './common/form'

export default class Login extends Form {
    schema = {
        username: Joi.string()
            .required()
            .label('Username'),
        password: Joi.string()
            .required()
            .label('Password'),
    }

    doSubmit(data) {
        login(data)
            .then(token => (window.location = '/'))
            .catch(err => alert(err))
    }

    render() {
        const { errors, data } = this.state

        return (
            <div className="container">
                <hr />
                <div className="col-sm-8 col-sm-offset-2">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3>Log in </h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    onChange={this.handleChange}
                                />
                                {errors.username && (
                                    <div className="alert alert-danger mt-2">
                                        {errors.username}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    onChange={this.handleChange}
                                />
                                {errors.password && (
                                    <div className="alert alert-danger mt-2">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={this.handleSubmit}
                                className="btn btn-default"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
