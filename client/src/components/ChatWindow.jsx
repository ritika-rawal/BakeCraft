import { useState, useEffect, useRef } from 'react';

export default function ChatWindow({ orderId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem('bakecraft_user') || 'null');

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch(`http://localhost:5000/api/messages/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load messages.');
      setMessages(data.messages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');
      setText('');
      fetchMessages();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p style={styles.stateText}>Loading conversation...</p>;

  return (
    <div style={styles.wrap}>
      <div style={styles.messageList}>
        {error && <p style={styles.errorText}>{error}</p>}
        {messages.length === 0 && !error && (
          <p style={styles.emptyText}>No messages yet. Say hello about this order!</p>
        )}
        {messages.map((m) => {
          const isMine = m.sender?._id === currentUser?.id || m.senderRole === currentUser?.role;
          return (
            <div
              key={m._id}
              style={{
                ...styles.bubbleRow,
                justifyContent: isMine ? 'flex-end' : 'flex-start',
              }}
            >
              <div style={{ ...styles.bubble, ...(isMine ? styles.bubbleMine : styles.bubbleTheirs) }}>
                <p style={styles.bubbleSender}>
                  {m.senderRole === 'baker' ? '🍰 Baker' : '🙂 You'}
                </p>
                <p style={styles.bubbleText}>{m.text}</p>
                <p style={styles.bubbleTime}>
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} style={styles.inputRow}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" className="btn-primary" style={styles.sendBtn} disabled={sending}>
          {sending ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrap: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    height: '520px',
  },
  stateText: { fontSize: '14px', color: 'var(--text-muted)', padding: '20px' },
  errorText: { fontSize: '13px', color: '#C1121F', padding: '0 20px' },
  emptyText: { fontSize: '13px', color: 'var(--text-muted)', padding: '20px', textAlign: 'center' },
  messageList: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  bubbleRow: { display: 'flex' },
  bubble: { maxWidth: '70%', borderRadius: '14px', padding: '10px 14px' },
  bubbleMine: { background: 'var(--rose-deep)', color: '#fff' },
  bubbleTheirs: { background: 'var(--pink-soft)', color: 'var(--text-dark)' },
  bubbleSender: { fontSize: '10.5px', fontWeight: 600, opacity: 0.8, marginBottom: '3px' },
  bubbleText: { fontSize: '13.5px', lineHeight: 1.4 },
  bubbleTime: { fontSize: '10px', opacity: 0.7, marginTop: '4px', textAlign: 'right' },
  inputRow: {
    display: 'flex',
    gap: '10px',
    padding: '16px 20px',
    borderTop: '1px solid #f6eef0',
  },
  input: {
    flex: 1,
    padding: '11px 14px',
    borderRadius: '20px',
    border: '1px solid #eee',
    fontSize: '13.5px',
  },
  sendBtn: { padding: '11px 22px', fontSize: '13.5px' },
};