import mongoose from "mongoose";

const ExtractedBookSchema = new mongoose.Schema({
    BookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books', 
        required: true
    },
    extractedText: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ExtractedTextFromBook = mongoose.model('ExtractedBookText', ExtractedBookSchema);
export default ExtractedTextFromBook;
