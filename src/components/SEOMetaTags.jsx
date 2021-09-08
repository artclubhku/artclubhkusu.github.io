import React from 'react'
import Helmet from 'react-helmet'
import { ReactSEOMetaTags } from 'react-seo-meta-tags'

const siteMetadata = {
  url: 'https://artclubhkusu.github.io',
  title:  'Official Page for Art Club HKU',
  description: 'The offical website for Art Club HKU, under the Cultural Association at The University of Hong Kong.',
  language: 'en-US',
  author: {
    email: 'artclubhkusu@gmail.com',
    name: 'Art Club HKU',
  },
}

export default function SEOMetaTags() {
  return (
    <ReactSEOMetaTags
      render={(el) => <Helmet>{el}</Helmet>}
      website={{ ...siteMetadata }}
    />
  )
}
