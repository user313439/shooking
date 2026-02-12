import ProductCard from './components/ProductCard'; // 우리가 만든 파일 가져오기

function App() {
  return (
    <div className="App">
      <h1>슈킹 쇼핑몰 상품 목록</h1>
      {/* 신발*/}
      <ProductCard /> 
    </div>
  );
}

export default App;