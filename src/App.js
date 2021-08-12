import React from 'react';
import "./App.css";
import Button from '@material-ui/core/Button';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import {generateDownload} from './utils/cropImage';

const App = () => {

    const inputRef = React.useRef();

    const triggerFileSelectPopup = () => inputRef.current.click();

    const [image, setImage] = React.useState(null);
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({x: 0, y: 0});
    const [zoom, setZoom] = React.useState(1);
    
    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        // console.log(croppedAreaPercentage, croppedAreaPixels);
        setCroppedArea(croppedAreaPixels);
    };

    const onSelectFile = (event) => {
        if(event.target.files && event.target.files.length > 0){
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", ()=>{
                // console.log(reader.result);
                setImage(reader.result);
            })
        }
    };

    const onDownload = () => {
        generateDownload(image, croppedArea);
    };

    return (
        <div className="container">
            <div className="container-cropper">
                {image ? (
                    <>
                        <div className="cropper">
                            <Cropper 
                                image={image} 
                                crop={crop} 
                                zoom={zoom} 
                                aspect={1} 
                                onCropChange={setCrop} 
                                onZoomChange={setZoom} 
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        <div className="slider">
                            <Slider 
                                min={1} 
                                max={3}
                                step={0.05} 
                                value={zoom}
                                onChange={(e, zoom) => setZoom(zoom)} 
                            />
                        </div>
                    </>
                ):null}
            </div>

            <div className="container-buttons">
                <input 
                    type='file' 
                    accept='image/*' 
                    ref={inputRef} 
                    style={{display: 'none'}}
                    onChange={onSelectFile}
                />


                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={triggerFileSelectPopup}
                    style = {{marginRight: "50px"}} 
                >
                    Choose
                </Button>

                <Button variant='contained' color='secondary' onClick={onDownload}>
                    Download
                </Button>
            </div>

        </div>
    ); 
}

export default App;

