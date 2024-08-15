import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaCamera, FaTimes, FaSync, FaImages } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { createTicket } from './Functions/ApisPost';

const FotoCapture = ({ photos, setPhotos }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isFileSelectorVisible, setIsFileSelectorVisible] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    });
  }, []);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
          setPhotos(prevPhotos => {
            const updatedPhotos = [...prevPhotos, file];
            if (updatedPhotos.length > 3) {
              return updatedPhotos.slice(0, 3);
            }
            return updatedPhotos;
          });
          setIsCameraVisible(false);
        });
    }
  }, [webcamRef, setPhotos]);

  const removePhoto = (index) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  const handleFileChange = (event) => {
    console.log('Archivo Seleccionados:',event.target.files[0]);
    const selectedFiles = Array.from(event.target.files);
    setPhotos(prevPhotos => {
      const updatedPhotos = [...prevPhotos, ...selectedFiles];
      if (updatedPhotos.length > 3) {
        return updatedPhotos.slice(0, 3);
      }
      return updatedPhotos;
    });
    setIsFileSelectorVisible(false);
  };

  const switchCamera = () => {
    const currentIndex = devices.findIndex(device => device.deviceId === selectedDevice);
    const nextIndex = (currentIndex + 1) % devices.length;
    setSelectedDevice(devices[nextIndex].deviceId);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isCameraVisible && (
        <div className="absolute inset-0 z-10">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{ deviceId: selectedDevice }}
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 items-center z-20">
            <button 
              className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md" 
              onClick={capture} 
              disabled={photos.length >= 3}
            >
              <FaCamera />
            </button>
            <button 
              className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md" 
              onClick={switchCamera}
            >
              <FaSync />
            </button>
          </div>
        </div>
      )}

      {!isCameraVisible && !isFileSelectorVisible && (
        <div className="absolute inset-x-0 bottom-0 p-4 z-30 flex gap-4 justify-center">
          {photos.length < 3 && (
            <>
              <button 
                className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md" 
                onClick={() => setIsCameraVisible(true)}
              >
                +
              </button>
              <button 
                className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md" 
                onClick={() => setIsFileSelectorVisible(true)}
              >
                <FaImages />
              </button>
            </>
          )}
        </div>
      )}

      {isFileSelectorVisible && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <label 
            className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md cursor-pointer"
          >
            <FaImages />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              multiple 
              onChange={handleFileChange} 
            />
          </label>
          <button 
            className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md" 
            onClick={() => setIsFileSelectorVisible(false)}
          >
            <FaTimes />
          </button>
        </div>
      )}

      <div className="w-full h-full pb-20">
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          showStatus={false}
          showIndicators={true}
          stopOnHover={true}
          className="w-full h-full"
        >
          {photos.map((photo, index) => (
            <div key={index} className="relative w-full h-full">
              <img 
                className="w-full h-full object-cover pb-20" 
                src={URL.createObjectURL(photo)} 
                alt={`Slide ${index}`} 
              />
              <button 
                onClick={() => removePhoto(index)} 
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm z-20"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default FotoCapture;
