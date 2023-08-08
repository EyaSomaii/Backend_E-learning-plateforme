const Users = require("../Models/Utilisateur");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
var generator = require("generate-password");
const jwt = require("jsonwebtoken");
const Formations = require("../Models/Formations");
const fs = require("fs");
const hogan = require("hogan.js");
const { use } = require("passport");

//GetEtudiantsParFormation
exports.GetEtudiantsParFormation = async (req, res) => {
  const etu = await Users.find({ Role: "Etudiant" })
    .select("formation")
    .populate("formation");

  res.send(etu);
};
//Ajouter_CV
exports.Ajouter_cv = async (req, res) => {
  var userr = new Users();
  user = Users.findById({ _id: req.params.userId });
  console.log(req.file);
  console.log(req.files);
  user = await user.updateOne({
    cv: `${req.protocol}://${req.get("host")}/Uploads/${req.files[0].filename}`,
  });

  res.status(200).send(user);
};
//Ajouter_Nouveau_Utilisateur

exports.AjouterUtilisateur = async (req, res) => {
  const salt = await bcrypt.genSalt();
  var user = new Users();
  var mot_de_passe = generator.generate({
    length: 10,
    numbers: true,
  });
  console.log(mot_de_passe);
  let tab = [];

  var i = 0;
  while (req.body.formation.split(",")[i] != null) {
    form = await Formations.find({
      Titre: req.body.formation.split(",")[i],
    }).then((result) => {
      for (k of result) {
        tab.push(k._id);
        console.log(k._id);
      }
    });
    i++;
  }

  const hashedPassword = await bcrypt.hash(mot_de_passe, salt);
  const now = new Date();
  (user.nom = req.body.nom),
    (user.prenom = req.body.prenom),
    (user.numTel = req.body.numTel),
    (user.Adresse = req.body.Adresse),
    (user.email = req.body.email),
    (user.mot_de_passe = hashedPassword),
    (user.occupation = req.body.occupation),
    (user.Role = req.body.Role),
    (user.formation = tab),
    (user.Prix = req.body.Prix),
    (user.image = `${req.protocol}://${req.get("host")}/Uploads/${
      req.files[0].filename
    }`),
    user.populate("formation");
  console.log(req.body);

  user.save((err) => {
    if (err) {
      console.log(err);
    } else {
      const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: "eya.somai134t@gmail.com",
          pass: "****",
        },
        secure: false,
      });
      //Load the template file
      const templateFile = fs.readFileSync("mail.html", "utf8");

      const templateCompiled = hogan.compile(templateFile);

      let mailOptions = {
        from: "eya.somai134t@gmail.com",
        to: req.body.email,
        subject: "Abonnement Yocareer ",
        html: templateCompiled.render({
          nom: req.body.nom,
          prenom: req.body.prenom,
          email: req.body.email,
          mdp: mot_de_passe,
        }),
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        }

        res.status(200).send({ message: "mail sent" });
      });

      res.status(200).send(user);
      console.log(user);
    }
  });
};

//Modifier_Utilisateur

exports.Modifier_Utilisateur = async (req, res, next) => {
  let tab = [];
  let AncienFormation = [];
  console.log(req.body.formation);
  if (req.body.formation != undefined) {
    for (let index = 0; index < req.body.formation.length; index++) {
      form = await Formations.find({ Titre: req.body.formation[index] }).then(
        (result) => {
          for (i of result) {
            tab.push(i._id);
          }
        }
      );
    }
  }
  await Users.findById(req.params.userId).then((user) => {
    AncienFormation = user.formation;
  });
  console.log(req.body);
  const user = req.file
    ? {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numTel: req.body.numTel,
        Adresse: req.body.Adresse,
        email: req.body.email,
        occupation: req.body.occupation,
        Role: req.body.Role,
        formation: tab.concat(AncienFormation),
        image: `${req.protocol}://${req.get("host")}/Uploads/${
          req.file.filename
        }`,
        Prix: req.body.Prix,
      }
    : {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numTel: req.body.numTel,
        Adresse: req.body.Adresse,
        email: req.body.email,
        occupation: req.body.occupation,
        formation: tab.concat(AncienFormation),
        Prix: req.body.Prix,
      };
  console.log(req.body);
  Users.updateOne(
    { _id: req.params.userId },
    { ...user, _id: req.params.userId }
  )
    .then(() => res.status(200).json({ message: "user modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

//Supprimer_Utilisateur

exports.Supprimer_Utilisateur = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.userId);
    console.log(user, "Deleted");
    res.status(200).json({
      success: "True",
      data: user,
    });
  } catch (err) {
    (err) => console.log(err);
  }
};

//Afficher_Etudiants

exports.Afficher_Etudiants = async (req, res) => {
  let etu = [];
  const etudiants = await Users.find()
    .populate("formation")
    .then((result) => {
      for (etudiant of result) {
        if (etudiant.Role == "Etudiant") {
          etu.push(etudiant);
        }
      }
      res.send(etu);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Afficher_Formateur

exports.Afficher_Formateurs = async (req, res) => {
  let form = [];
  const formateurs = await Users.find()
    .populate("formation")
    .then((result) => {
      for (formateur of result) {
        if (formateur.Role == "Formateur") {
          form.push(formateur);
        }
      }
      res.send(form);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Afficher_Admin

exports.Afficher_Administrateurs = async (req, res) => {
  let adm = [];
  const administrateurs = await Users.find()
    .then((result) => {
      for (administrateur of result) {
        if (administrateur.Role == "Administrateur") {
          adm.push(administrateur);
        }
      }
      res.send(adm);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Afficher_byid
exports.Afficher_ut = async (req, res) => {
  const user = await Users.find({ _id: req.params.userId })
    .populate("formation")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Modifier_mdp

exports.Modifier_mdp = async (req, res) => {
  const user = await Users.findById(req.params.userId);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, salt);
  let info = {
    oldpassword: req.body.oldpassword,
    mot_de_passe: hashedPassword,
    confirm_mdp: req.body.confirm_mdp,
    TestConnection: true,
  };
  console.log(info);
  try {
    if (
      bcrypt.compareSync(req.body.oldpassword, user.mot_de_passe) &&
      req.body.confirm_mdp == req.body.mot_de_passe
    ) {
      const userr = await Users.findByIdAndUpdate(req.params.userId, info);

      res.status(200).json({
        success: "PATCH user route has been executed",
        data: userr,
      });
    } else {
      console.log("invalide");
      res.status(500).json({ error });
      /**res.status(200).json({
        success: "PATCH user route has been executed",
        data: userr,
      });*/
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//Login

exports.login = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      console.log(req.body.email);
      console.log(req.body.mot_de_passe);
      bcrypt
        .compare(req.body.mot_de_passe, user.mot_de_passe)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//afficher_ParFormation_formateur
exports.Afficher_Par_Formation = async (req, res) => {
  let form = [];
  const formateurs = await Users.find()
    .then((result) => {
      for (formateur of result) {
        if (formateur.Role == "Formateur") {
          for (k of formateur.formation) {
            if (k.nom == req.body.form);
          }
          form.push(formateur);
        }
      }
      console.log(form);
      res.send(form);
    })
    .catch((err) => {
      console.log(err);
    });
};
//afficher_ParFormation_etudiant
exports.Afficher_Par_Formation_parEtudiants = async (req, res) => {
  let form = [];
  const formateurs = await Users.find()
    .then((result) => {
      for (formateur of result) {
        if (formateur.Role == "Etudiant") {
          for (k of formateur.formation) {
            if (k.Titre == req.body.form);
          }
          form.push(formateur);
        }
      }
      console.log(form);
      res.send(form);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Afficher_Les_Etu_ParID_Formation
exports.Afficher_Les_Etu_ParID_Formation = async (req, res) => {
  let form = [];
  const formateurs = await Users.find()
    .then((result) => {
      for (formateur of result) {
        if (formateur.Role == "Etudiant") {
          for (k of formateur.formation) {
            if (k._id == req.params.userId) {
              form.push(formateur);
            }
          }
        }
      }
      res.send(form);
    })
    .catch((err) => {
      console.log(err);
    });
};
//GetNombreFormationAssocierAuFormateur
exports.GetNombreFormationAssocierAuFormateur = async (req, res) => {
  let form = [];
  let j = 0;
  const formateurs = await Users.findById({ _id: req.params.userId })
    .then((result) => {
      for (k of result.formation) {
        j = j + 1;
      }
      console.log(j);
      res.status(200).json(j);
    })

    .catch((err) => {
      console.log(err);
    });
};

//GetNombreEtuDiantAssocierAuFormateur
exports.GetNombreEtuDiantAssocierAuFormateur = async (req, res) => {
  let form = [];
  var i = 0;
  let tab = [];
  const formateurs = await Users.findById({ _id: req.params.userId }).then(
    (result) => {
      const Etus = Users.find({ Role: "Etudiant" }).then((item) => {
        for (x of item) {
          for (y of x.formation) {
            for (k of result.formation) {
              if (y.toString().split(" ")[0] === k.toString().split(" ")[0]) {
                tab.push(k);
                i++;
              }
            }
          }
        }
        res.status(200).json(i);
      });
    }
  );
};

//GetLesFormationsAvecNbrEtuDeChacune
exports.GetLesFormationsAvecNbrEtuDeChacune = async (req, res) => {
  let form = [];
  let formEtu = [];
  let i = 0;
  let info = [];
  const formateurs = await Users.findById({ _id: req.params.userId })
    .populate("formation")
    .then((result) => {
      for (l of result.formation) {
        form.push({ id: l._id.toString().split(" ")[0], nom: l.Titre });
      }

      const Etus = Users.find({ Role: "Etudiant" }).then((item) => {
        for (x of item) {
          for (f of x.formation) {
            formEtu.push(f.toString().split(" ")[0]);
          }
        }
        for (z of form) {
          for (a of formEtu) {
            if (z.id == a) {
              i++;
            }
          }

          info.push({ name: z.nom, Nombre_Etudiants_par_Formation: i });
          i = 0;
        }
        res.send(info);
        //console.log(formEtu);
      });
    });
};

//RechercheUser
exports.RechercheUser = async (req, res) => {
  const keyword = req.query.search;
  /**  ? {
        $or: [
          { nom: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};*/

  const users = await Users.find({ nom: keyword });
  /** .find({
    _id: { $ne: req.params.userId },
  });*/
  res.send(users);
};
//ElimnerEtudiant

exports.ElimnerEtudiant = async (req, res) => {
  let tab_etud = [];
  user = await Users.findById({ _id: req.params.userId });

  for (k of user.formation) {
    tab_etud.push(k.toString().split(" ")[0]);
  }
  var x = tab_etud.indexOf(req.params.formationId);
  if (x !== -1) {
    tab_etud.splice(x, 1);
  }
  //console.log(tab_etud);
  userr = await user.updateOne({
    formation: tab_etud,
  });
  //console.log(lec);
  res.send(userr);
};

//Recuperer_mes_formations
exports.Recuperer_mes_formations = async (req, res) => {
  let tab_forms = [];
  const user = await Users.findById(req.params.userId);

  const formations = await Formations.find().then((result) => {
    for (fom of result) {
      if (user.formation.length != 0) {
        if (user.formation.includes(fom._id)) {
          tab_forms.push(fom);
        }
      }
      if (user.formation.length == 0) {
        tab_forms.push(fom);
      }
    }
  });

  res.send(tab_forms);
};

//Recuperer_not_mes_formations
exports.Recuperer_not_mes_formations = async (req, res) => {
  let tab_forms = [];
  const user = await Users.findById(req.params.userId);

  const formations = await Formations.find().then((result) => {
    for (fom of result) {
      if (user.formation.length != 0) {
        if (!user.formation.includes(fom._id)) {
          tab_forms.push(fom);
        }
      }
      if (user.formation.length == 0) {
        tab_forms.push(fom);
      }
    }
  });

  res.send(tab_forms);
};

//RecupererUsersChats
exports.RecupererUsersChats = async (req, res) => {
  let tab_users = [];
  const user = await Users.findById(req.params.userId).then((result) => {
    if (result.Role === "SPAdmin" || result.Role === "Administrateur") {
      const users = Users.find().then((us) => {
        for (useeee of us) {
          if (
            !tab_users.includes(useeee) &&
            useeee._id.toString().split(" ")[0] !=
              result._id.toString().split(" ")[0]
          ) {
            tab_users.push(useeee);
          }
        }
        res.send(tab_users);
      });
    } else if (result.Role === "Formateur") {
      const users = Users.find().then((us) => {
        for (userr of us) {
          if (
            userr.Role === "SPAdmin" ||
            userr.Role === "Administrateur" ||
            userr.Role === "Formateur"
          ) {
            if (
              !tab_users.includes(userr) &&
              userr._id.toString().split(" ")[0] !=
                result._id.toString().split(" ")[0]
            ) {
              tab_users.push(userr);
            }
          }
          if (userr.Role === "Etudiant") {
            for (etud of result.formation) {
              if (userr.formation.includes(etud)) {
                if (
                  !tab_users.includes(userr) &&
                  userr._id.toString().split(" ")[0] !=
                    result._id.toString().split(" ")[0]
                ) {
                  tab_users.push(userr);
                }
              }
            }
          }
        }
        res.send(tab_users);
      });
    } else {
      const usersss = Users.find().then((uss) => {
        for (usee of uss) {
          if (usee.Role === "SPAdmin" || usee.Role === "Administrateur") {
            if (
              !tab_users.includes(usee) &&
              usee._id.toString().split(" ")[0] !=
                result._id.toString().split(" ")[0]
            ) {
              tab_users.push(usee);
            }
          } else if (usee.Role === "Formateur" || usee.Role === "Etudiant") {
            for (u of result.formation) {
              if (usee.formation.includes(u)) {
                if (
                  !tab_users.includes(usee) &&
                  usee._id.toString().split(" ")[0] !=
                    result._id.toString().split(" ")[0]
                ) {
                  tab_users.push(usee);
                }
              }
            }
          }
        }
        res.send(tab_users);
      });
    }
  });
};
