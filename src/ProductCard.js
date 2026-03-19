import React from 'react';

function ProductCard({ product, isAdded, onAdd, onClickImage, onBuy }) {
  return (
    <div className="product-card">
      <div className="img-box" onClick={onClickImage} style={{ cursor: 'pointer' }}>
        <img src={product.img} alt={product.brand} />
      </div>
      <div className="info-box">
        <span className="brand">{product.brand}</span>
        <p className="desc">{product.desc}</p>
        <span className="price">{product.price}</span>
        <div className="btn-group">
          <button 
            className={`add-btn ${isAdded ? 'active' : ''}`} 
            onClick={() => onAdd(product.id)}
          >
            {isAdded ? '담김!' : '담기'}
          </button>
          <button className="buy-btn" onClick={onBuy}>구매</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
