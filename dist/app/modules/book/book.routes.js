"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post('/create-book', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.createBook);
router.get('/', book_controller_1.BookController.getAllBooks);
router.get('/:id', book_controller_1.BookController.getSingleBook);
router.get('/:categoryId/category', book_controller_1.BookController.bookCategoryId);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.updateBook);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
