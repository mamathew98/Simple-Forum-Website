const { all } = require("../routes/home.routes")

exports.getHomePage = (req, res) => {
    if(user.acc_id == 0) {
        res.redirect('/')
        return 
    }
    let query = `SELECT  p.post_id, p.body,p.img, a.name, a.email, a.img as userImg FROM Account a INNER JOIN Post p on a.acc_id = p.author_id ORDER BY p.post_id DESC`

    db.query(query, (err, result) => {
        if(err){
            console.log(err)
            return res.status(500).send(err);
        }
        global.allPosts = result.recordset
        // console.log(allPosts)
        res.render('home.ejs', {posts: allPosts})
    })
}


exports.sendPost = (req, res) => {
    // console.log(req.files)
    let message = '';
    let postBody = String(req.body.postBody);
    let authID = user.acc_id;

    if (req.files !== null) {
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
    
        if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            uploadedFile.mv(`public/img/${image_name}`, (err ) => {
                if (err) {
                    return res.status(500).send(err);
                }
                let query = `INSERT INTO Post (body, author_id, img) VALUES ('${postBody}', '${authID}', '${image_name}')`
    
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    res.redirect('/home')
                })
            })
        }
    }else {
        let query = `INSERT INTO Post (body, author_id) VALUES ('${postBody}', '${authID}')`
    
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.redirect('/home')
        })
    }

   

}