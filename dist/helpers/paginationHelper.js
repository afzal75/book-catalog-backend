"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const skip = (page - 1) * limit;
    const size = Number(options.size || 10);
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    return {
        page,
        limit,
        size,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.paginationHelpers = {
    calculatePagination,
};
