const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ // Validar formato de e-mail
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    validate: {
      validator: function(v) {
        // Validar senha forte
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{7,}$/.test(v);
      },
      message: props => `${props.value} não é uma senha forte! A senha deve conter pelo menos 7 caracteres, incluindo letras maiúsculas, minúsculas e números.`
    },
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

// Encrypt password before saving to the database
UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
