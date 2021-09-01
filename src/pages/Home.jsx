import React, { Component } from 'react'
import Banner from '../components/Banner';
import Loader from '../components/Loader';
import PostCard from '../components/posts/PostCard';
import { dataProvider } from '../providers';
import { pageview } from '../googleAnalytics';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      page: null,
    }
  }

  componentDidMount() {
    if (window.location.pathname === '/dist') {
      document.title = "Art Club HKU - dist";
      pageview(document.title, window.location.pathname);
    } else {
      pageview(document.title, window.location.pathname);
    }
      

    dataProvider.getList('posts', {
      pagination: { page: 1 , perPage: 100 }, 
      sort: { field: 'createdOn', order: 'DESC' },
      filter: {},
    }).then(res => {
      this.setState({
        posts: res.data,
      })
    }).catch(err => {
      console.error(err);
    })

    dataProvider.getList('pages', {
      pagination: { page: 1 , perPage: 1 }, 
      sort: { field: 'id', order: 'ASC' }, 
      filter: {"name": 'home'},
    }).then((res) =>{
      this.setState({page: res.data[0]});
    }).catch(err => {
      console.error(err);
    })
  }
  
  render() {
    const { posts, page } = this.state;
    
    return (
      <React.Fragment>
        <Banner page={page}/>
        {/* Main Content */}
        {page && posts.length > 0 ? (
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <h3>News & Upcoming Events</h3>
                <hr className="my-4" />
              </div>
            </div>
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                {posts.map(post => (post.approved?<PostCard post={post} />:null))}
              </div>
            </div>
          </div>
        ):(
          <Loader />
        )}
        
      </React.Fragment>
    )
  }
}
