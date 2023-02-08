const express = require("express");
const db = require("./db.js");

const app = express();

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const port = 3000;

app.get("/", function (req,res){
    res.json({ message: "l'API marche bien"});
    
});

// Lister les Articles
app.get("/api/Articles",(req, res) => {
    const sql = "SELECT * FROM Article";
    
    db.all(sql, (err, rows) => {
        if(err){
            res.status(400).json({error: err.message});
            return;
            }
            res.json({ message: "Lister les Articles", data: rows });
    });
});

//Ajoutez un formulaire qui permet d'ajouter un article
app.get("/api/Articles/:id",(req, res) => {
    const{id: ArticleID} = req.params;
    const sql = "SELECT * FROM Article WHERE  id= ?";
    const params= [ArticleID]
    db.get(sql, params, (err, row) => {
        if(err){
            res.status(400).json({error: err.message});
            return;
            }
            res.json({ message: `ajouter un article ${ArticleID}`, data: row });
    });
});

// creer un nouveau article

app.post("/api/Articles", (req, res) => {
    const{Titre, Résumé, Contenu, Auteur, DateCréation, DateDernièreMiseàJour} = req.body;

    if(!Titre || !Résumé || !Contenu || !Auteur || !DateCréation || !DateDernièreMiseàJour){
        res.status(400).json({error: "Merci de remplir tous les champs!" });
        return
    }

    const article = {Titre, Résumé, Contenu, Auteur, DateCréation, DateDernièreMiseàJour};
    const sql = `INSERT INTO Article (Titre ,Résumé ,Contenu ,Auteur ,DateCréation ,DateDernièreMiseàJour) VALUES (?,?,?,?,?,?)`;
    const params = [article.Titre, article.Résumé, article.Contenu, article.Auteur, article.DateCréation, article.DateDernièreMiseàJour];
    db.run(sql, params, function(err, result){

        if(err){
            res.status(400).json({error: err.message});
            return;
            }

            res.status(201).json({ message: "article Creer avec Sucees", data: article });

    });

    });

// Ajoutez un formulaire qui permet de modifier un article
app.put("/api/Articles/:id", (req, res) => {
    const{ id: ArticleID } = req.params;
    const{ Titre, Résumé, Contenu, Auteur, DateCréation, DateDernièreMiseàJour } = req.body;

    if(!Titre || !Résumé || !Contenu || !Auteur || !DateCréation || !DateDernièreMiseàJour){
        res.status(400).json({error: "Merci de remplir tous les champs!" });
        return;
        
    }

    const article = { Titre, Résumé, Contenu, Auteur, DateCréation, DateDernièreMiseàJour  };
    const sql = "UPDATE Article SET Titre = ?, Résumé = ?, Contenu = ?, Auteur = ?, DateCréation = ?, DateDernièreMiseàJour = ? WHERE id = ?";
    const params = [article.Titre, article.Résumé, article.Contenu, article.Auteur, article.DateCréation, article.DateDernièreMiseàJour, ArticleID];
    db.run(sql, params, function(err, result){

        if(err){
            res.status(400).json({error: err.message});
            return;
            }

            res.status(201).json({ message: `article ${ArticleID}modifié avec Sucees`, data: article });

    });

    });

    // Supprimer un Article
    app.delete("/api/Articles/:id", (req, res) => {
        const{ id: ArticleID } = req.params;
        const sql = "DELETE FROM Article WHERE id = ?";
        db.run(sql, ArticleID, function(err, result){

            if(err){
                res.status(400).json({error: err.message});
                return;
                }
    
                res.json({ message: `article ${ArticleID}supprimer avec Sucees`, data: this.changes, });
    
        });

    });

// demarrer le serveur

app.listen(port,function () {

//console.log("l'application est démarrée au port:" + port);
console.log (`L'application est démarrée au port: ${port}`);
});

