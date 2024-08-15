import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IMG_SERVER_URL} from '../../Url';

const Card = ({ item }) => {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle clicking on an image to zoom in
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsImageZoomed(true);
  };

  // Close zoomed image
  const handleCloseZoom = () => {
    setIsImageZoomed(false);
  };

  // Navigate to previous image
  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? item.imagenes.length - 1 : prevIndex - 1));
  };

  // Navigate to next image
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex === item.imagenes.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 transform transition-transform hover:scale-105">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
        >
          {item.imagenes.map((image, index) => {
            const imageUrl = `${IMG_SERVER_URL}/${image.urlImagen}`;
            console.log(`Image URL: ${imageUrl}`);
            return (
              <div key={index} onClick={() => handleImageClick(index)}>
                <img
                  className="w-full h-48 object-contain cursor-pointer"
                  src={imageUrl}
                  alt={`Imagen ${index + 1}`}
                />
              </div>
            );
          })}
        </Carousel>
        <div className="p-6">
          <p className="text-gray-700 text-base whitespace-pre-line">
            {item.descripcion}
          </p>
          <p className="text-gray-500 text-sm">Prioridad: {item.prioridad}</p>
        </div>
      </div>

      {isImageZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={handleCloseZoom}>
          <div className="relative max-w-3xl w-full p-4 bg-transparent rounded-lg" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleCloseZoom} className="absolute top-4 right-4 text-white text-2xl z-50">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <img
              className="w-full max-h-[80vh] object-contain"
              src={`${IMG_SERVER_URL}/${item.imagenes[currentImageIndex].urlImagen}`}
              alt={`Imagen ampliada ${currentImageIndex + 1}`}
            />
            <button onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
