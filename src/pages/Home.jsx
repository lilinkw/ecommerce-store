import React, { useContext } from "react";
// import product context
import { ProductContext } from "../context/ProductContext";
// import Product Component
import Product from "../components/Product";
import Hero from "../components/Hero";

const Home = () => {
  // get products from context
  const { products } = useContext(ProductContext);
  // get only filteredProducts category
  const filteredProducts = products.filter(
    (product) => product.category === "jewelery"
  );
  return (
    <div>
      <Hero></Hero>
      <section className="py-16">
        <div className="container mx-auto">
          <div
            className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] 
                max-w-sm mx-auto md:max-w-none md:mx-0"
          >
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
