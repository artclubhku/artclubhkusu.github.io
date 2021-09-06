import React, { Component } from 'react'
import Banner from '../components/Banner';
import { dataProvider } from '../providers';
import { pageview } from '../googleAnalytics';

export default class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      page: null,
      galleryLoaded: false,
    }
  }

  componentDidMount() {
    document.title = "Gallery";
    pageview(document.title, window.location.pathname);

    dataProvider.getList('pages', {
      pagination: { page: 1 , perPage: 1 },
      sort: { field: 'id', order: 'ASC' }, 
      filter: {"name": 'gallery'},
    }).then((res) =>{
      this.setState({page: res.data[0]});
    }).catch(err => {
      console.error(err);
    })

    dataProvider.getList('posts', {
      pagination: { page: 1 , perPage: 1000 }, 
      sort: { field: 'createdOn', order: 'DESC' },
      filter: {}
    }).then((res) =>{
      console.debug('res', res)
      var photos = [];
      res.data.forEach(post => {
        if (post.approved) {
          if (post.poster)
            photos.push(post.poster.src);
          if (post.images) {
            post.images.forEach(image => {
              photos.push(image.src);
            })
          }
        }
      })
      this.setState({photos: photos}, () => {this.initGallery()});
    }).catch(err => {
      console.error(err);
    })
  }

  componentWillUnmount() {
    var gallery = document.querySelector('#gallery');
    var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
    var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
    var resizeAll = function () {
      var altura = getVal(gallery, 'grid-auto-rows');
      var gap = getVal(gallery, 'grid-row-gap');
      gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        var el = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
      });
    };
    
    window.removeEventListener('resize', resizeAll);
    gallery.querySelectorAll('img').forEach(function (item) {
      item.removeEventListener('load', function () {
        var altura = getVal(gallery, 'grid-auto-rows');
        var gap = getVal(gallery, 'grid-row-gap');
        var gitem = item.parentElement.parentElement;
        gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
        item.classList.remove('byebye');
      });
    })

    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
      item.removeEventListener('click', function () {        
        item.classList.toggle('full');        
      })
    })
  }

  initGallery = () => {
    var gallery = document.querySelector('#gallery');
    var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
    var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };

    var resizeAll = function () {
      var altura = getVal(gallery, 'grid-auto-rows');
      var gap = getVal(gallery, 'grid-row-gap');
      gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        var el = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
      });
    };

    gallery.querySelectorAll('img').forEach(function (item) {
      item.classList.add('byebye');
      if (item.complete) {
        var altura = getVal(gallery, 'grid-auto-rows');
        var gap = getVal(gallery, 'grid-row-gap');
        var gitem = item.parentElement.parentElement;
        gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
        item.classList.remove('byebye');
      }
      else {
        item.addEventListener('load', function () {
          var altura = getVal(gallery, 'grid-auto-rows');
          var gap = getVal(gallery, 'grid-row-gap');
          var gitem = item.parentElement.parentElement;
          gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
          item.classList.remove('byebye');
        });
      }
    });
    
    window.addEventListener('resize', resizeAll);
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        item.addEventListener('click', function () {        
            item.classList.toggle('full');        
        });
    });
  }

  render() {
    const { page, photos } = this.state;

    return (
      <React.Fragment>
        <Banner page={page}/>
        <main class="mb-4">
          <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-md-10 col-lg-8 col-xl-7"><p>{page && page.descriptions}</p></div>
            </div>
            <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="gallery" id="gallery">
                {
                  photos.map( src =>(
                    <div class="gallery-item">
                      <div class="content"><img src={src} alt="alt text" /></div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div class="row gx-4 gx-lg-5 justify-content-center"><div class="col-md-10 col-lg-8 col-xl-7"></div></div>
          </div>
        </main>
      </React.Fragment>
    )
  }
}
