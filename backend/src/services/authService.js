const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const createUser = async (name, email, password) => {
  const hashedPassword = await hashPassword(password);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword }
  });
};

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({ 
    where: { id },
    select: { id: true, name: true, email: true, createdAt: true }
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  createUser,
  findUserByEmail,
  findUserById
};