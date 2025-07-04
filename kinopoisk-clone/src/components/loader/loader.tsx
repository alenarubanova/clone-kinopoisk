import React from 'react'
import style from './loader.module.css'

export class Loader extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className={style.container}> 
          <span className={style.text}>Show more</span>
          <div className={`spinner-border ${style.spinner}`} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }
}