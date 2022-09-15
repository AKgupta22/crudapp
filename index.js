const express = require("express")

const BodyParser = require("body-parser")
const encoder = BodyParser.urlencoded()

const app = express()

const path = require("path")

const hbs = require("hbs")

const employee = require("./models/Employee")

require("./db_connect")

app.use(express.static(path.join(__dirname, "./views")))

hbs.registerPartials(path.join(__dirname, "./views/partials"))

app.set("view engine", "hbs")

app.get("/", async (req, res) => {
    try {

        const Data = await employee.find()
        res.render("index", { 'data': Data })
    }
    catch (error) {
        console.log(error);
        console.log("Internal Server error");
    }
})

app.get("/add", async (req, res) => {
    res.render("add")
})

app.post("/add", encoder, async (req, res) => {
    try {
        const Data = new employee(req.body)
        await Data.save()
        res.redirect("/")
    }
    catch (error) {
        alert("Internal server error")
    }
})

app.get("/delete/:_id", async (req, res) => {

    try {
        const Data = await employee.deleteOne({ _id: req.params._id })
        res.redirect("/")
    }
    catch (error) {
        console.log("Internal server error");
    }

})

app.get("/edit/:_id", async (req, res) => {

    try {
        const data = await employee.findOne({ _id: req.params._id })
        res.render("edit", { data: data })
    }
    catch (error) {
        console.log(error);
    }
})

app.post("/edit/:_id", encoder, async (req, res) => {

    try {
        const data = await employee.findOne({ _id: req.params._id })
        data.name = req.body.name ?? data.name
        data.Salary = req.body.Salary ?? data.Salary
        data.Dsg = req.body.Dsg ?? data.Dsg
        data.City = req.body.City ?? data.City
        data.State = req.body.State ?? data.State

        await data.save()
        res.redirect('/')
    }
    catch (error) {
        console.log(error);
    }
})

app.post("/search", encoder, async (req, res) => {
    try {
        const data = await employee.find({
            $or: [
                { name: { $regex: `.*${req.body.search}.*`, $options: 'i' } },
                { Dsg: { $regex: `.*${req.body.search}.*`, $options: 'i' } },
                { City: { $regex: `.*${req.body.search}.*`, $options: 'i' } },
                { State: { $regex: `.*${req.body.search}.*`, $options: 'i' } }
            ]
        })
        res.render("index", { 'data': data })
    }
    catch (error) {
        console.log(error);
    }
})

app.listen(7575, () => {
    console.log("server running at 7575 port");
})