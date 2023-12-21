import categoryRoute from "./category.route";
import productRoute from "./product.route";

const productRoutes = {
  prefix: "/",
  routes: [
    {
      path: "category",
      route: categoryRoute,
    },
    {
      path: "product",
      route: productRoute,
    },
  ],
};

export default productRoutes;
