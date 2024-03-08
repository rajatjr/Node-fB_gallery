const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_sdirect", "sdirect", "Sm@rtPu92023", {
  host: "192.168.0.2",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Db connected....");
    await sequelize.sync();
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = sequelize;
