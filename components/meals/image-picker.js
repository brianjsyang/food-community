'use client' // event listeners and hooks need to be in client component

import classes from '@/components/meals/image-picker.module.css';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef(); // simulate clicking on a different object!

  function handlePickClick() {
    imageInput.current.click(); // actually clicks on the imageInput!
  }


  function handleImageChange(event) {
    // triggered when the input field is updated.
    const file = event.target.files[0]; // file exists, becuase input type is file!

    if (!file) {
      setPickedImage(null);
      return; // no file, reset to empty
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      // store the function on the "onload" property of the file reader,
      setPickedImage(fileReader.result) // this is the generated url
    }
    // the stored function gets executed here, by the readAsDataURL function.
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image Picked Yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="The image selected by the user" fill/>}
        </div>

        <input 
          className={classes.input}
          type='file' 
          //multiple // if user need to select multiple files
          id={name} 
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required  // make sure we have an image!
        />
        <button 
          className={classes.button} 
          type='button' 
          onClick={handlePickClick}>
            Pick an Image
        </button>
      </div>
    </div>
 )
}