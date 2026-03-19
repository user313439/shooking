import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, onUpdateQuantity, onRemove, onCheckout }) {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(3000);

  // 2. 금액 계산 로직
  useEffect(() => {
    const sum = cartItems.reduce((acc, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return acc + price * (item.quantity || 1);
    }, 0);

    setTotalPrice(sum);
    // 10만원 이상 시 배송비 0원
    setShippingFee(sum >= 100000 || sum === 0 ? 0 : 3000);
  }, [cartItems]);

  return (
    <div className="cart-container">
      {/* 상단 헤더 */}
      <header className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h2>장바구니</h2>
      </header>
      
      <p className="item-count">현재 {cartItems.length}개의 상품이 담겨있습니다.</p>

      {/* 상품 리스트 */}
      <div className="cart-list">
        {cartItems.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>장바구니가 비어있습니다.</div>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.brand} className="item-img" />
              <div className="item-info">
                <span className="brand">{item.brand}</span>
                <span className="price">{item.price}</span>
                <div className="qty-control">
                  <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                  <button onClick={() => onRemove(item.id)} style={{ marginLeft: 'auto', border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}>삭제</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 결제 정보 영역 */}
      <div className="summary-section">
        <div className="summary-row">
          <span>상품 금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
        <div className="summary-row">
          <span>배송비</span>
          <span>{shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}</span>
        </div>
        <div className="total-row">
          <span>총 금액</span>
          <span>{(totalPrice + shippingFee).toLocaleString()}원</span>
        </div>
        <button 
          className="checkout-btn" 
          disabled={cartItems.length === 0}
          onClick={() => onCheckout(navigate)}
          style={{ opacity: cartItems.length === 0 ? 0.5 : 1 }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

export default Cart;