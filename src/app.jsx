// Modal States
const [modalState, setModalState] = useState({
    isVideoOpen: false,
    isAiHelperOpen: false,
    isTosOpen: false,
    isPreviewOpen: false,
    isCompareOpen: false,
    selectedGame: null,
});

const [isPreviewAnimating, setIsPreviewAnimating] = useState(false);
const [initialConfig, setInitialConfig] = useState(null); // For config sharing

// Theme Management
const [theme, setTheme] = useState(() => localStorage.getItem('klar-theme') || 'dark');

// Custom Hooks
useFadeInSection();
useInteractiveCard();
const headerRef = useRef(null);
const [headerHeight, setHeaderHeight] = useState(80);
const activeSection = useActiveNav(headerHeight);
const [usersRef, usersCount] = useAnimatedCounter(80);
const [updatesRef, updatesCount] = useAnimatedCounter(20);
const [uptimeRef, uptimeCount] = useAnimatedCounter(99);

// Effect for Theme
useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('klar-theme', theme);
    
    const themes = {
        dark: {
            '--background-dark': '#121212', '--background-light': '#1E1E1E', '--text-primary': '#F9FAFB', '--text-secondary': '#D1D5DB', '--border-color': '#4B5563', '--header-bg': 'rgba(18, 18, 18, 0.7)', '--card-bg': 'rgba(30, 30, 30, 0.4)', '--modal-card-bg': '#1F2937', '--button-secondary-bg': '#374151', '--button-secondary-hover-bg': '#4B5563', '--button-secondary-text': '#F9FAFB', '--aurora-opacity': '0.1'
        },
        light: {
            '--background-dark': '#F9FAFB', '--background-light': '#FFFFFF', '--text-primary': '#111827', '--text-secondary': '#374151', '--border-color': '#9CA3AF', '--header-bg': 'rgba(249, 250, 251, 0.8)', '--card-bg': '#FFFFFF', '--modal-card-bg': '#FFFFFF', '--button-secondary-bg': '#E5E7EB', '--button-secondary-hover-bg': '#D1D5DB', '--button-secondary-text': '#111827', '--aurora-opacity': '0.05'
        }
    };
    const selectedTheme = themes[theme];
    for (const [key, value] of Object.entries(selectedTheme)) {
        document.documentElement.style.setProperty(key, value);
    }
}, [theme]);

// General Effects
useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => preloader.classList.add('loaded'), 1000);
    }
}, []);

useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
}, [headerRef]);

// NEW FEATURE: Config Sharing Handler
useEffect(() => {
    const handleConfigLoad = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#config=')) {
            try {
                const encodedConfig = hash.substring(8);
                const decodedConfig = atob(encodedConfig);
                const configObject = JSON.parse(decodedConfig);
                setInitialConfig(configObject);
                handlePreviewClick(); // Automatically open the preview modal
            } catch (error) {
                console.error("Failed to parse config from URL:", error);
                // Clear the invalid hash
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        }
    };
    
    window.addEventListener('hashchange', handleConfigLoad);
    handleConfigLoad(); // Check on initial load

    return () => window.removeEventListener('hashchange', handleConfigLoad);
}, []);


const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const offsetPosition = element.offsetTop - headerHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        history.pushState(null, null, `#${id}`);
    }
    setIsMobileMenuOpen(false);
};

const handleCopyScript = () => {
    const keyToUse = freeKey || "insert key";
    const scriptText = `script_key="${keyToUse}";\nloadstring(game:HttpGet("https://api.luarmor.net/files/v3/loaders/50da22b3657a22c353b0dde631cb1dcf.lua"))()`;
    navigator.clipboard.writeText(scriptText).then(() => {
        setScriptCopied(true);
        setTimeout(() => setScriptCopied(false), 2000);
    });
};

const handlePreviewClick = () => {
    setIsPreviewAnimating(true);
};

return (
    <div className="bg-theme-dark text-theme-primary">
        <AuroraBackground />
        <div className="relative z-10">
            <Header
                headerRef={headerRef}
                onScrollTo={handleScrollTo}
                onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                onTosClick={() => setModalState(s => ({...s, isTosOpen: true}))}
                isMobileMenuOpen={isMobileMenuOpen}
                activeSection={activeSection}
                theme={theme}
                setTheme={setTheme}
            />
             <MobileMenu
                isOpen={isMobileMenuOpen}
                onScrollTo={handleScrollTo}
                onTosClick={() => {
                    setModalState(s => ({...s, isTosOpen: true}));
                    setIsMobileMenuOpen(false);
                }}
                onClose={() => setIsMobileMenuOpen(false)}
            />
            <main>
                <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center p-8 pt-20">
                    {/* Home Content */}
                    <div className="relative z-10">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">Welcome to <span className="text-klar">Klar</span> Hub</h2>
                        <p className="text-lg md:text-xl text-theme-secondary mt-4 max-w-2xl mx-auto">The pinnacle of script performance and reliability for FF2.</p>
                        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6 text-theme-secondary">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"></path></svg>
                                <span>100% Undetected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M11.983 1.904a.75.75 0 00-1.217-.866l-7.5 10.5a.75.75 0 00.925 1.217L8 10.463V18a.75.75 0 001.5 0v-7.537l4.017-2.87a.75.75 0 00-.534-1.217L11.983 1.904z"></path></svg>
                                <span>Lightning Fast</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10.868 2.884c.321-.772 1.415-.772 1.736 0l.645 1.558a.75.75 0 00.729.516h1.634c.82 0 1.123.993.57 1.488l-1.328 1.004a.75.75 0 00-.286.905l.492 1.772c.245.882-.733 1.579-1.482 1.06l-1.423-.982a.75.75 0 00-.894 0l-1.423.982c-.749.52-1.726-.178-1.482-1.06l.492-1.772a.75.75 0 00-.286-.905l-1.328-1.004c-.553-.495-.25-1.488.57-1.488h1.634a.75.75 0 00.73-.516l.645-1.558z"></path></svg>
                                <span>Premium Quality</span>
                            </div>
                        </div>
                         <div className="mt-8 flex flex-col items-center justify-center gap-4">
                           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button onClick={() => handleScrollTo('pricing')} className="py-3 px-8 rounded-lg font-semibold text-center transition bg-klar hover:bg-klar-light text-white shadow-lg shadow-klar flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25v-6h9M6.08 5.746l.473 2.365A1.125 1.125 0 015.454 9H2.25M9 11.25v3.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V11.25m-3.375 0h3.375M7.5 14.25h3.375z"/></svg>
                                    Purchase Now
                                </button>
                                <button onClick={() => setModalState(s => ({...s, isVideoOpen: true}))} className="py-3 px-8 rounded-lg font-semibold text-center transition bg-transparent border border-theme text-theme-secondary hover:text-theme-primary hover:border-klar flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" /></svg>
                                    Watch Demo
                                </button>
                            </div>
                            <DiscordCounter />
                             <button onClick={handlePreviewClick} className="mt-2 py-2 px-6 rounded-lg font-semibold text-center transition bg-theme-button-secondary hover:bg-theme-button-secondary-hover text-theme-button-secondary-text flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                Preview Hub
                             </button>
                        </div>
                    </div>
                </section>
                
                <div className="w-full max-w-6xl mx-auto px-4 space-y-24">
                    {/* Stats Section */}
                    <section id="stats" className="py-12 fade-in-section">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div ref={usersRef}>
                                <p className="text-5xl font-extrabold text-klar">{usersCount.toLocaleString()}+</p>
                                <p className="text-lg text-theme-secondary mt-2">Active Users</p>
                            </div>
                            <div ref={updatesRef}>
                                <p className="text-5xl font-extrabold text-klar">{updatesCount}+</p>
                                <p className="text-lg text-theme-secondary mt-2">Monthly Updates</p>
                            </div>
                            <div ref={uptimeRef}>
                                <p className="text-5xl font-extrabold text-klar">{uptimeCount}%</p>
                                <p className="text-lg text-theme-secondary mt-2">Guaranteed Uptime</p>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section id="features" className="py-12 text-center fade-in-section">
                        <h3 className="text-4xl font-bold">Core Features</h3>
                        <div className="mt-12 grid md:grid-cols-3 gap-8">
                            {features.map(f => (
                                 <div key={f.title} className="bg-theme-card p-6 rounded-lg border border-theme text-left interactive-card">
                                     <svg className="w-8 h-8 text-klar mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={f.icon} /></svg>
                                     <h4 className="text-xl font-semibold">{f.title}</h4>
                                     <p className="text-theme-secondary mt-2">{f.description}</p>
                                 </div>
                            ))}
                        </div>
                    </section>

                    {/* Supported Games Section */}
                    <section id="games" className="py-12 text-center fade-in-section">
                         <h3 className="text-4xl font-bold">Supported Games</h3>
                         <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                              {supportedGames.map(game => (
                                   <div key={game.name} className="bg-theme-card p-8 rounded-lg border border-theme text-center interactive-card flex flex-col justify-between">
                                       <div>
                                           <h4 className="text-2xl font-bold">{game.name}</h4>
                                           <p className="text-klar font-semibold text-lg">{game.abbr}</p>
                                       </div>
                                       <button onClick={() => setModalState(s => ({...s, selectedGame: game}))} className="mt-6 w-full py-2 px-4 rounded-lg font-semibold text-center transition bg-klar/20 hover:bg-klar/30 text-klar border border-klar">
                                           View Features
                                       </button>
                                   </div>
                              ))}
                         </div>
                    </section>
                    
                    {/* Pricing Section */}
                    <section id="pricing" className="py-12 text-center fade-in-section">
                        <h3 className="text-4xl font-bold">Choose Your Access</h3>
                        <div className="mt-12 grid md:grid-cols-3 gap-8 items-center">
                            {pricingTiers.slice(0, 3).map(tier => (
                                <div key={tier.name} className={`relative bg-theme-card p-8 rounded-lg border text-center interactive-card flex flex-col ${tier.isFeatured ? 'border-klar shadow-2xl shadow-klar/40 featured-card-js' : 'border-theme'}`}>
                                    {(tier.isFeatured || tier.specialTag) && (
                                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 text-sm font-semibold text-white rounded-full shadow-md ${tier.isFeatured ? 'bg-klar' : tier.specialTag === 'On Sale' ? 'bg-red-500' : 'bg-indigo-500'}`}>
                                            {tier.isFeatured ? 'Best Value' : tier.specialTag}
                                        </div>
                                    )}
                                    <h4 className="text-xl font-bold mb-2 h-12 flex items-center justify-center">{tier.name}</h4>
                                    <div className="flex justify-center items-end gap-2 mb-4">
                                        <p className="text-4xl font-extrabold text-klar">{tier.price}</p>
                                        {tier.robuxPrice && (<><span className="text-xl text-theme-secondary pb-1">or</span><p className="text-4xl font-extrabold text-klar">R${tier.robuxPrice}</p></>)}
                                    </div>
                                    <div className="flex flex-col gap-2 mt-auto">
                                        <a href={tier.url} target="_blank" rel="noopener noreferrer" className="inline-block w-full py-2 px-4 rounded-lg font-semibold text-center transition-all duration-300 bg-klar/20 hover:bg-klar/30 text-klar border border-klar hover:shadow-[0_0_15px_var(--klar-primary)]">Purchase (USD)</a>
                                        {tier.robuxUrl && (<a href={tier.robuxUrl} target="_blank" rel="noopener noreferrer" className="inline-block w-full py-2 px-4 rounded-lg font-semibold text-center transition bg-[#00A2FF]/20 hover:bg-[#00A2FF]/30 text-[#00A2FF] border border-[#00A2FF]">Purchase (Robux)</a>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 grid md:grid-cols-3 gap-8">
                            {pricingTiers.slice(3).map(tier => (
                                 <div key={tier.name} className="relative bg-theme-card p-8 rounded-lg border text-center interactive-card flex flex-col transition-[box-shadow,border-color] duration-300 border-theme">
                                    <h4 className="text-xl font-bold mb-2 h-12 flex items-center justify-center">{tier.name}</h4>
                                    <div className="flex justify-center items-end gap-2 mb-4">
                                        <p className="text-4xl font-extrabold text-klar">{tier.price}</p>
                                        {tier.robuxPrice && (<><span className="text-xl text-theme-secondary pb-1">or</span><p className="text-4xl font-extrabold text-klar">R${tier.robuxPrice}</p></>)}
                                    </div>
                                    <div className="flex flex-col gap-2 mt-auto">
                                        <a href={tier.url} target="_blank" rel="noopener noreferrer" className="inline-block w-full py-2 px-4 rounded-lg font-semibold text-center transition-all duration-300 bg-klar/20 hover:bg-klar/30 text-klar border border-klar hover:shadow-[0_0_15px_var(--klar-primary)]">Purchase (USD)</a>
                                        {tier.robuxUrl && (<a href={tier.robuxUrl} target="_blank" rel="noopener noreferrer" className="inline-block w-full py-2 px-4 rounded-lg font-semibold text-center transition bg-[#00A2FF]/20 hover:bg-[#00A2FF]/30 text-[#00A2FF] border border-[#00A2FF]">Purchase (Robux)</a>)}
                                    </div>
                                 </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <button onClick={() => setModalState(s => ({...s, isCompareOpen: true}))} className="py-2 px-6 rounded-lg font-semibold text-center transition bg-theme-button-secondary hover:bg-theme-button-secondary-hover text-theme-button-secondary-text">
                                Compare All Plans
                            </button>
                        </div>
                    </section>
                    
                    {/* Free Access Section */}
                    <section id="free" className="py-12 fade-in-section">
                         <div className="text-center">
                            <h3 className="text-4xl font-bold">Get Free Access</h3>
                            <p className="text-lg text-theme-secondary mt-4 max-w-2xl mx-auto">Follow these three simple steps to get a free key and start using Klar Hub.</p>
                        </div>
                        <div className="mt-12 max-w-3xl mx-auto">
                            <div className="relative pl-12">
                                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-theme"></div>
                                <div className="relative mb-12">
                                    <div className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center">
                                         <div className="z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl bg-klar/10 border-2 border-klar text-klar shadow-[0_0_15px_rgba(85,134,214,0.4)] backdrop-blur-sm">1</div>
                                    </div>
                                    <div className="ml-4 p-6 bg-theme-card border border-theme rounded-lg">
                                        <h4 className="text-2xl font-semibold">Get Your Key</h4>
                                        <p className="text-theme-secondary mt-2">Choose an option below and complete the required steps on our partner's site to receive your script key.</p>
                                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                            <a href="https://ads.luarmor.net/get_key?for=Free_Klar_Access_Linkvertise-vdVzClkaaLyp" target="_blank" rel="noopener noreferrer" className="flex-1 inline-block py-2 px-6 rounded-lg font-semibold text-center transition bg-klar hover:bg-klar-light text-white">Get Key (Linkvertise)</a>
                                            <a href="https://ads.luarmor.net/get_key?for=Free_Klar_Access-jfTfOGvFxqSh" target="_blank" rel="noopener noreferrer" className="flex-1 inline-block py-2 px-6 rounded-lg font-semibold text-center transition bg-klar hover:bg-klar-light text-white">Get Key (Lootlabs)</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mb-12">
                                    <div className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center">
                                         <div className="z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl bg-klar/10 border-2 border-klar text-klar shadow-[0_0_15px_rgba(85,134,214,0.4)] backdrop-blur-sm">2</div>
                                    </div>
                                    <div className="ml-4 p-6 bg-theme-card border border-theme rounded-lg">
                                        <h4 className="text-2xl font-semibold">Prepare Your Script</h4>
                                        <p className="text-theme-secondary mt-2">Paste the key you received from Step 1 into the box below. Then, click the copy button to get your final script.</p>
                                        <div className="mt-4 bg-theme-dark p-4 rounded-lg relative">
                                            <pre className="text-gray-300 overflow-x-auto custom-scrollbar">
                                                <code>
                                                    {'script_key="'}<span className="text-klar">{freeKey || "insert key"}</span>{'";\nloadstring(game:HttpGet("https://api.luarmor.net/files/v3/loaders/50da22b3657a22c353b0dde631cb1dcf.lua"))()'}
                                                </code>
                                            </pre>
                                            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                                <input 
                                                    type="text" 
                                                    value={freeKey}
                                                    onChange={(e) => setFreeKey(e.target.value)}
                                                    placeholder="Paste your key here"
                                                    className="w-full bg-theme-button-secondary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-klar p-2"
                                                />
                                                <button onClick={handleCopyScript} className="flex-shrink-0 bg-klar hover:bg-klar-light text-white px-4 py-2 text-sm font-semibold rounded-lg transition relative overflow-hidden">
                                                    <span className={`flex items-center gap-2 transition-transform duration-300 ${scriptCopied ? '-translate-y-full' : 'translate-y-0'}`}>
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM5 11a1 1 0 100 2h4a1 1 0 100-2H5z" /></svg>
                                                        Copy Script
                                                    </span>
                                                     <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 ${scriptCopied ? 'translate-y-0' : 'translate-y-full'}`}>
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                        Copied!
                                                     </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center">
                                        <div className="z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl bg-klar/10 border-2 border-klar text-klar shadow-[0_0_15px_rgba(85,134,214,0.4)] backdrop-blur-sm">3</div>
                                    </div>
                                    <div className="ml-4 p-6 bg-theme-card border border-theme rounded-lg">
                                        <h4 className="text-2xl font-semibold">Execute</h4>
                                        <p className="text-theme-secondary mt-2">You're all set! Now just paste the full script you copied into your executor and run it in-game.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Reviews Section */}
                    <section id="reviews" className="py-12 text-center fade-in-section">
                        <h3 className="text-4xl font-bold">Trusted by Players Worldwide</h3>
                        <div className="mt-12 grid md:grid-cols-3 gap-8">
                             {testimonials.map((t, i) => (
                                <div key={i} className="bg-theme-card p-6 rounded-lg border border-theme text-left interactive-card flex flex-col h-full">
                                    <div className="flex-grow"><p className="text-theme-secondary italic text-lg">"{t.text}"</p></div>
                                    <div className="mt-4 pt-4 border-t border-theme">
                                        <div className="flex justify-between items-center">
                                            <span className="text-klar font-semibold">{t.name}</span>
                                            <div className="flex">
                                                {Array(t.stars).fill(0).map((_, i) => <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-1">{t.date}</p>
                                    </div>
                                </div>
                             ))}
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section id="faq" className="py-12 max-w-3xl mx-auto fade-in-section">
                        <h3 className="text-4xl font-bold text-center">Frequently Asked Questions</h3>
                        <div className="mt-12 space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-theme-card border border-theme rounded-lg faq-item">
                                    <button onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="w-full flex justify-between items-center p-6 text-left">
                                        <span className="text-lg font-semibold">{faq.q}</span>
                                        <svg className={`w-6 h-6 text-theme-secondary transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>
                                    <div className="grid transition-all duration-500 ease-in-out" style={{gridTemplateRows: activeFaq === index ? '1fr' : '0fr'}}>
                                        <div className="overflow-hidden"><p className="p-6 pt-0 text-theme-secondary">{faq.a}</p></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    {/* Community Section */}
                    <section id="community" className="py-12 text-center fade-in-section">
                        <div className="bg-theme-card border border-theme rounded-2xl p-8">
                            <h3 className="text-4xl font-bold">Still Have Questions?</h3>
                            <p className="text-lg text-theme-secondary mt-4">Get support and connect with other users on our Discord server.</p>
                            <DiscordCounter />
                            <div className="mt-8 max-w-xs mx-auto">
                                <a href="https://discord.gg/bGmGSnW3gQ" target="_blank" rel="noopener noreferrer" className="block py-3 px-8 rounded-lg font-semibold text-center transition bg-klar hover:bg-klar-light text-white">Join our Community</a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />

            {/* All Modals */}
            {modalState.isVideoOpen && <VideoModal videoUrls={demoVideos} onClose={() => setModalState(s => ({...s, isVideoOpen: false}))} />}
            <AIHelperButton onClick={() => setModalState(s => ({...s, isAiHelperOpen: true}))} />
            {modalState.isAiHelperOpen && <AIHelperModal onClose={() => setModalState(s => ({...s, isAiHelperOpen: false}))} />}
            {modalState.selectedGame && <GameFeaturesModal game={modalState.selectedGame} onClose={() => setModalState(s => ({...s, selectedGame: null}))} />}
            {modalState.isTosOpen && <TosModal onClose={() => setModalState(s => ({...s, isTosOpen: false}))} />}
            {isPreviewAnimating && <PreviewAnimation onAnimationEnd={() => { setIsPreviewAnimating(false); setModalState(s => ({...s, isPreviewOpen: true})); }} />}
            {modalState.isPreviewOpen && <PreviewModal initialConfig={initialConfig} onClose={() => { setModalState(s => ({...s, isPreviewOpen: false})); setInitialConfig(null); }} />}
            {modalState.isCompareOpen && <ComparePlansModal onClose={() => setModalState(s => ({...s, isCompareOpen: false}))} allTiers={pricingTiers} />}
            
            <BackToTopButton />
        </div>
    </div>
);
