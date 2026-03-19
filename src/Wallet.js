import React from 'react';
import { useNavigate } from 'react-router-dom';

function Wallet({ cards, products, addedItems, onPaymentSuccess }) {
  const navigate = useNavigate();

  // 장바구니에 담긴 상품들의 총 금액 계산 (수량 반영)
  const totalAmount = addedItems.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    if (!product) return sum;
    const price = parseInt(product.price.replace(/[^0-9]/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  // 장바구니에 담긴 상품들의 총 개수 계산
  const totalCount = addedItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePay = () => {
    onPaymentSuccess(); // 장바구니 비우기 로직 실행
    // 결제 금액 및 상품 개수 정보를 가지고 성공 페이지로 이동
    navigate('/success', { state: { amount: totalAmount, count: totalCount } });
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h3 className="header-title">보유 카드</h3>
        <button className="close-btn-right" onClick={() => navigate('/')}>✕</button>
      </div>
      
      <div className="card-list">
        {cards.length === 0 ? (
          <p className="wallet-notice">새로운 카드를 등록해주세요.</p>
        ) : (
          cards.map((card, index) => (
            <div key={index} className="registered-card-item">
              <div className="card-preview-ui small-card" style={{ backgroundColor: '#333', color: '#fff' }}>
                <div className="card-chip"></div>
                <div className="preview-number">{card.displayNumber}</div>
                <div className="preview-bottom">
                  <span>{card.userName}</span>
                  <span>{card.expiry}</span>
                </div>
              </div>
              <button className="pay-now-btn" onClick={handlePay}>
                이 카드로 결제하기
              </button>
            </div>
          ))
        )}
        <div className="add-card-placeholder" onClick={() => navigate('/add-card')}>+</div>
      </div>
    </div>
  );
}

export default Wallet;