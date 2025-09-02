import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from '../Modal';

export const PreviewModal = ({ onClose, initialConfig }) => {
    const [activeTab, setActiveTab] = useState('Catching');
    const [isFading, setIsFading] = useState(false);
    
    const [previewState, setPreviewState] = useState({
        magnet_power: 25, magnet_chance: 100, arm_size: 3, football_size: 1,
        dime_lead: 11, mag_lead: 12.5, bullet_lead: 4, lead_distance: 0, height_distance: 0,
        walkspeed_value: 20, cframe_speed: 0, jump_power_value: 50, angle_power: 50, hip_height_value: 0, gravity_value: 196.1,
        delay_auto_guard: 0.1, power_auto_boost: 0, swat_distance: 0, prediction_delay: 0,
        hump_speed: 5, underground_size: 0.001, fps_cap: 60,
        ...initialConfig // Apply shared config if it exists
    });
    
    const [listeningForBind, setListeningForBind] = useState(null);
    const [copyStatus, setCopyStatus] = useState('Share'); // 'Share', 'Copied!', 'Error!'

    const handleTabClick = (tabName) => {
        if (tabName === activeTab) return;
        setIsFading(true);
        setTimeout(() => {
            setActiveTab(tabName);
            setIsFading(false);
        }, 150);
    };

    const handleValueChange = useCallback((key, value) => {
        setPreviewState(prev => ({ ...prev, [key]: value }));
    }, []);
    
    const handleButtonInteraction = (e) => {
        e.target.classList.add('active');
        setTimeout(() => e.target.classList.remove('active'), 150);
    };

    // NEW FEATURE: Config Sharing Logic
    const handleShareConfig = () => {
        try {
            const configString = JSON.stringify(previewState);
            const encodedConfig = btoa(configString);
            const url = `${window.location.origin}${window.location.pathname}#config=${encodedConfig}`;
            navigator.clipboard.writeText(url);
            setCopyStatus('Copied!');
        } catch (error) {
            console.error("Failed to share config:", error);
            setCopyStatus('Error!');
        } finally {
            setTimeout(() => setCopyStatus('Share'), 2000);
        }
    };


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (listeningForBind) {
                let keyName = e.key;
                if (keyName.length === 1 && keyName.match(/[a-zA-Z0-9]/i)) keyName = keyName.toUpperCase();
                else if (keyName === " ") keyName = 'Space';
                
                handleValueChange(`${listeningForBind}_bind`, keyName);
                setListeningForBind(null);
                e.preventDefault();
            }
        };

        if (listeningForBind) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [listeningForBind, handleValueChange]);

    const tabs = [
        { name: 'Catching', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /><path d="M5 3a1 1 0 000 2h10a1 1 0 100-2H5z" /></svg> },
        { name: 'Throwing', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg> },
        { name: 'Player', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg> },
        { name: 'Automatic', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg> },
        { name: 'Physic', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg> },
        { name: 'Visual', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg> },
        { name: 'Trolling', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" /></svg> },
        { name: 'UI Settings', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg> },
    ];
    
    // Child Components defined inside for simplicity as they are not reused elsewhere
    const FeatureCard = ({ id, title, icon, children }) => (
        <div className="bg-[#18181C] p-3 rounded-md hub-feature-card">
            <div className="flex items-center justify-between text-gray-300 mb-3">
                <div className="flex items-center gap-2">
                    {icon}
                    <h3 className="font-semibold text-sm">{title}</h3>
                </div>
                <button onClick={() => setListeningForBind(id)} className={`text-xs font-mono px-2 py-1 rounded transition-colors ${listeningForBind === id ? 'bg-blue-500 text-white animate-pulse' : 'bg-black/30 text-gray-400 hover:bg-white/10'}`}>
                    {listeningForBind === id ? '...' : (previewState[`${id}_bind`] || 'N/A')}
                </button>
            </div>
            <div className="space-y-3">{children}</div>
        </div>
    );
    
    const Checkbox = ({ id, label }) => (
        <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{label}</span>
            <div onClick={() => handleValueChange(id, !previewState[id])} className={`w-9 h-5 rounded-full p-1 flex items-center cursor-pointer transition-colors ${previewState[id] ? 'bg-klar justify-end' : 'bg-black/30 justify-start'}`}>
                <div className="w-3 h-3 bg-white rounded-full transition-transform"></div>
            </div>
        </div>
    );

    const Slider = ({ id, label, min = 0, max = 100, step = 1 }) => {
        // This is a simplified version of the slider for brevity
        const value = previewState[id] ?? min;
        const percentage = ((value - min) / (max - min)) * 100;
        return (
             <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{label}</span>
                    <input 
                        type="number"
                        value={value}
                        onChange={(e) => handleValueChange(id, parseFloat(e.target.value))}
                        className="w-12 bg-transparent text-xs font-mono text-gray-300 text-center no-arrows"
                    />
                </div>
                <input
                    type="range"
                    min={min} max={max} step={step} value={value}
                    onChange={(e) => handleValueChange(id, parseFloat(e.target.value))}
                    className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
            </div>
        );
    };
    
    const Dropdown = ({ id, label, options }) => (
         <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{label}</span>
             <select value={previewState[id] || options[0]} onChange={(e) => handleValueChange(id, e.target.value)} className="bg-black/30 text-xs text-gray-300 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-klar">
                {options.map(o => <option key={o}>{o}</option>)}
            </select>
        </div>
    );
    
    const Button = ({ label, onClick }) => <button onClick={onClick || handleButtonInteraction} className="w-full text-xs bg-black/30 text-gray-300 py-1.5 rounded active:bg-klar/30 active:scale-95 transition-all">{label}</button>
    const TextInput = ({ placeholder }) => <input type="text" placeholder={placeholder} className="w-full bg-black/30 text-xs p-2 rounded border border-gray-600 focus:outline-none focus:border-klar placeholder-gray-500" />

    const renderContent = () => {
        // Content for tabs is kept the same for brevity
        switch(activeTab) {
             case 'Catching': return (<><FeatureCard id="magnets" title="Magnets" icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>}><Checkbox id="magnets_enabled" label="Magnets" /><Slider id="magnet_power" label="Magnet Power" min={0} max={100} step={1} /><Slider id="magnet_chance" label="Magnet Chance" min={0} max={100} step={1} /><Checkbox id="show_hitbox" label="Show Hitbox" /><Dropdown id="magnet_type" label="Magnet Type" options={["Regular", "Advanced"]} /><Checkbox id="freefall_shape" label="Freefall Shape" /><Dropdown id="hitbox_shape" label="Hitbox Shape" options={["Forcefield", "Box"]} /></FeatureCard><FeatureCard id="pull_vector" title="Pull Vector" icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>}><Checkbox id="pull_vector_enabled" label="Pull Vector" /><Dropdown id="vector_type" label="Vector Type" options={["Tween", "Linear"]} /><Slider id="vector_distance" label="Distance" min={0} max={50} step={1} /><Slider id="vector_power" label="Power" min={0} max={50} step={1} /></FeatureCard><FeatureCard id="resizements" title="Resizements" icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56v4.82a6 6 0 01-1.292 3.536l-1.992-1.992a4.5 4.5 0 00-6.364-6.364l-1.992-1.992A6 6 0 0115.59 14.37z" /></svg>}><Checkbox id="arm_resizement_enabled" label="Arm Resizement" /><Slider id="arm_size" label="Arm Size" min={1} max={10} step={1} /><Checkbox id="football_resize_enabled" label="Football Resize" /><Slider id="football_size" label="Football Size" min={1} max={5} step={1} /></FeatureCard><FeatureCard id="freeze_tech" title="Freeze Tech" icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>}><Checkbox id="freeze_tech_enabled" label="Freeze Tech" /><Slider id="freeze_duration" label="Duration" min={0} max={10} step={1} /></FeatureCard></>);
             case 'UI Settings': return (<div className="col-span-2"><FeatureCard id="configs" title="Configurations" icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0zM10 13a3 3 0 100-6 3 3 0 000 6z" /></svg>}><TextInput placeholder="Type Config Name..." /><Button label="Save Config" /><Button label="Load Config" /><Button label="Reset Config" /><Button label={copyStatus} onClick={handleShareConfig} /></FeatureCard></div>);
             default: return <div className="col-span-2 text-center text-gray-500 pt-10">Select a tab from the left.</div>;
        }
    };

    return (
        <Modal onClose={onClose}>
            {(handleClose) => (
                <div className="w-[800px] h-[500px] bg-[#0D0D0F] text-white rounded-lg flex overflow-hidden border border-gray-800 shadow-2xl shadow-black/50">
                    <div className="w-48 bg-[#18181C] p-4 flex flex-col">
                        <h1 className="text-lg font-bold">Klar Hub | <span className="text-klar">FF2</span></h1>
                        <div className="mt-6 flex-grow space-y-1">
                            {tabs.map(tab => (
                                <button key={tab.name} onClick={() => handleTabClick(tab.name)} className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors relative ${activeTab === tab.name ? 'text-white bg-klar/10' : 'text-gray-400 hover:bg-white/5'}`}>
                                    {tab.icon}<span>{tab.name}</span>
                                    {activeTab === tab.name && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-klar rounded-r-full"></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={`flex-1 p-6 overflow-y-auto custom-scrollbar transition-opacity duration-150 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                       <div className="hub-content-inner grid grid-cols-1 md:grid-cols-2 gap-4">
                          {renderContent()}
                       </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};
