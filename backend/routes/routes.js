import express from 'express';
import { uploadBook,getAllBooks,updateBook, deleteBook,getBook } from '../controllers/bookController.js';
import { createExtractedText } from '../controllers/extractedTextController.js';
import { uploadFiles } from '../middleware/multer.js';
const router = express.Router()



router.post('/uploadBook',uploadFiles.fields([{
    name:"bookFile" ,maxCount:1
},
{name:"imageFile",maxCount:2

}
]),uploadBook)
router.get('/test', (req, res) => res.send('Route works!'));
router.post('/extract-text',createExtractedText)
router.get('/all-books',getAllBooks)


router.put('/update-book/:id',updateBook)
router.delete('/delete-book/:id',deleteBook)
router.get('/get-book/:id',getBook)

export default router