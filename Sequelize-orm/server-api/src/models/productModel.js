module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        image: {
            type: DataTypes.STRING
        },
        categoryId: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    
    })

    return Product

}

