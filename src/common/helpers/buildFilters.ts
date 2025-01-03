import { Op } from 'sequelize';

export const buildFilters = (query: any, filterableColumns: string[], searchableColumns: string[]) => {
  const filters: any = {};
  // Pagination
  if (query.page && query.limit) {
    const page = parseInt(query.page, 10);
    const limit = parseInt(query.limit, 10);
    filters.limit = limit;
    filters.offset = (page - 1) * limit;
  }

  // Sorting
  if (query.sortBy) {
    const order = query.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    filters.order = [[query.sortby, order]];
  }

  // Generatl filters
  if (filterableColumns.length) {
    filters.where = {};
    for (const column of filterableColumns) {
      if (query[column]) {
        filters.where[column] = query[column];
      }
    }
  }

  // Search functionality
  if (query.search && searchableColumns.length) {
    filters.where = filters.where || {};
    filters.where[Op.or] = searchableColumns.map((column) => ({
      [column]: { [Op.like]: `%${query.search}%` },
    }));
  }

  return filters;
};
