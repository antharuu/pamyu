import { Scene } from "../../core/Scene";
import { Baal, Lucy, Marian } from "../characters";
import E from "../expressions";

const scene = new Scene("1_arrive_port", 1, 1);

scene
  .save()
  .setAchievement("CH1_DAWN_LUCY")
  .changeBackground("Port")
  .think(Lucy, "port_sradiff")
  .think(Lucy, "ville_brouillard")
  .think(Lucy, "odeur_salete")
  .think(Lucy, "ambiance_lugubre")
  .join(Lucy, 1)
  .talk(Lucy, "incertitude_navire", E.Embarrassed)
  .join(Marian, 5)
  .talk(Marian, "confiance_port_ami", E.Happy)
  .talk(Lucy, "confiance_ami")
  .think(Baal, "confiance_maître")
  .choice(Lucy, "doutes", [
    {
      message: "lugubre",
      exec: async () =>
        scene
          .talk(Lucy, "sinistre")
          .talk(Marian, "rassurance_securite")
          .talk(Marian, "defense_confiance")
          .talk(Lucy, "doute_presence_aube")
          .talk(Marian, "reconfort_baal")
          .talk(Marian, "confiance_en_soi")
          .talk(Lucy, "renforcement_foi_en_soi"),
    },
    {
      message: "confiance",
      exec: async () => scene.talk(Lucy, "confiance_en_maître"),
    },
  ])
  .talk(Marian, "retrouver_taverne")
  .choice(Lucy, "prochaine_etape", [
    {
      message: "rejoindre_taverne",
      exec: async () =>
        scene
          .variable("increment", "stat:courage")
          .talk(Lucy, "suivre")
          .talk(Marian, "discretion_sur_place")
          .goto("1_taverne"),
    },
    {
      message: "explorer_ville",
      exec: async () =>
        scene
          .talk(Lucy, "familiarisation_ville")
          .talk(Marian, "conseils_sécurite")
          .talk(Lucy, "separation_temporaire")
          .goto("1_decouverte_ville"),
    },
  ]);

export default scene;
