import {
  Show, 
  SimpleShowLayout, 
  TextField, 
  RichTextField, 
  DateField, 
  ImageField, 
  UrlField, 
  BooleanField, 
  Datagrid, 
  ArrayField, 
  TopToolbar, 
  EditButton 
} from 'react-admin';
import { PreviewButton } from './PostList';
import { makeStyles } from '@material-ui/styles';
import * as React from "react";

const classes = makeStyles(theme => ({
  root: {
    height: '90%'
  },
})); 

const PostShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
      <EditButton basePath={basePath} record={data} />
      <PreviewButton record={data} classes={classes}/>
  </TopToolbar>
);

const PostShow = (props) => (
  <Show actions={<PostShowActions />} {...props}>
      <SimpleShowLayout>
          <TextField source="id" />
          <BooleanField source="approved" />

          <TextField source="heading" />
          <TextField source="subHeading" label="Sub Heading"/>
          <ArrayField source="eventDates">
            <Datagrid>
              <DateField source="date" />
            </Datagrid>
          </ArrayField>

          <UrlField source="signupLink" label="Signup Link"/>

          <RichTextField source="content" />

          <ImageField source="poster.src" title="title"/>
          <ArrayField source="images">
            <Datagrid>
              <ImageField source="src" label=""/>
            </Datagrid>
          </ArrayField>
          

          <DateField label="Publication date" source="createdOn" />
      </SimpleShowLayout>
  </Show>
);

export default PostShow;
