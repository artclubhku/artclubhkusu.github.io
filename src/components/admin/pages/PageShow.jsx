import React from 'react';
import { Show, SimpleShowLayout, TextField, ImageField } from 'react-admin';

const PostShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>

        <TextField source="id" />
        <TextField source="name" />
        <ImageField source="banner.src"/>

        {/* {false === 'about' && (
          <React.Fragment>
            <RichTextField source="contentUpper" />
            <ImageField source="imgMid.src"/>
            <RichTextField source="contentLower" />
          </React.Fragment>
        )}

        {false === 'contact' && (
          <React.Fragment>
            <RichTextField source="content" />
            <ImageField source="imgDir.src"/>
            <UrlField source="regMemberLink" label="Link to register as new member"/>
            <UrlField source="dirVidLink" label="Link to Youtube Video on how to get to Art Studio"/>
          </React.Fragment>
        )}

        {false === 'gallery' && (
          <React.Fragment>
            <TextField source="descriptions" />
          </React.Fragment>
        )} */}

      </SimpleShowLayout>
    </Show>
  )
};

export default PostShow;
