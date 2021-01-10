import React from 'react';

import bgHome from '../assets/images/bgHome.jpg';
import Banner from './Banner';
import Layout from './Layout';

const Home = () => {
  return (
    <Layout >
      <Banner title="Home Page" description="Home page for my app."  />
      <div>
           <div class="album py-5 bg-light">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <div class="card mb-4 box-shadow">
                    <img src={bgHome}
                      alt="bgHome"
                      class="card-img-top"
                      style={{ height: '225px',width: '100%', display: 'block'}}/>
                    <div class="card-body">
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small class="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mb-4 box-shadow">
                    <img src={bgHome}
                      alt="bgHome"
                      class="card-img-top"
                      style={{ height: '225px',width: '100%', display: 'block'}}/>
                    <div class="card-body">
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small class="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mb-4 box-shadow">
                    <img src={bgHome}
                      alt="bgHome"
                      class="card-img-top"
                      style={{ height: '225px',width: '100%', display: 'block'}}/>
                    <div class="card-body">
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small class="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mb-4 box-shadow">
                    <img src={bgHome}
                      alt="bgHome"
                      class="card-img-top"
                      style={{ height: '225px',width: '100%', display: 'block'}}/>
                    <div class="card-body">
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small class="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </Layout>
   
  );
}

export default Home;
