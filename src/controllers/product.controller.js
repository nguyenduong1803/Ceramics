import productModel from "../database/models/product/product.model";
import { responseError, responseSuccess } from "../helpers/response";
import productRepository from "../repositories/product.repository";

// [GET] api/product
export const read = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const brand = req.query.brand ? { brand_id: req.query.brand } : {};
    const is_locked = req.query.is_locked || false;
    const category = req.query.category
      ? { category_id: req.query.category }
      : {};
    const perPage = limit * page - limit;

    const product = await productModel
      .find({
        ...category,
        ...brand,
        name: { $regex: search, $options: "i" },
        is_locked,
      })
      .skip(perPage)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
    const total = await productRepository.totalRecord({
      ...category,
      ...brand,
      name: { $regex: search, $options: "i" },
      is_locked,
    });
    const pageSize = Math.ceil(total / limit);
    return res.status(200).json({
      data: product,
      total,
      pageSize,
      currentPage: page,
      message: "Lấy danh sách sản phẩm thành công ",
    });
  } catch (error) {
    return responseError(res, error);
  }
};

export const getBuyId = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productRepository.findById(id);

    const response = {
      data,
      message: "Lấy sản phẩm thành công ",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/product/create
export const create = async (req, res) => {
  try {
    const body = req.body;
    const data = await productRepository.create(body);
    const response = {
      data,
      message: "Tạo sản phẩm thành công ",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const getDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productRepository.find({ product_id: id });

    const response = {
      data,
      message: "Lấy danh sách ảnh thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/product/update/:id
export const update = async (req, res) => {
  try {
    const { images, ...body } = req.body;
    const { id } = req.params;
    const data = await productRepository.update(id, body);

    const response = {
      data,
      message: "Cập nhật sản phẩm thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [DELETE] api/admin/product/remove/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productRepository.delete(id);

    const response = {
      data,
      message: "Xóa sản phẩm thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const getSaleProduct = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 16;
    const is_locked = req.query.is_locked || false;

    const product = await productModel
      .find({ max_sale: { $gt: 0 }, is_locked })
      .limit(limit);

    const response = {
      data: product,
      message: "lấy danh sách thành công",
    };
    return responseSuccess(res, response);
  } catch (error) {}
};
