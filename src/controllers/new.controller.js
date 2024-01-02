import { responseError, responseSuccess } from "../helpers/response";
import newsRepository from "../repositories/news.repository"; 

// [GET] api/category
export const read = async (req, res) => {
  try {
    const is_locked = req.query.is_locked || false;

    const data = await newsRepository.find({ is_locked });
    const response = {
      data,
      message: "Lấy danh sách tin tức thành công ",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/category/:id
export const create = async (req, res) => {
  try {
    const body = req.body;
    const data = await newsRepository.create(body);

    const response = {
      data,
      message: "Tạo tin tức thành công ",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/category/:id
export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = await newsRepository.update(id, body);

    const response = {
      data,
      message: "Cập nhật tin tức thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [GET] api/category/:id
export const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await newsRepository.findById(id);

    const response = {
      data,
      message: "Lấy tin tức thành công ",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [DELETE] api/category/remove/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await newsRepository.delete(id);

    const response = {
      data,
      message: "Xóa tin tức thành công ",
    };
    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
