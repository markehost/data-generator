import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

export const SchemaBuilder = ({
  router,


  editor,
  preview,
  schema,

  type,


  selectGenerationType,
  selectEditorState,
}) => {
  // console.log("test")

  const handleSelectEditor = ( event ) => {
    // console.log("event", event.target.id);
    // console.log("router", router );

    selectEditorState(event)
    // router.push( `/${event.target.id}` )

    // TODO: how do I programmatically go to this state without requiring the "schema-builder" parent URL portion?
    // this would mean if i change the name above it needs to change every where below it.
    browserHistory.push(`/schema-builder/${event.target.id}`)

  }

  // ASSIGN THE CONTENT FOR THE EDITOR SPACE
  let editorContent;
  if ( editor ) {
    editorContent = (
      <div>{ editor }</div>
    )
  }

  return (
    // { preview ? 'checked' : '' }
    <div style={{margin: '0 auto'}}>
      <h2>Schema Builder: { type }</h2>


      <div>
        <label htmlFor="preview">
          <input checked={preview} name="previewState" type="radio" id="preview" value={true} onChange={ handleSelectEditor }/>
          Preview
        </label>

        <label htmlFor="editor">
          <input checked={!preview} name="previewState" type="radio" id="editor" value={false} onChange={ handleSelectEditor }/>
          Editor
        </label>
      </div>


      { editorContent }


      <div>
        <label htmlFor="user">
          <input name="dataType" type="radio" id="user" value="user" onChange={ selectGenerationType }/>
          User Data
        </label>

        <label htmlFor="faker">
          <input name="dataType" type="radio" id="faker" value="faker" onChange={ selectGenerationType }/>
          Faker Data
        </label>
      </div>


    </div>
  )
}

SchemaBuilder.propTypes = {
  // REACT-ROUTER TEMPLATE PROP THAT IS ASSIGNED IN CHILD ROUTES UNDER THE 'EDITOR' PROP NAME
  // This is actually an object, but is a react component which qualifies as a node
  editor: PropTypes.node.isRequired,

  // DETERMINES WHETHER TO SHOW PREVIEW VIEW OR THE DEFAULT VIEW (EDITOR)
  preview: PropTypes.bool.isRequired,
  // THE JSF SCHEMA OBJECT (INSTRUCTIONS) BEING BUILT BY USER AND PASSED DOWN TO RENDER GENERATED DATA
  schema: PropTypes.object.isRequired,
  // REDUX ACTION TO SET GENERATOR TYPE (FAKER, USER)
  selectGenerationType: PropTypes.func.isRequired,
  // REDUX ACTION TO SET EDITOR STATE (PREVIEW, EDITOR)
  selectEditorState: PropTypes.func.isRequired,



  // FAKER TYPE OF DATA - CONTROLS THE EDITOR OPTIONS BELOW IT
  // TODO: MOVE INTO EDITOR VIEW
  type: PropTypes.string.isRequired,
}

export default SchemaBuilder
