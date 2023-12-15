import { Document, Schema, Types, model } from "mongoose";

interface IComment extends Document {
    body?: string;
    author: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
    body: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

const Comment = model<IComment>('Comment', CommentSchema);

export default Comment;

