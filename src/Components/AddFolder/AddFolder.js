import React from 'react';
import PropTypes from 'prop-types';
import './AddFolder.css'

function AddFolder(props){
    return (
        <section className='AddFolder'>
            <h2>Create a folder</h2>
            <form className={'formFolder'} onSubmit={(e) => props.onAddFolder(e)}>
                {props.validateFolder}
                <label htmlFor="Folder-add">Add Folder:</label>
                <input required name="add-folder" id="add-folder" onChange={(val) => props.updateFolder(val.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default AddFolder;

AddFolder.propTypes = {
    onAddFolder: PropTypes.func,
    updateFolder: PropTypes.func
}