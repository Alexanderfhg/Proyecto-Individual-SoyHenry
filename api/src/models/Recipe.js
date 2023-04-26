const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    summary: {
      type: DataTypes.TEXT
    },
    level: {
      type: DataTypes.INTEGER
    },
    process: {
      type: DataTypes.TEXT
    }
  }, { timestamps: false });
};