const sqlite3 = require("sqlite3").verbose()

const dbFile = "db.sqlite"

// se connecter à la base de donnée

let db = new sqlite3.Database(dbFile, (err)=>{
    if(err){
        console.error(err.message)
        throw err
    }else{
        console.log("connexion à la base sqlite3..." );
        const sql =`CREATE TABLE Article (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Titre text,
            Résumé text, 
            Contenu text,
            Auteur text, 
            DateCréation text, 
            DateDernièreMiseàJour text
        )`;
        db.run(sql, (err) =>  {
            if (err){ 
            console.log("Table déja cree");
            }
            
        });
    }
});

module.exports = db;