import React from 'react';
import {ColorPicker} from "./color_picker";


export function FilePage() {
    const uploadImage = async  (event) => {
        console.log(event.target.files[0]);
        const requestOptions = {
            method: 'POST',
        };
        let formData = {
          name: event.target.files[0].name,
          file: event.target.files[0]
        };
        console.log(formData)
        fetch('http://localhost:5000/api/v0/file', requestOptions, formData=formData)
            // .then(response => response.json())
            // .then(state => {
            //     console.log(state)
            // })

    };
  return (
    <div className="App">
      <div>Pick an image that is 300 pixels tall</div>
      <input type="file" name="image" onChange={uploadImage} />
    </div>
  );
}