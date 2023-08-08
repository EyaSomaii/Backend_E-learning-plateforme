const Utilisateur = require("../Models/Utilisateur");
const Module = require("../Models/Module");
const Chapitre = require("../Models/Chapitre");
const Lesson = require("../Models/Lesson");
const Formations = require("../Models/Formations");

//NombreDesFormateurs
exports.NombreDesFormateurs = async (req, res) => {
  let i = 0;
  const nbrformateurs = await Utilisateur.find({
    Role: "Formateur",
  })
    .then((result) => {
      for (k of result) {
        i = i + 1;
      }
      res.status(200).json(i);
    })

    .catch((err) => {
      console.log(err);
    });
};

//NombresDesEtudiants
exports.NombresDesEtudiants = async (req, res) => {
  let i = 0;
  const nbreudiants = await Utilisateur.find({
    Role: "Etudiant",
  })
    .then((result) => {
      for (k of result) {
        i = i + 1;
      }
      res.status(200).json(i);
    })

    .catch((err) => {
      console.log(err);
    });
};

//NombreDesModules
exports.NombreDesModules = async (req, res) => {
  let i = 0;
  const nbrModules = await Module.find()
    .then((result) => {
      for (k of result) {
        i = i + 1;
      }
      res.status(200).json(i);
    })

    .catch((err) => {
      console.log(err);
    });
};
//NombresDesChapitres
exports.NombresDesChapitres = async (req, res) => {
  let i = 0;
  const nbrChapitres = await Chapitre.find()
    .then((result) => {
      for (k of result) {
        i = i + 1;
      }
      res.status(200).json(i);
    })

    .catch((err) => {
      console.log(err);
    });
};
//NombresDesLecon
exports.NombresDesLecon = async (req, res) => {
  let i = 0;
  const nbrleçon = await Lesson.find()
    .then((result) => {
      for (k of result) {
        i = i + 1;
      }
      res.status(200).json(i);
    })

    .catch((err) => {
      console.log(err);
    });
};

//NombresFormations
exports.NombresFormations = async (req, res) => {
  let i = 0;
  const nbrformations = await Formations.find()
    .then((result) => {
      for (k of result) {
        i = i + 1;
      }
      res.status(200).json(i);
    })

    .catch((err) => {
      console.log(err);
    });
};

//ToTalPrix
exports.ToTalPrix = async (req, res) => {
  let i = 0;
  const ToTalPrix = await Utilisateur.find({ Role: "Etudiant" })
    .then((result) => {
      for (k of result) {
        i = i + k.Prix;
      }
      res.status(200).json(i);
    })

    .catch((err) => {
      console.log(err);
    });
};

//ToTalPrixdeChaqurFormation
exports.ToTalPrixdeChaqurFormation = async (req, res) => {
  let form = [];
  let formEtu = [];
  let i = 0;
  let info = [];
  const formateurs = await Formations.find().then((result) => {
    for (k of result) {
      form.push({ id: k._id, name: k.Titre });
    }
    console.log(form);
    const Etus = Utilisateur.find({ Role: "Etudiant" }).then((item) => {
      for (x of item) {
        for (f of x.formation) {
          formEtu.push(f.toString().split(" ")[0]);
        }
      }
      for (z of form) {
        for (a of formEtu) {
          if (z.id == a) {
            i = i + x.Prix;
          }
        }

        info.push({ name: z.name, TotalPrix_par_DT: i });
        i = 0;
      }
      console.log(info);
      res.send(info);
    });
  });
};
