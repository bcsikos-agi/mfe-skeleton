import React from 'react'
import ReactJson from 'react-json-view'


export default ({ jsonWebToken }) => {
    return (
        <ReactJson src={jsonWebToken} />
    )
}