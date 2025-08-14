import React from 'react'

export default function Footer(){
  return (
    <div className="row" style={{justifyContent:'space-between', width:'100%'}}>
      <p>© {new Date().getFullYear()} Gadzet Shop • Built with React + Express + MongoDB</p>
      <p>Made by Aditya Tiwari • <span className="badge">JWT Auth</span> <span className="badge">REST API</span></p>
    </div>
  )
}
