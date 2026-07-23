import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Icon from '../components/Icon';
import { apiUrl } from '../utils/api';

const SUGGESTIONS = [
  'Pink birthday cake with butterflies',
  'Tropical beach cake with waves',
  'Enchanted forest cake',
];

export default function AIGenerator() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  const buildImageUrl = () => {
    const fullPrompt = `professional bakery product photo, ${prompt}, shot from a 3/4 angle clearly showing the cake's shape and number of layers, studio lighting, clean plate, high detail, appetizing, photorealistic`;
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const seed = Math.floor(Math.random() * 100000);
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}`;
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setError('');
    setSaveMessage('');
    setGeneratedImage(null);

    const imageUrl = buildImageUrl();
    const img = new Image();
    img.onload = () => {
      setGeneratedImage(imageUrl);
      setGenerating(false);
    };
    img.onerror = () => {
      setError('Could not generate the image. Please try again.');
      setGenerating(false);
    };
    img.src = imageUrl;
  };

  const buildDraftOrder = () => ({
    source: 'ai-generated',
    shape: 'custom',
    layers: 1,
    flavor: prompt.trim() || 'AI Cake Design',
    frosting: 'Baker selected',
    toppings: [],
    message: '',
    total: 1800,
    image: generatedImage,
  });

  const handleOrderGenerated = () => {
    if (!generatedImage) return;
    const draftOrder = buildDraftOrder();
    localStorage.setItem('bakecraft_draft_order', JSON.stringify(draftOrder));
    navigate('/checkout', { state: draftOrder });
  };

  const handleSaveGenerated = async () => {
    if (!generatedImage) return;
    setSaveMessage('');
    setError('');

    try {
      const token = localStorage.getItem('bakecraft_token');
      if (!token) throw new Error('Please log in to save this design.');

      const draftOrder = buildDraftOrder();
      const res = await fetch(apiUrl('/api/saved-designs'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: prompt.trim().slice(0, 60) || 'AI Cake Design',
          ...draftOrder,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save design.');
      setSaveMessage('Design saved.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DashboardLayout>
      <div style={styles.hero}>
        <h1 style={styles.title}>
          <span style={styles.titleAccent}>BakeCraft</span> AI
        </h1>
        <p style={styles.subtitle}>
          Turn your wildest dessert fantasies into reality. Describe your dream
          cake and let our AI baker whisk up a masterpiece just for you.
        </p>

        <div style={styles.promptCard}>
          <p style={styles.promptLabel}><Icon name="sparkle" size={15} /> What cake are you dreaming of?</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g. A three-tier lavender ombre cake with edible gold leaf and fresh blackberries..."
            style={styles.textarea}
          />

          <div style={styles.chipRow}>
            <span style={styles.chipLabel}>Try these:</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => setPrompt(s)} style={styles.chip}>
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            className="btn-primary"
            style={styles.generateBtn}
            disabled={generating}
          >
            {generating ? 'Generating...' : <><Icon name="sparkle" size={16} /> Generate AI Design</>}
          </button>

          <p style={styles.disclaimer}>
            <Icon name="lightbulb" size={13} /> For an exact shape, size, or layer count, use the{' '}
            <Link to="/builder" style={styles.disclaimerLink}>Cake Builder</Link> -
            AI Generator is best for exploring flavors, themes, and decoration style.
          </p>

          {error && <p style={styles.errorText}>{error}</p>}

          {generating && (
            <p style={styles.loadingText}>
              Baking your design... this can take 10-20 seconds.
            </p>
          )}

          {generatedImage && (
            <div className="ai-result-panel" style={styles.resultWrap}>
              <img src={generatedImage} alt="AI generated cake" style={styles.resultImg} />
              <div style={styles.resultActions}>
                <button onClick={handleOrderGenerated} className="btn-primary" style={styles.resultBtn}>
                  <Icon name="cart" size={16} /> Order This Cake
                </button>
                <button onClick={handleSaveGenerated} style={styles.resultBtnGhost} disabled={Boolean(saveMessage)}>
                  <Icon name={saveMessage ? 'check' : 'bookmark'} size={16} /> {saveMessage ? 'Saved' : 'Save Design'}
                </button>
                <button onClick={handleGenerate} style={styles.resultBtnGhost}>
                  <Icon name="refresh" size={16} /> Try Again
                </button>
              </div>
              {saveMessage && <p style={styles.saveText}>{saveMessage}</p>}
            </div>
          )}
        </div>
      </div>

    </DashboardLayout>
  );
}

const styles = {
  hero: {
    textAlign: 'center',
    maxWidth: '640px',
    margin: '0 auto 48px',
  },
  title: {
    fontSize: '30px',
    marginBottom: '10px',
  },
  titleAccent: {
    color: 'var(--rose-deep)',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    marginBottom: '28px',
  },
  promptCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    textAlign: 'left',
  },
  promptLabel: {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '12px',
  },
  textarea: {
    width: '100%',
    minHeight: '80px',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #eee',
    fontSize: '13.5px',
    fontFamily: 'var(--font-body)',
    resize: 'none',
    marginBottom: '14px',
  },
  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '22px',
  },
  chipLabel: {
    fontSize: '12.5px',
    color: 'var(--text-muted)',
    marginRight: '4px',
  },
  chip: {
    background: 'var(--pink-soft)',
    color: 'var(--rose-deep)',
    border: 'none',
    borderRadius: '16px',
    padding: '7px 14px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  generateBtn: {
    width: '100%',
    padding: '15px',
    fontSize: '14.5px',
  },
  disclaimer: {
    fontSize: '11.5px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    marginTop: '14px',
    lineHeight: 1.5,
  },
  disclaimerLink: {
    color: 'var(--rose-deep)',
    fontWeight: 500,
  },
  errorText: {
    color: '#C1121F',
    marginTop: '16px',
    fontSize: '13px',
  },
  loadingText: {
    marginTop: '20px',
    fontSize: '13px',
    color: 'var(--text-muted)',
    textAlign: 'center',
  },
  resultWrap: {
    marginTop: '28px',
    textAlign: 'center',
  },
  resultImg: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '16px',
    margin: '0 auto',
    display: 'block',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
  },
  resultActions: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '18px',
  },
  resultBtn: {
    padding: '12px 24px',
  },
  resultBtnGhost: {
    background: 'transparent',
    border: '1px solid var(--rose-deep)',
    color: 'var(--rose-deep)',
    padding: '12px 24px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },

  saveText: {
    color: '#2E7D32',
    marginTop: '12px',
    fontSize: '13px',
    textAlign: 'center',
  },
};
