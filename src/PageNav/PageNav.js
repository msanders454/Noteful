import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Circle from '../Circle/Circle'
import './PageNav.css'

export default function PageNav (props) {
    return (
      <div className='PageNav'>
        <Circle
          tag='button'
          role='link'
          onClick={() => props.history.goBack()}
          className='PageNavBack'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </Circle>
        {props.folders && (
          <h3 className='PageNavFolder'>
            {props.folders.name}
          </h3>
        )}
      </div>
    )
      
}
PageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}