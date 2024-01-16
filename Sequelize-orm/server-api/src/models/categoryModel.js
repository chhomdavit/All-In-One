module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("categories", {
        image_category: {
            type: DataTypes.STRING
        },
        title_category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description_category: {
            type: DataTypes.TEXT
        }
    })

    return Category
}