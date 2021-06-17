exports.register = (req, res) => {
  // const

  const { name, email, password, passwordConfirm } = req.body;

//   const user = new User({
//     name: req.body.name,
//     lastname: req.body.lastname,
//     login: req.body.login,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm,
//   });

  sql.query(
    "SELECT * FROM auth_users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length > 0) {
        return res.render("register", {
          message: "That email in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Password don't match",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      sql.query(
        "INSERT INTO auth_users SET ? ",
        { name: name, email: email, password: hashedPassword },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log(results, req.body);
            return res.render("register", {
              message: "User registered successful ",
            });
          }
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).render("login", {
        message: "Please insert email",
      });
    } else if (!password) {
      return res.status(400).render("login", {
        message: "Please insert password",
      });
    }
    sql.query("SELECT * FROM auth_users WHERE email = ?",[email], async (err, results) => {
        console.log(results);
        if (!results ||!(await bcrypt.compare(password, results[0].password))) {
          res.status(401).render("login", {
            message: "Email or Password is incorrect",
          });
        } else {
          const id = results[0].id;
          const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          console.log("token is: " + token);

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          res.cookie("jwt", token, cookieOptions);
          res.status(200).redirect("/");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
