import React from 'react';
import Cart from './Cart';

export default {
  title: 'Shopping/Cart',
  component: Cart,
};

// 1. 실제 데이터가 들어왔을 때의 성공적인 모습
export const Default = {
  args:{
    cartItems:[{
      "id": 1,
      "brand": "나이키 슈즈",
      "price": "89,000원",
      "img": "https://via.placeholder.com/100"
    }, {
      "id": 2,
      "brand": "아디다스 후드",
      "price": "55,0000원",
      "img": "https://via.placeholder.com/100"
    }],
    onBack:() => alert('뒤로가기 클릭!'),
    onCheckout:() => alert('결제하기 클릭!'),
  },
};

// 2. 장바구니에 아이템이 없을 때 (에러 방지를 위해 빈 배열 전달)
export const Empty = {
  args: {
    cartItems: [],
  },
};