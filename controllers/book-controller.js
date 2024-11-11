const {UserModel, BookModel} =require("../model");

// const getallbooks

exports.getAllBooks = async(req, res) => {
    const  books = await BookModel.find();

    if (books.length ===0) {
        return res.status(404).json({

            success : false,
            message : "No Book Found",
        });
    }
    console.log(data);
    return res.status(200).json({
        success: true,
        data:books,
    });
};

exports.getSingleBookById = async(req, res) => {
    const {id} =req.params;
    const  book = await BookModel.findById(id);

    if (!book) {
        return res.status(404).json({

            success : false,
            message : "Book Not Found",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Found The Book By Their Id",
        data:book,
    });
};

exports.getAllIssuedBooks = async(req, res) => {
   // const {id} =req.params;
    const users = await UserModel.find({
        issuedBook: {$exists:true },
    }).populate("issuedBook")  ;

    if (this.getAllIssuedBooks.length === 0) {
        return res.status(404).json({

            success : false,
            message : "No Book Have Been Issued Yet ..",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Users With The  Issued Books ...",
        data:issuedBooks,
    });
};
