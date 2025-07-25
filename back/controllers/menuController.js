const MenuItem = require('../models/MenuItem');
const ResponseHandler = require('../utils/responseHandler');
const logger = require('../utils/logger');

// Get all menu items (public endpoint)
const getPublicMenuItems = async (req, res) => {
  try {
    const { category, search, sortBy, limit = 50, offset = 0 } = req.query;
    
    let whereClause = { isAvailable: true };
    let orderClause = [['createdAt', 'DESC']];

    // Apply category filter
    if (category) {
      whereClause.category = category;
    }

    // Apply search filter
    if (search) {
      const { Op } = require('sequelize');
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          orderClause = [['price', 'ASC']];
          break;
        case 'price-desc':
          orderClause = [['price', 'DESC']];
          break;
        case 'rating':
          orderClause = [['rating', 'DESC']];
          break;
        case 'popular':
          orderClause = [['popular', 'DESC'], ['rating', 'DESC']];
          break;
        default:
          orderClause = [['createdAt', 'DESC']];
      }
    }

    const menuItems = await MenuItem.findAll({
      where: whereClause,
      order: orderClause,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const total = await MenuItem.count({ where: whereClause });

    ResponseHandler.success(res, {
      items: menuItems,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + parseInt(limit)) < total
      }
    }, 'Menu items retrieved successfully');

  } catch (error) {
    logger.error('Error fetching public menu items:', error);
    ResponseHandler.error(res, 'Failed to fetch menu items');
  }
};

// Get menu categories
const getMenuCategories = async (req, res) => {
  try {
    const { QueryTypes } = require('sequelize');
    const { adminSequelize } = require('../config/database');
    
    const categories = await adminSequelize.query(
      'SELECT DISTINCT category FROM menu_items WHERE "isAvailable" = true ORDER BY category',
      { type: QueryTypes.SELECT }
    );

    ResponseHandler.success(res, categories.map(c => c.category), 'Categories retrieved successfully');
  } catch (error) {
    logger.error('Error fetching menu categories:', error);
    ResponseHandler.error(res, 'Failed to fetch categories');
  }
};

// Get featured/popular items
const getFeaturedItems = async (req, res) => {
  try {
    const featuredItems = await MenuItem.findAll({
      where: { 
        isAvailable: true,
        popular: true 
      },
      order: [['rating', 'DESC']],
      limit: 8
    });

    ResponseHandler.success(res, featuredItems, 'Featured items retrieved successfully');
  } catch (error) {
    logger.error('Error fetching featured items:', error);
    ResponseHandler.error(res, 'Failed to fetch featured items');
  }
};

module.exports = {
  getPublicMenuItems,
  getMenuCategories,
  getFeaturedItems
};