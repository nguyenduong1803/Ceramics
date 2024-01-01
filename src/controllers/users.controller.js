import Auth from "../database/models/user.model";
import Joi from "joi";
import { responseError, responseSuccess } from "../helpers/response";
import bcrypt from "bcrypt";
const login = async (req, res) => {
  try {
    res.status(200).json({ message: "Login success", error });
  } catch (error) {
    res.status(200).json({ message: "Login failed", error });
  }
};

const register = async (req, res) => {
  try {
    const body = req.body;
    const existUser = await Auth.findOne({ username: body.username });
    if (existUser) {
      return res
        .status(400)
        .json({ message: { username: "Tài khoản đã tồn tại" } });
    }

    const existEmail = await Auth.findOne({ email: body.email });
    if (existEmail) {
      return res.status(400).json({
        message: {
          email: "Email đã tồn tại",
        },
      });
    }

    const user = await new Auth(body).save();
    return res.status(200).json({ message: "register success", user });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Đã có lỗi xảy ra vui lòng thử lại", error });
  }
};

// function update user
export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    let newBody = body;
    if (body?.password) {
      const password = bcrypt.hashSync(body.password, 10);
      newBody = {
        ...body,
        password,
      };
    }
    const data = await Auth.findByIdAndUpdate(id, newBody, { new: true });

    const response = {
      data,
      message: "Cập nhật thông tin người dùng thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// is_lock = false | true
export const lockUser = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    if (body.password) {
      body["password"] = bcrypt.hashSync(body.password, 10);
    }
    const data = await Auth.findByIdAndUpdate(id, body, { new: true });

    const response = {
      data,
      message: "Cập nhật thông tin người dùng thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    // status 
    return responseError(res, error);
  }
};

const authorization = () => {
  try {
  } catch (error) {
    res.status(400).json({ message: "wrong Token", error });
  }
};

// [GET] all project
const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const user_role = req.query.user_role || "";
    const is_locked = req.query.is_locked || false;
    const perPage = limit * page - limit;
    const data = await Auth.find({
      username: { $regex: search, $options: "i" },
      role: { $regex: user_role, $options: "i" },
      is_locked,
    })
      .skip(perPage)
      .limit(limit);
    const total = await Auth.countDocuments({
      username: { $regex: search, $options: "i" },
      role: { $regex: user_role, $options: "i" },
      is_locked,
    });
    const pageSize = Math.ceil(total / limit);
    return res.status(200).json({
      data,
      limit,
      rowPerPage: perPage,
      total,
      pageSize,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
  }
};

// [GET] api/user/:id
export const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Auth.findById(id);
    const response = {
      data: data,
      message: "Lấy thông tin người dùng thành công ",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export { register, login, authorization, getAll };
