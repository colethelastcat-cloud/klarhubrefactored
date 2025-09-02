import React from 'react';
import Modal from './Modal';

const ComparePlansModal = ({ onClose, allTiers }) => {
    const features = [
        { name: 'Price', key: 'price' },
        { name: 'Robux Price', key: 'robuxPrice' },
        { 
            name: 'Duration', 
            getValue: (tier) => {
                if (tier.name.includes('Lifetime')) return 'Lifetime';
                if (tier.name.includes('1 Week')) return '7 Days';
                if (tier.name.includes('1 Month')) return '30 Days';
                if (tier.name.includes('3 Month')) return '90 Days';
                if (tier.name.includes('6 Month')) return '180 Days';
                return 'N/A';
            }
        },
        { 
            name: 'Access To All Games',
            getValue: (tier) => tier.name.includes('Klar') ? '✔️' : 'N/A'
        },
        { 
            name: 'Premium Support',
            getValue: (tier) => '✔️'
        },
    ];

    return (
        <Modal onClose={onClose}>
            {(handleClose) => (
                <div className="bg-theme-modal-card rounded-lg shadow-2xl w-full max-w-4xl border border-theme">
                    <div className="p-4 border-b border-theme flex justify-between items-center">
                        <h3 className="text-xl font-bold text-theme-primary">Compare All Plans</h3>
                        <button onClick={handleClose} className="text-theme-secondary hover:text-theme-primary text-2xl">&times;</button>
                    </div>
                    <div className="p-6 overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-3 text-sm font-semibold text-theme-primary bg-theme-dark rounded-tl-lg">Features</th>
                                    {allTiers.map(tier => (
                                        <th key={tier.name} className="p-3 text-sm font-semibold text-theme-primary bg-theme-dark text-center whitespace-nowrap">
                                            {tier.name}
                                            {tier.isFeatured && <span className="block text-xs text-klar font-normal">(Best Value)</span>}
                                        </th>
                                    ))}
                                    <th className="p-3 bg-theme-dark rounded-tr-lg"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, fIndex) => (
                                    <tr key={feature.name} className="border-b border-theme">
                                        <td className="p-3 font-medium text-theme-secondary">{feature.name}</td>
                                        {allTiers.map(tier => (
                                            <td key={tier.name} className="p-3 text-center text-theme-primary">
                                                {feature.getValue ? feature.getValue(tier) : (tier[feature.key] || 'N/A')}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr className="">
                                    <td className="p-3"></td>
                                    {allTiers.map(tier => (
                                        <td key={tier.name} className="p-3 text-center">
                                            <a href={tier.url} target="_blank" rel="noopener noreferrer" className="inline-block w-full py-2 px-4 rounded-lg font-semibold text-center transition bg-klar/20 hover:bg-klar/30 text-klar border border-klar text-sm">
                                                Purchase
                                            </a>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ComparePlansModal;
