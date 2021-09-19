import React from 'react'
import { List, Datagrid, TextField, ShowButton, EditButton, BooleanField, DateField } from 'react-admin';
import { Button } from '@material-ui/core';
import ImageEye from '@material-ui/icons/RemoveRedEye';

export function PreviewButton(props) {
  const { record } = props;

  return (
    <div>
      <Button 
        color="primary"
        href={`/post?id=${record.id}`}
        label='ra.action.show'
      >
        <ImageEye />
        <span style={{marginLeft:'6px'}}>Preview</span>
      </Button>
    </div>
  )
}

const PostList = (props) => (
  <List {...props} sort={{ field: 'createdOn', order: 'DESC' }}>
      <Datagrid>
          <TextField source="id" />
          <TextField source="heading" />
          <TextField source="subHeading" />
          <DateField source="createdOn" label="Created Date"/>
          <DateField source="lastupdate" label="Last Modified Date"/>
          <BooleanField source="approved" />
          <ShowButton />
          <EditButton />
          <PreviewButton />
      </Datagrid>
  </List>
);

export default PostList;
