import { useParams, useNavigate } from 'react-router-dom';
import BakerLayout from '../components/BakerLayout';
import ChatWindow from '../components/ChatWindow';

export default function BakerOrderChat() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <BakerLayout>
      <div style={styles.header}>
          <button onClick={() => navigate('/dashboard/baker')} style={styles.backBtn}>Back to Orders</button>
        <h1 style={styles.title}>Chat about Order #{orderId.slice(-6).toUpperCase()}</h1>
      </div>
      <ChatWindow orderId={orderId} />
    </BakerLayout>
  );
}

const styles = {
  header: { marginBottom: '20px' },
  backBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--rose-deep)',
    fontSize: '13px',
    cursor: 'pointer',
    marginBottom: '10px',
    padding: 0,
  },
  title: { fontSize: '20px' },
};
