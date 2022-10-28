exports.getProfilePage = (req, res) => {
    if(user.acc_id == 0) {
        res.redirect('/')
        return 
    }
    let query = `SELECT  p.post_id, p.body,p.img, a.img as userImg, a.name FROM Account a INNER JOIN Post p on a.acc_id = p.author_id WHERE a.acc_id=${user.acc_id} ORDER BY p.post_id DESC`

    db.query(query, (err, result) => {
        if(err){
            console.log(err)
            return res.status(500).send(err);
        }
        global.userPosts = result.recordset
        // console.log(userPosts)
        res.render('profile.ejs', {userPosts: userPosts})
    })
}

exports.editPost= (req,res) => {

    let message = '';
    let postBody = String(req.body.editBody);
    let postID = req.body.postID;


    if (req.files !== null) {
        let uploadedFile = req.files.image ;
        let image_name = uploadedFile.name ;
        let fileExtension = uploadedFile.mimetype.split('/')[1] || null;

        if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            uploadedFile.mv(`public/img/${image_name}`, (err ) => {
                if (err) {
                    return res.status(500).send(err);
                }
                let query = `UPDATE Post SET body='${postBody}', img='${image_name}' WHERE post_id = ${postID}`
    
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    res.redirect('/profile')
                })
            })
        }
    }else {
        let query = `UPDATE Post SET body='${postBody}' WHERE post_id = ${postID}`
    
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.redirect('/profile')
        })
    }
}

exports.deletePost = (req, res) => {
    let message = '';
    let postID = req.body.postID2;
    let query = `DELETE FROM Post WHERE post_id = ${postID}`
    
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.redirect('/profile')
    })
}

exports.editProfile = (req, res) => {
    
    let message = '';
    let pName = req.body.pName || user.name;
    let pID = user.acc_id;
    let pJob = req.body.pJob;
    let pAddress = req.body.pAddress;
    let pPhone = req.body.pPhone;
    

    if (req.files !== null) {
        let uploadedFile = req.files.image ;
        let image_name = uploadedFile.name ;
        let fileExtension = uploadedFile.mimetype.split('/')[1] || null;

        if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            uploadedFile.mv(`public/img/${image_name}`, (err ) => {
                if (err) {
                    return res.status(500).send(err);
                }
                let query = `UPDATE Account SET name='${pName}', img='${image_name}', job='${pJob}', address='${pAddress}', phone='${pPhone}' WHERE acc_id = ${pID}
                            SELECT * FROM Account WHERE acc_id='${pID}'`
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    console.log(result.recordset[0])

                    global.user = {
                        acc_id: result.recordset[0].acc_id,
                        email: result.recordset[0].email,
                        img: result.recordset[0].img,
                        name: result.recordset[0].name,
                        job:result.recordset[0].job,
                        address: result.recordset[0].address,
                        phone: result.recordset[0].phone,
                    }
                    res.redirect('/profile')

                })
            })
        }
    }else {
        let query = `UPDATE Account SET name='${pName}', job='${pJob}', address='${pAddress}', phone='${pPhone}' WHERE acc_id = ${pID}
                    SELECT * FROM Account WHERE acc_id='${pID}'`
    
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log(result.recordset[0])
            global.user = {
                acc_id: result.recordset[0].acc_id,
                email: result.recordset[0].email,
                img: result.recordset[0].img,
                name: result.recordset[0].name,
                job:result.recordset[0].job,
                address: result.recordset[0].address,
                phone: result.recordset[0].phone,
            }
            res.redirect('/profile')

        })
    }
}