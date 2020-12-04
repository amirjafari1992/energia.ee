import React from 'react'
import './styles/loading.scss'

const Loading = () => {
    return (
        <div className="c-loading">
            <div className="c-loading__wrap">
                <img
                    src="https://lh3.googleusercontent.com/jkZPfqVjK0_wGoy3wISSptTb1DjlIIIbyl8mICxC9XYYuzY7anMcihMUHBbDH5opulo"
                    className="c-loading__image"
                />
                <span className="c-loading__text">Please wait...</span>
            </div>
        </div>
    )
}

export default Loading
