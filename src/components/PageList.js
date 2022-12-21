import React from "react"
import pageOpenings from "../extras/resources"

export default function PageList(props) {
    
    // Array of Quran page indices 1 .. 604 to compute sidebar links
    const pagesList = [...Array(604).keys()]
  
    return (
        <ul>
        {pagesList.map((value) => (
            <li key={value}>
            {((value - 1) % 20 === 0 && value !== 1 && value < 601 ) ? <p class = "juz-level">{"Juz "+ Math.ceil(( value - 2 ) / 20 + 1 )}</p> : value === 0 ? <p class = "juz-level">Juz 1</p> : <></>}
            <div className="navlist">
              <p className="page-number" onClick={props.onClick} id={value}>{value+1}</p>
              <p className = "opening" onClick={props.onClick} id={value}>{pageOpenings[value]}</p>
              </div>
            </li>           
          )
          )
          }
        </ul>
    )
}