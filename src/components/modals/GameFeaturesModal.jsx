import React from 'react';
import Modal from './Modal';

const GameFeaturesModal = ({ game, onClose }) => {
     return (
        <Modal onClose={onClose}>
            {(handleClose) => (
                 <div className="bg-theme-modal-card rounded-lg shadow-2xl w-full max-w-lg border border-theme">
                     <div className="p-4 border-b border-theme flex justify-between items-center">
                         <h3 className="text-xl font-bold text-theme-primary">{game.name} Features</h3>
                         <button onClick={handleClose} className="text-theme-secondary hover:text-theme-primary text-2xl">×</button>
                     </div>
                     <div className="p-6">
                         <ul className="space-y-3 text-theme-secondary">
                             {game.features.map((feature, index) => (
                                 <li key={index} className="flex items-center gap-3">
                                     <svg className="w-5 h-5 text-klar flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                     <span>{feature}</span>
                                 </li>
                             ))}
                         </ul>
                     </div>
                 </div>
            )}
        </Modal>
     );
};

export default GameFeaturesModal;
