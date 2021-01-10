import React from 'react';
import './Banner.css'

const Banner = ({
  title = 'Title',
  description = "",
  className
}) => {
  return (
    <div className="banner py-5">
      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">
            {title}</h1>
          <p class="lead text-muted">
            {description}</p>
          {/* <p>
                 <a href="#" class="btn btn-primary my-2">Crie novas notas</a>
                 <a href="#" class="btn btn-secondary my-2">Secondary action</a>
               </p> */} </div>
      </section>
    </div>
  );
}

export default Banner;
