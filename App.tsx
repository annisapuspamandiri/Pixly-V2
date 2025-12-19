
import React, { useState, useCallback, useRef } from 'react';
import { 
  AppTheme, 
  AppLanguage, 
  SubjectType, 
  Gender, 
  Style, 
  Resolution, 
  GenerationConfig 
} from './types';
import { translations } from './translations';
import { THEME_CONFIGS } from './constants';
import { GeminiService } from './services/geminiService';

const App: React.FC = () => {
  // UI State
  const [theme, setTheme] = useState<AppTheme>(AppTheme.PinkSoft);
  const [language, setLanguage] = useState<AppLanguage>(AppLanguage.Indonesian);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  // Form State
  const [config, setConfig] = useState<GenerationConfig>({
    productImage: null,
    backgroundImage: null,
    subjectType: SubjectType.ProductOnly,
    gender: null,
    noModel: true,
    additionalPrompt: '',
    style: Style.SoftAesthetic,
    quantity: 1,
    ratio: '1:1',
    resolution: Resolution.HD,
    branding: ''
  });

  const t = translations[language];
  const themeStyles = THEME_CONFIGS[theme];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'productImage' | 'backgroundImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!process.env.API_KEY) {
      alert("API Key missing. Check environment configuration.");
      return;
    }
    setIsProcessing(true);
    setResultImage(null);
    try {
      const gemini = new GeminiService();
      const result = await gemini.generateProductContent(config);
      setResultImage(result);
    } catch (error) {
      alert("Error generating content. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`min-h-screen ${themeStyles.bg} py-8 px-4 transition-colors duration-500`}>
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${themeStyles.primary} flex items-center justify-center shadow-lg`}>
              <i className="fa-solid fa-wand-sparkles text-2xl text-white"></i>
            </div>
            <h1 className={`text-4xl font-bold tracking-tight ${themeStyles.text}`}>{t.title}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as AppLanguage)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${themeStyles.border} ${themeStyles.card} ${themeStyles.text} focus:outline-none`}
            >
              <option value={AppLanguage.English}>English</option>
              <option value={AppLanguage.Indonesian}>Indonesia</option>
              <option value={AppLanguage.Malaysian}>Malaysia</option>
            </select>

            {/* Theme Selector */}
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value as AppTheme)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${themeStyles.border} ${themeStyles.card} ${themeStyles.text} focus:outline-none`}
            >
              {Object.values(AppTheme).map(th => (
                <option key={th} value={th}>{th}</option>
              ))}
            </select>
          </div>
        </header>

        {/* Input Form Card */}
        <main className={`${themeStyles.card} rounded-3xl p-6 md:p-8 shadow-2xl border ${themeStyles.border} space-y-10`}>
          
          {/* FOTO PRODUK */}
          <section className="space-y-3">
            <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
              {t.productPhoto}
            </label>
            <div 
              className={`relative h-64 md:h-80 border-2 border-dashed ${themeStyles.border} rounded-3xl flex flex-col items-center justify-center transition-all hover:bg-black/5 cursor-pointer group`}
              onClick={() => document.getElementById('product-input')?.click()}
            >
              {config.productImage ? (
                <img src={config.productImage} alt="Product Preview" className="h-full w-full object-contain rounded-3xl p-2" />
              ) : (
                <>
                  <i className={`fa-solid fa-cloud-arrow-up text-4xl mb-4 ${themeStyles.accent}`}></i>
                  <p className={`text-sm font-medium ${themeStyles.text}`}>{t.productPhotoSub}</p>
                </>
              )}
              <input 
                id="product-input"
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'productImage')} 
              />
            </div>
          </section>

          {/* TIPE SUBJEK */}
          <section className="space-y-4">
            <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
              {t.subjectType}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.values(SubjectType).map((type) => (
                <button
                  key={type}
                  onClick={() => setConfig(prev => ({ ...prev, subjectType: type }))}
                  className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                    config.subjectType === type 
                    ? `${themeStyles.primary} ${themeStyles.buttonText} border-transparent shadow-md scale-105` 
                    : `${themeStyles.border} ${themeStyles.text} hover:bg-black/5`
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>

          {/* GENDER MODEL */}
          <section className="space-y-4">
            <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
              {t.genderModel}
            </label>
            <div className="flex gap-4">
              {[Gender.Female, Gender.Male].map((g) => (
                <button
                  key={g}
                  onClick={() => setConfig(prev => ({ ...prev, gender: g, noModel: false }))}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                    config.gender === g && !config.noModel
                    ? `${themeStyles.primary} ${themeStyles.buttonText} border-transparent shadow-md` 
                    : `opacity-40 border-slate-300 ${themeStyles.text} grayscale hover:opacity-100 hover:grayscale-0`
                  }`}
                >
                  {g === Gender.Female ? <i className="fa-solid fa-venus mr-2"></i> : <i className="fa-solid fa-mars mr-2"></i>}
                  {g}
                </button>
              ))}
            </div>
          </section>

          {/* ATAU PILIH MODEL AI */}
          <section className="space-y-4">
            <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
              {t.orChooseAi}
            </label>
            <button
              onClick={() => setConfig(prev => ({ ...prev, noModel: true, gender: null }))}
              className={`w-full py-4 rounded-xl border flex items-center justify-center gap-3 text-sm font-bold transition-all ${
                config.noModel 
                ? `${themeStyles.primary} ${themeStyles.buttonText} border-transparent shadow-md` 
                : `${themeStyles.border} ${themeStyles.text} hover:bg-black/5`
              }`}
            >
              <i className="fa-solid fa-ban"></i>
              {t.noModel}
            </button>
          </section>

          {/* LATAR */}
          <section className="space-y-3">
            <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
              {t.background}
            </label>
            <div 
              className={`relative h-48 border-2 border-dashed ${themeStyles.border} rounded-3xl flex flex-col items-center justify-center transition-all hover:bg-black/5 cursor-pointer`}
              onClick={() => document.getElementById('bg-input')?.click()}
            >
              {config.backgroundImage ? (
                <img src={config.backgroundImage} alt="BG Preview" className="h-full w-full object-cover rounded-3xl" />
              ) : (
                <>
                  <i className={`fa-solid fa-image text-3xl mb-3 opacity-50 ${themeStyles.accent}`}></i>
                  <p className={`text-xs font-medium ${themeStyles.text}`}>{t.backgroundSub}</p>
                </>
              )}
              <input 
                id="bg-input"
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'backgroundImage')} 
              />
            </div>
          </section>

          {/* PROMPT TAMBAHAN */}
          <section className="space-y-3">
            <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
              {t.additionalPrompt}
            </label>
            <textarea 
              className={`w-full h-32 p-4 rounded-2xl border bg-transparent resize-none text-sm transition-all outline-none ${themeStyles.border} ${themeStyles.input} ${themeStyles.text}`}
              placeholder={t.promptPlaceholder}
              value={config.additionalPrompt}
              onChange={(e) => setConfig(prev => ({ ...prev, additionalPrompt: e.target.value }))}
            />
          </section>

          {/* OUTPUT SETTINGS (GAYA, JUMLAH, RASIO, RESOLUSI) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
                {t.style}
              </label>
              <select 
                className={`w-full p-3 rounded-xl border bg-transparent outline-none ${themeStyles.border} ${themeStyles.text} ${themeStyles.input}`}
                value={config.style}
                onChange={(e) => setConfig(prev => ({ ...prev, style: e.target.value as Style }))}
              >
                {Object.values(Style).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-4">
              <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
                {t.quantity}
              </label>
              <input 
                type="range" min="1" max="10" 
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-300"
                value={config.quantity}
                onChange={(e) => setConfig(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
              />
              <div className={`text-right font-bold ${themeStyles.text}`}>{config.quantity}</div>
            </div>

            <div className="space-y-4">
              <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
                {t.ratio}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['1:1', '9:16', '16:9', '4:3', '3:4'].map(r => (
                  <button 
                    key={r}
                    onClick={() => setConfig(prev => ({ ...prev, ratio: r }))}
                    className={`py-2 rounded-lg border text-xs font-bold transition-all ${
                      config.ratio === r 
                      ? `${themeStyles.primary} ${themeStyles.buttonText}` 
                      : `${themeStyles.border} ${themeStyles.text}`
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
                {t.resolution}
              </label>
              <div className="flex gap-2">
                {[Resolution.HD, Resolution.Standard].map(res => (
                  <button 
                    key={res}
                    onClick={() => setConfig(prev => ({ ...prev, resolution: res }))}
                    className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
                      config.resolution === res 
                      ? `${themeStyles.primary} ${themeStyles.buttonText}` 
                      : `${themeStyles.border} ${themeStyles.text}`
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BRANDING */}
          <section className="space-y-3 pt-6 border-t border-slate-200/20">
            <label className={`block text-xs font-bold uppercase tracking-widest ${themeStyles.accent}`}>
              {t.branding}
            </label>
            <div className="relative">
              <i className={`fa-solid fa-copyright absolute left-4 top-1/2 -translate-y-1/2 opacity-50 ${themeStyles.text}`}></i>
              <input 
                type="text"
                placeholder={t.brandingPlaceholder}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border bg-transparent outline-none transition-all ${themeStyles.border} ${themeStyles.input} ${themeStyles.text}`}
                value={config.branding}
                onChange={(e) => setConfig(prev => ({ ...prev, branding: e.target.value }))}
              />
            </div>
          </section>

          {/* ACTION BUTTON */}
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !config.productImage}
            className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl ${themeStyles.primary} ${themeStyles.buttonText}`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-3">
                <i className="fa-solid fa-circle-notch animate-spin"></i>
                {t.processing}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <i className="fa-solid fa-bolt"></i>
                {t.generate}
              </span>
            )}
          </button>
        </main>

        {/* Result Preview */}
        {resultImage && (
          <div className={`${themeStyles.card} rounded-3xl p-6 shadow-2xl border ${themeStyles.border} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
             <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${themeStyles.text}`}>{t.result}</h3>
                <a 
                  href={resultImage} 
                  download={`Pixly-Result-${Date.now()}.png`}
                  className={`px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 ${themeStyles.primary} ${themeStyles.buttonText} shadow-md`}
                >
                  <i className="fa-solid fa-download"></i>
                  {t.download}
                </a>
             </div>
             <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center min-h-[400px]">
                <img src={resultImage} alt="Generation Result" className="max-w-full max-h-screen object-contain" />
             </div>
          </div>
        )}

        <footer className={`text-center py-8 text-sm font-medium opacity-60 ${themeStyles.text}`}>
          <p>© {new Date().getFullYear()} Pixly. CONTENT GENERATOR FOR AFFILIATE .</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
