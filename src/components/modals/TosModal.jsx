import React from 'react';
import Modal from './Modal';

const TosModal = ({ onClose }) => {
    return (
        <Modal onClose={onClose}>
            {(handleClose) => (
                <div className="bg-theme-modal-card rounded-lg shadow-2xl w-full max-w-2xl border border-theme">
                    <div className="p-4 border-b border-theme flex justify-between items-center">
                        <h3 className="text-xl font-bold text-theme-primary">Terms & Conditions</h3>
                        <button onClick={handleClose} className="text-theme-secondary hover:text-theme-primary text-2xl">&times;</button>
                    </div>
                    <div className="p-6 space-y-4 text-theme-secondary max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <p><strong className="text-theme-primary">Refund Policy:</strong> All sales are final. Due to the digital nature of our products, we do not offer refunds once a purchase is completed. Please review all features and compatibility information before buying.</p>
                        <p><strong className="text-theme-primary">License Agreement:</strong> Your license is for personal use only. Account or script sharing is strictly prohibited. Violation of this rule may result in a permanent suspension of your access without a refund.</p>
                        <p><strong className="text-theme-primary">Software Use:</strong> Any attempt to reverse-engineer, decompile, or crack our software is a violation of these terms and applicable laws. We reserve the right to pursue appropriate action and terminate access for such activities.</p>
                        <p><strong className="text-theme-primary">Disclaimer:</strong> Our software is provided 'as-is'. While we strive for 100% uptime and safety, we are not liable for any account actions or issues that may arise from its use. Use at your own discretion.</p>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default TosModal;
