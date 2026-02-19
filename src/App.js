import React, { useState } from 'react';
import './App.css';

const initialProducts = [
  { id: 1, brand: '브랜드A', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: 'https://via.placeholder.com/150/f0f0f0' },
  { id: 2, brand: '브랜드A', desc: '힙한 컬러가 매력적인 신발', price: '25,000원', img: 'https://via.placeholder.com/150/e0e0f8' },
  { id: 3, brand: '브랜드B', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: 'https://via.placeholder.com/150/d0e8ff' },
  { id: 4, brand: '브랜드B', desc: '힙한 컬러가 매력적인 신발', price: '35,000원', img: 'https://via.placeholder.com/150/c0ffc0' },
  { id: 5, brand: '브랜드C', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: 'https://via.placeholder.com/150/cccccc' },
  { id: 6, brand: '브랜드C', desc: '힙한 컬러가 매력적인 신발', price: '35,000원', img: 'https://via.placeholder.com/150/ffcccc' },
];

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [addedItems, setAddedItems] = useState([]);

  const handleAddToCart = (id) => {
    if (!addedItems.includes(id)) {
      setCartCount(cartCount + 1);
      setAddedItems([...addedItems, id]);
    }
  };

  return (
    <div className="container">
      {/* 헤더 영역: 로고와 장바구니 수량 표시 */}
      <header className="header">
        <div className="header-inner">
          <div className="cart-icon">
            🛒 {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </div>
        </div>
      </header>

      {/* 제목 영역 */}
      <section className="title-section">
        <h2>신발 상품 목록</h2>
        <p>현재 {initialProducts.length}개의 상품이 있습니다.</p>
      </section>

      {/* 상품 목록 리스트: 2열 그리드 레이아웃 */}
      <div className="product-grid">
        {initialProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="img-box" style={{ backgroundColor: '#f9f9f9' }}>
              <img src={product.img} alt={product.brand} />
            </div>
            <div className="info-box">
              <span className="brand">{product.brand}</span>
              <p className="desc">{product.desc}</p>
              <span className="price">{product.price}</span>
              <button 
                className={`add-btn ${addedItems.includes(product.id) ? 'active' : ''}`}
                onClick={() => handleAddToCart(product.id)}
              >
                {addedItems.includes(product.id) ? '담김!' : '담기'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;