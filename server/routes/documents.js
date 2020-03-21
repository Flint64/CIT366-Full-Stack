var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");

const Document = require('../models/document');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Document.find()
    .then(documents => {
        res.status(200).json({
            message: "Documents created successfully",
            documents: documents
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.get('/:id', (req, res, next) => {
    Document.findOne({ "id" : req.params.id })
    .then(document => {
        res.status(200).json({
            message: "Document fetched successfully",
            Document: document
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");

    const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

document.save()
    .then(createdDocument => {
        res.status(201).json({
            message: "Document added successfully",
            document: createdDocument
        });
    })
    .catch(error => {
        returnError(res, error);
    })
});

router.put('/:id', (req, res, next) => {
    Document.findOne({
        id: req.params.id
    })
    .then(document => {
        document.name = req.body.name,
        document.description = req.body.description,
        document.url = req.body.url;

        Document.updateOne({
            id: req.params.id
        }, document )
        .then(result => {
            res.status(204).json({
                message: "Document updated successfully"
            })
        })
        .catch(error => {
            returnError(res, error);
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Document not found",
            error: {
                document: "Document not found"
            }
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Document.findOne({
        id: req.params.id
    })
    .then(document => {
        Document.deleteOne({
            id: req.params.id
        })
        .then(result => {
            res.status(204).json({
                message: "Document deleted successfully"
            });
        })
        .catch(error => {
            returnError(res, error);
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

module.exports = router;






















// const express = require("express");
// const Document = require("./models/Document");
// const router = express.Router();

// // getDocuments(req, res) {
//     // call the Document model find() function to get all
//     // documents in the collection
//     // Document.find();

//     // if an error occurred
//     // return response status 500 and a JSON object
//     // containing information about the error
//     // endIf

//     // return response status 200 and a JSON object
//     // containing the list of documents
   
// //    } 

//    router.get('/', function (req, res, next) {
//        getDocuments(res);
//    });

//    router.post('/', function (req, res, next) {
//         var maxDocumentId = sequenceGenerator.nextId("documents");

//         var document = new Document({
//             id: maxDocumentId,
//             name: req.body.name,
//             description: req.body.description,
//             url: req.body.url
//         });

//         saveDocument(res, document);
//    });

//    router.patch('/:id', function (req, res, next) {
//         Document.findOne({id: req.params.id}, function (err, document) {
//             if (err || !document) {
//                 return res.status(500).json({
//                     title: "No Document Found!",
//                     error: {document: "Document not found"}
//                 });
//             }

//             document.name = req.body.name;
//             document.description = req.body.description;
//             document.url = req.body.url;

//             saveDocument(res, document);

//         });
//    });

//    router.delete('/:id', function (req, res, next) {
//         var query = { id: req.params.id };

//         Document.findOne(query, function (err, document) {
//             if (err){
//                 return res.status(500).json({
//                     title: "No Document Found!",
//                     error: err
//                 });
//             }

//             if (!document){
//                 return response.status(500).json({
//                     title: "No Document Found!",
//                     error: { documentId: req.params.id }
//                 });
//             }

//             deleteDocument(res, document);
//         });
//    });

   