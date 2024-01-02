import categoryRoute from "./category.route";
import productRoute from "./product.route";
import newsRoute from "./news.route";

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
    {
      path:"news",
      route:newsRoute,
    }
  ],
};

export default productRoutes;
