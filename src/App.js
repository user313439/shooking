import React, { useState } from 'react';
import './App.css';
import PaymentForm from './PaymentForm';

const initialProducts = [
  { id: 1, brand: '브랜드A', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: '/images/nike1.jpg' },
  { id: 2, brand: '브랜드A', desc: '힙한 컬러가 매력적인 신발', price: '25,000원', img: '/images/nike2.jpg' },
  { id: 3, brand: '브랜드B', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: '/images/nike3.jpg' },
  { id: 4, brand: '브랜드B', desc: '힙한 컬러가 매력적인 신발', price: '35,000원', img: '/images/nike4.jpg' },
  { id: 5, brand: '브랜드C', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: '/images/nike5.jpg' },
  { id: 6, brand: '브랜드C', desc: '힙한 컬러가 매력적인 신발', price: '35,000원', img: '/images/nike6.jpg' },
];

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [addedItems, setAddedItems] = useState([]);
  const [view, setView] = useState('list'); // list, wallet, addCard 중 하나
  const [cards, setCards] = useState([]); // 등록된 카드들 저장

  const handleAddToCart = (id) => {
    if (addedItems.includes(id)) {
      setCartCount(cartCount - 1);
      setAddedItems(addedItems.filter(itemId => itemId !== id));
    } else {
      setCartCount(cartCount + 1);
      setAddedItems([...addedItems, id]);
    }
  };

  // 새로운 카드 저장 함수
  const addCard = (newCard) => {
    setCards([...cards, newCard]);
    setView('wallet'); // 등록 완료 시 보유 카드 창으로 이동
  };

  // 1. 보유 카드 화면 (Wallet View)
  if (view === 'wallet') {
    return (
      <div className="payment-container">
        <div className="payment-header">
          <h3 className="header-title">보유 카드</h3>
          <button className="close-btn-right" onClick={() => setView('list')}>✕</button>
        </div>
        
        <div className="card-list">
          {cards.length === 0 && (
          <p className="wallet-notice">새로운 카드를 등록해주세요.</p>
          )}
          {cards.map((card, index) => (
            <div key={index} className="registered-card-item">
              <div className="card-preview-ui small-card">
                <div className="card-chip"></div>
                <div className="preview-number">{card.displayNumber}</div>
                <div className="preview-bottom">
                  <span>{card.userName.toUpperCase()}</span>
                  <span>{card.expiry}</span>
                </div>
              </div>
              <button className="pay-now-btn" onClick={() => alert('결제가 완료되었습니다!')}>
                이 카드로 결제하기
              </button>
            </div>
          ))}

          {/* 카드 추가 버튼 (빈 카드 모양) */}
          <div className="add-card-placeholder" onClick={() => setView('addCard')}>
            <span className="plus-icon">+</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. 카드 등록 화면 (Add Card View)
  if (view === 'addCard') {
    return <PaymentForm 
      onBack={() => setView('wallet')} 
      onClose={() => setView('list')} 
      onSave={addCard} 
    />;
  }

  // 3. 상품 목록 화면 (List View)
  return (
    <div className="container">
      <header className="header">
        <div className="header-inner">
          <div className="cart-icon">🛒 {cartCount > 0 && <span className="badge">{cartCount}</span>}</div>
        </div>
      </header>
      <section className="title-section">
        <h2>신발 상품 목록</h2>
        <p>현재 {initialProducts.length}개의 상품이 있습니다.</p>
      </section>
      <div className="product-grid">
        {initialProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="img-box"><img src={product.img} alt={product.brand} /></div>
            <div className="info-box">
              <span className="brand">{product.brand}</span>
              <p className="desc">{product.desc}</p>
              <span className="price">{product.price}</span>
              <div className="btn-group">
                <button className={`add-btn ${addedItems.includes(product.id) ? 'active' : ''}`} onClick={() => handleAddToCart(product.id)}>
                  {addedItems.includes(product.id) ? '담김!' : '담기'}
                </button>
                <button className="buy-btn" onClick={() => setView('wallet')}>구매</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;