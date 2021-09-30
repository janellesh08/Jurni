import React, { useState, useEffect } from 'react'
import Menu from './Menu'
import { connect } from 'react-redux'

const mapStateToProps = state => {
return {
    userId: state.userId
}
}

function BaseLayout(props){
    return(
        <div>
          {props.userId != ""? <Menu />: null}
            {props.children}
            <footer>Footer</footer>
        </div>
    )
}

export default connect(mapStateToProps)(BaseLayout);