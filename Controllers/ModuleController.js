const Modules = require("../Models/Module");
const Formations = require("../Models/Formations");
const Lecon = require("../Models/Lesson");
const Chapitres = require("../Models/Chapitre");
const DepotEtudiant = require("../Models/DepotEtudiant");

const { JsonWebTokenError } = require("jsonwebtoken");
const Users = require("../Models/Utilisateur");
const { compareSync } = require("bcrypt");
exports.Ajouter_module = async (req, res) => {
  let tab = [];
  let info = {
    nom: req.body.nom,
    formateur: req.body.formateur,
  };

  module = await Modules.create(info);
  module = await module.populate("formateur");
  form = await Formations.find({ _id: req.params.userId }).then((result) => {
    for (i of result) {
      for (k of i.Module) tab.push(k);
    }
  });
  tab.push(module._id);
  form = Formations.findById({ _id: req.params.userId });
  form = await form.updateOne({
    Module: tab,
  });
  module.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(module);
    }
  });
};
//Afficher_les_chapites_par_Module

exports.Afficher_les_chapires_par_Module = async (req, res) => {
  const form = await Modules.findById(req.params.userId)
    .select("chapitres")
    .populate("chapitres");

  res.send(form);
};
exports.Afficher_Formateur_par_Module = async (req, res) => {
  let modu = [];
  let modu12 = [];
  const formation = await Formations.find({ _id: req.params.idformation }).then(
    (result) => {
      for (k of result) {
        for (i of k.Module) {
          modu.push(i.toString().split(" ")[0]);
        }
      }
    }
  );

  for (x of modu) {
    const mod = await Modules.findById({
      _id: x,
    }).then((item) => {
      if (item.formateur.toString().split(" ")[0] == req.params.userId)
        modu12.push(item); //console.log(modu12);
    });
  }
  console.log(modu12);
  res.send(modu12);
};

//Ajouter_Module
/** 
exports.Ajouter_module = async (req, res) => {
  let info = {
    nom: req.body.nom,
    formation: req.params.userId,
  };

  module = await Modules.create(info);
  module = await module.populate("formation");
  module.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(module);
    }
  });
};
*/
//Modifier_Module
exports.Modifier_module = async (req, res) => {
  let newmodule = {
    nom: req.body.nom,
    formateur: req.body.formateur,
  };
  const module = await Modules.findByIdAndUpdate(req.params.userId, newmodule);
  console.log(module);
  res.status(200).json({
    success: "PATCH formation route has been executed",
    data: module,
  });
};
//supprimerModule
const suppModuleFromTabformation = async (idform, idModule) => {
  let module = [];
  formation = await Formations.findById({ _id: idform });
  for (k of formation.Module) {
    module.push(k.toString().split(" ")[0]);
  }
  var x = module.indexOf(idModule);
  if (x !== -1) {
    module.splice(x, 1);
  }
  formation = await formation.updateOne({
    Module: module,
  });
};
exports.Supprimer_Module = async (req, res) => {
  let chap = [];
  let lecon = [];
  suppModuleFromTabformation(req.params.idform, req.params.userId);
  mod = await Modules.findById({ _id: req.params.userId });
  console.log(mod);
  for (z of mod.chapitres) {
    chap.push(z.toString().split(" ")[0]);
    chapi = await Chapitres.findById({ _id: z });
    for (v of chapi.lecon) {
      lecon.push(v.toString().split(" ")[0]);
    }
  }

  for (idchap of chap) {
    const anc = await Chapitres.findByIdAndDelete({ _id: idchap });
  }
  for (idlec of lecon) {
    const ancl = await Lecon.findByIdAndDelete({ _id: idlec });
  }
  const module = await Modules.findByIdAndDelete(req.params.userId);
  console.log(module, "Deleted");
  res.status(200).json({
    success: "True",
    data: module,
  });
};

//Afficher_Modules

exports.Afficher_Modules = async (req, res) => {
  const module = await Modules.find()
    .populate("formateur")

    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
//Afficher Module paid

exports.Afficher_Module = async (req, res) => {
  const module = await Modules.findById({ _id: req.params.userId })
    .populate("formateur")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//GetNombreModulesAssocierAuFormateur
exports.GetNombreModulesAssocierAuFormateur = async (req, res) => {
  let form = [];
  let j = 0;
  const formateurs = await Modules.find({ formateur: req.params.userId })
    .then((result) => {
      for (k of result) {
        j = j + 1;
      }

      res.status(200).json(j);
    })

    .catch((err) => {
      console.log(err);
    });
};

//Nombres_Deschap_DeChaqueFormateur
exports.Nombres_chap_DeChaqueFormateur = async (req, res) => {
  let form = [];
  let j = 0;
  const formateurs = await Modules.find({ formateur: req.params.userId })
    .then((result) => {
      for (k of result) {
        for (i of k.chapitres) {
          j = j + 1;
        }
      }
      res.status(200).json(j);
    })

    .catch((err) => {
      console.log(err);
    });
};

//Nombres_Desleçon_DeChaqueFormateur
exports.Nombres_Deslecon_DeChaqueFormateur = async (req, res) => {
  let form = [];
  let j = 0;
  const formateurs = await Modules.find({ formateur: req.params.userId })
    .populate("chapitres")
    .then((result) => {
      for (k of result) {
        for (i of k.chapitres) {
          for (b of i.lecon) {
            j = j + 1;
          }
        }
      }

      res.status(200).json(j);
    })

    .catch((err) => {
      console.log(err);
    });
};
//Get_Les_Module_ByFormateurs
exports.Get_Les_Module_ByFormateurs = async (req, res) => {
  const module = await Modules.find({ formateur: req.params.userId })
    .populate("formateur")

    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
