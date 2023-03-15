import mongoose from "mongoose"

const { Schema, model } = mongoose

const blogpostsSchema = new Schema(
    {
        category: { type: String, required: true },
        title: { type: String, required: true },
        cover: { type: String, required: true },
        readTime: {
            value: { type: Number, required: true },
            unit: {
                type: String, required: true,
                validate: {
                    validator: function (unit) {
                        return ["seconds", "minutes", "hours", "years"].includes(unit);
                    },
                    message: "Unit must be one of 'seconds', 'minutes','hours' oe 'years'!",
                },
            }
        },
        author: {
            name: { type: String, required: true },
            avatar: { type: String, required: true },
        },
        content: { type: String, required: true }
    },
    {
        timestamps: true,
    }
)

export default model("Blogpost", blogpostsSchema)