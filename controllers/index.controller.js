exports.getaAuthPage = (req, res) => {
    res.render('index.ejs',{message: ''})
}

exports.signup = (req, res) => {
    let message = '';
    let email = String(req.body.email);
    let pass = String(req.body.pass);
    let name = req.body.name;

    let emailQuery = `SELECT * FROM Account WHERE email = '${email}'`

    db.query(emailQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.recordset.length > 0) {
            message = 'Email Already Exists';
            res.render('index.ejs', {message});

        }else {
            let query = `INSERT INTO Account (name, email, img, pass, job, address, phone) VALUES ('${name}','${email}','person.png', '${pass}', '', '', '')
                        SELECT acc_id FROM Account WHERE email = '${email}' `
            db.query(query, (err, result) => {
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                global.user = {
                    acc_id: result.recordset[0].acc_id,
                    email: result.recordset[0].email,
                    img: 'person.png',
                    name: result.recordset[0].name
                }
                console.log(user)
                res.redirect('/home')
            })
        }
    })
}

exports.signin = (req, res) => {
    let message = '';
    let email = String(req.body.email2);
    let pass = String(req.body.pass2);

    let emailQuery = `SELECT * FROM Account WHERE email = '${email}'`

    db.query(emailQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        // console.log(result);
        if (result.recordset.length < 1) {
            message = 'You Dont Have Any Account';
            res.render('index.ejs', {message});
        }else {
            let query = `SELECT * FROM Account WHERE email = '${email}' `
            db.query(query, (err, result) => {
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                else if (pass != result.recordset[0].pass) {
                    message = 'Wrong Password'
                    res.render('index.ejs', {message});
                }
                else {
                    global.user = {
                        acc_id: result.recordset[0].acc_id,
                        email: result.recordset[0].email,
                        img: result.recordset[0].img,
                        name: result.recordset[0].name,
                        job:result.recordset[0].job,
                        address: result.recordset[0].address,
                        phone: result.recordset[0].phone,
                    }
                    console.log(user)
                    res.redirect('/home')
                }
            })
        }
    })
}