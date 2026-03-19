import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import PaymentForm from './PaymentForm';
import Wallet from './Wallet';
import Success from './Success';

// 1. 데이터는 최상단 부모인 App에서 관리합니다 (데이터 일관성 유지)
const initialProducts = [
  { id: 1, brand: '브랜드A', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: '/images/nike1.jpg' },
  { id: 2, brand: '브랜드A', desc: '힙한 컬러가 매력적인 신발', price: '35,000원', img: '/images/nike2.jpg' },
  { id: 3, brand: '브랜드B', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: '/images/adidas1.jpg' },
  { id: 4, brand: '브랜드B', desc: '힙한 컬러가 매력적인 신발', price: '35,000원', img: '/images/adidas2.jpg' },
  { id: 5, brand: '브랜드C', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: '/images/vans1.jpg' },
  { id: 6, brand: '브랜드C', desc: '힙한 컬러가 매력적인 신발', price: '35,000원', img: '/images/vans2.jpg' },
  { id: 7, brand: '브랜드A', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: '/images/nike3.jpg' },
  { id: 8, brand: '브랜드A', desc: '힙한 컬러가 매력적인 신발', price: '35,000원', img: '/images/nike4.jpg' },
  { id: 9, brand: '브랜드B', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: '/images/adidas3.jpg' },
  { id: 10, brand: '브랜드B', desc: '힙한 컬러가 매력적인 신발', price: '35,000원', img: '/images/adidas4.jpg' },
  { id: 11, brand: '브랜드C', desc: '편안하고 착용감이 좋은 신발', price: '35,000원', img: '/images/vans3.jpg' },
  { id: 12, brand: '브랜드C', desc: '힙한 컬러가 매력적인 신발', price: '35,000원', img: '/images/vans4.jpg' },
];

function App() {
  const [addedItems, setAddedItems] = useState([]); // [{ id, quantity }]
  const [cards, setCards] = useState([]); 

  // 장바구니 추가/삭제 로직
  const handleAddToCart = (id) => {
    setAddedItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.filter(item => item.id !== id);
      } else {
        return [...prev, { id, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setAddedItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => 
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        );
      } else {
        // 상세페이지에서 담기 전 수량 조절을 시뮬레이션하기 위해선 
        // ProductDetail 내부 로컬 상태가 필요하므로 App에서는 기존 logic 유지
        return prev;
      }
    });
  };

  // 상세페이지용: 특정 수량으로 장바구니 추가/업데이트
  const handleSetQuantity = (id, quantity) => {
    setAddedItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity } : item);
      } else {
        return [...prev, { id, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setAddedItems(prev => prev.filter(item => item.id !== id));
  };

  // 결제 완료 시 장바구니 비우기
  const handlePaymentSuccess = () => {
    // 성공 페이지로 데이터를 넘기기 위해 addedItems를 비우기 전에 totalCount를 계산해서 넘겨야 할 수도 있음
    // 여기서는 Wallet에서 Success로 넘길 때 처리하므로 상태만 초기화
    setAddedItems([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProductList products={initialProducts} addedItems={addedItems} onAdd={handleAddToCart} />
        } />

        <Route path="/detail/:id" element={
          <ProductDetail 
            products={initialProducts} 
            addedItems={addedItems} 
            onAdd={handleAddToCart} 
            onSetQuantity={handleSetQuantity}
          />
        } />

        <Route path="/cart" element={
          <Cart 
            cartItems={addedItems.map(item => ({
              ...initialProducts.find(p => p.id === item.id),
              quantity: item.quantity
            }))}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={(navigate) => navigate('/wallet')}
          />
        } />

        <Route path="/wallet" element={
          <Wallet 
            cards={cards} 
            products={initialProducts} 
            addedItems={addedItems} 
            onPaymentSuccess={handlePaymentSuccess} 
          />
        } />

        <Route path="/add-card" element={
          <PaymentForm 
            onSave={(newCard) => setCards([...cards, newCard])} 
          />
        } />

        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;