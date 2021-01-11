import React from 'react';
import './Banner.css'

const Banner = ({
  title = 'Title',
  description = "",
  className
}) => {
  return (
    <div className="banner py-5">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">
            {title}</h1>
          <p className="lead text-muted">
            {description}</p>
          {/* <p>
                 <a href="#" className="btn btn-primary my-2">Crie novas notas</a>
                 <a href="#" className="btn btn-secondary my-2">Secondary action</a>
               </p> */} </div>
      </section>
    </div>
  );
}

export default Banner;
