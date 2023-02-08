const Joi =  require("joi");


//pasar _id a string

class UserDto {
    constructor(user) {
        this._id = user._id.toString();
        this.name = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.age = user.age;
        this.country = user.country
        this.city = user.city;
        this.address = user.address;
        this.phone = user.phone;
        this.avatarUrl = user.avatarUrl;
    }



    static validate(user) {
        const schema = Joi.object({
            _id: Joi.string().min(3).max(50).required(),
            name: Joi.string().min(3).max(50).required(),
            lastName: Joi.string().min(3).max(50).required(),
            email: Joi.string().min(3).max(50).required(),
            age: Joi.number().integer().min(1).required(),
            country: Joi.string().min(3).max(50).required(),
            city: Joi.string().min(3).max(50).required(),
            address: Joi.string().min(3).max(50).required(),
            phone: Joi.number().integer().min(1).required(),
            avatar: Joi.string().min(3).max(50).required()  
        });
        return schema.validate(user);
    }
}

module.exports = UserDto;