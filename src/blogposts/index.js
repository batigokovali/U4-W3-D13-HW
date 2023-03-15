import express from "express"
import createHttpError from "http-errors"
import BlogpostsModel from "./model.js"

const blogpostsRouter = express.Router()

blogpostsRouter.post("/", async (req, res, next) => {
    try {
        const newBlogpost = new BlogpostsModel(req.body)
        const { _id } = await newBlogpost.save()
        res.status(201).send({ _id })
    } catch (error) {
        next(error)
    }
})

blogpostsRouter.get("/", async (req, res, next) => {
    try {
        const blogposts = await BlogpostsModel.find()
        res.send(blogposts)
    } catch (error) {
        next(error)
    }
})

blogpostsRouter.get("/:blogpostID", async (req, res, next) => {
    try {
        const blogpost = await BlogpostsModel.findById(req.params.blogpostID)
        if (blogpost) {
            res.send(blogpost)
        } else {
            next(createHttpError(404, `Blogpost with id ${req.params.blogpostID} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

blogpostsRouter.put("/:blogpostID", async (req, res, next) => {
    try {
        const updatedBlogpost = await BlogpostsModel.findByIdAndUpdate(
            req.params.blogpostID,
            req.body,
            { new: true, runValidators: true }
        )
        if (updatedBlogpost) {
            res.send(updatedBlogpost)
        } else {
            next(createHttpError(404, `Blogpost with id ${req.params.blogpostID} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

blogpostsRouter.delete("/:blogpostID", async (req, res, next) => {
    try {
        const deletedBlogpost = await BlogpostsModel.findByIdAndDelete(req.params.blogpostID)
        if (deletedBlogpost) {
            res.status(204).send()
        } else {
            next(createHttpError(404, `Blogpost with id ${req.params.blogpostID} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

export default blogpostsRouter