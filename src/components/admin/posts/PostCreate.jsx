import { BooleanInput, Create, SimpleForm, TextInput, DateInput, required, ImageField, ImageInput, ArrayInput, SimpleFormIterator } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

const PostCreate = (props) => (
  <Create {...props}>
      <SimpleForm>
        <BooleanInput source="approved" defaultValue={false}/>
        
        <TextInput source="heading" />
        <TextInput source="subHeading"/>
        <ArrayInput source="eventDates">
          <SimpleFormIterator>
            <DateInput source="date" />
          </SimpleFormIterator>
        </ArrayInput>
        
        <TextInput source="signupLink" label="Signup Link"/>
        <BooleanInput source="signupActive" defaultValue={true}/>

        <RichTextInput source="content" validate={required()} />
        <ImageInput source="poster" accept="image/*">
          <ImageField source="src" title="title"/>
        </ImageInput>
        <ImageInput source="images" accept="image/*" multiple>
          <ImageField source="src" title="title"/>
        </ImageInput>
        <DateInput label="Publication date" source="createdOn" defaultValue={new Date()} validate={required()} />
      </SimpleForm>
  </Create>
);

export default PostCreate;
