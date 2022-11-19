// import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Amplify from '@aws-amplify/core';
import { Storage } from 'aws-amplify';
import { AiFillDropboxSquare } from "react-icons/ai";

function Upload() {
  const ref = useRef(null);
  const [files, setFiles] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();

  useEffect(() => {
    Amplify.configure({
      Auth: {
        identityPoolId: "us-east-1:3522c658-2b56-4276-88e1-42f87b506904",
        region: "us-east-1",
      },

      Storage: {
        AWSS3: {
          bucket: "sardor",
          region: "us-east-1",
        },
      },
    });
  }, []);

  const loadImages = () => {
    Storage.list("")
      .then((files) => {
        console.log(files);
        setFiles(files);
      })
      .catch((err) => {
        console.log(err);
      });    
  }

  useEffect(() => {
    loadImages();
   }, []);

  const handleFileLoad = () => {
    const filename = ref.current.files[0].name;
    Storage.put(filename, ref.current.files[0], {
      progressCallback: (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100) + "%");
        setTimeout(() => { setProgress() }, 1000);
      }
    })
      .then(resp => {
      console.log(resp);
      loadImages();
    }).catch(err => {console.log(err);});
  }

  const handleShow = (file) => {
    Storage.get(file).then(resp => {
      console.log(resp);
      setImage(resp)
    }).catch(err => { console.log(err); });
  }

  const handleDelete = (file) => {
    Storage.remove(file).then(resp => {
      console.log(resp);
      loadImages();
     }).catch(err => { console.log(err); });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='upload_main' style={{marginLeft:'-700px'}}>
        <input ref={ref} type="file" onChange={handleFileLoad} />
        { progress}
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Name</td>
              <td></td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {files?.results?.map((file,i) => (
              <tr key={file.key}>
               <AiFillDropboxSquare style={{fontSize: '22px', marginRight:'-18px', marginTop: '9px'}}/>
                <td>{i}</td>
                <td>{file.key}</td>
                <td>
                  <button onClick={() => handleShow(file.key)}>Show</button>
                  <button onClick={() => handleDelete(file.key)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>  
        <img src={image} width="500"/></div>
        </header>
    </div>
  );
}

export default Upload;
