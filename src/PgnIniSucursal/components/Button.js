import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NuevoTicketModal from '../NuevoTicketModal';

const Button = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110"
        onClick={handleButtonClick}
      >
        <FontAwesomeIcon icon={faPlus} className="w-8 h-8" />
      </button>
      {isModalOpen && <NuevoTicketModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Button;
