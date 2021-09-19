import React, { useState, useEffect } from 'react';
import { dataProvider } from '../providers'; 
import { formatDate } from '../utils';

export default function Banner({post, page}) {
  const [bannerUrl, setBannerUrl] = useState();

  useEffect(() => {
    if (!bannerUrl && post) {
      dataProvider.getList('pages', {
        pagination: { page: 1 , perPage: 1 },
        sort: { field: 'id', order: 'ASC' }, 
        filter: {"name": 'post'},
      }).then((res) =>{
        setBannerUrl(res.data[0].banner.src)
      }).catch(err => {
        console.error(err);
      })
    }
    if (!bannerUrl && page) {
      setBannerUrl(page.banner.src);
    }
  }, [bannerUrl, post, page])

  return (
    <React.Fragment>
      {/* Page Header */}
      <header className="masthead" style={{backgroundImage: `url(${bannerUrl})`}}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
                {post && (
                  <div className="post-heading">
                    <h1>{post.heading}</h1>
                    <h2 className="subheading">{post.subHeading}</h2>
                    <span className="meta">Post written on {formatDate(post.createdOn)},  {post.lastupdate && "last updated on " + formatDate(post.lastupdate)}</span>
                  </div>
                )}
                {page && (
                  <div className="site-heading">
                    <h1>{page.heading}</h1>
                    <span className="subheading">{page.subHeading}</span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}
