const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/registration", async (req, res) => {
    const registerData = req.body
    try{
        const candidate = await User.findOne({ email: registerData.email });
        if (candidate) {
            throw new Error("Пользователь с таким email уже существует");
        }
        const hashedPassword = await bcrypt.hash(registerData.password, 5);
        const newUser = await new User({
            ...registerData, 
            password: hashedPassword, 
        }).save();
        return res.send({ message: "Вы успешно зарегистрировались", newUser })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
router.post("/login", async (req, res) => {
    const loginData = req.body;
    try {
        const user = await User.findOne({ email: loginData.email });
        if (!user) {
            throw new Error(
                "Пользователь с таким email не существует. Укажите верный email"
            );
        } 
        const isTruePassword = await bcrypt.compare(
            loginData.password,
            user.password
        );
        if (!isTruePassword) {
            throw new Error("Укажите верный пароль");
        }
        return res.send({ message: "Вы успешно вошли в свой аккаунт", user });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

module.exports = router;