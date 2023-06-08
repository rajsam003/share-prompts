import mongoose, { Schema, model, models } from "mongoose"

export interface IPrompt extends Document {
  _id: string
  creator: {
    _id: string
    username: string
    image: string
    email: string
  }
  prompt: string
  tag: string
}

const PromptSchema: Schema<IPrompt> = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
})

const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt
