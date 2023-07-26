import { Scene } from "../../../index";

import { Baal, Lucy, Marian } from "../characters";

import LucyEmbarrassed from "../../assets/chars/Lucy/Gauche/Embarrassed.png";
import MarianHappy from "../../assets/chars/Marian/Droite/Happy.png";

const scene = new Scene("1_arrive_port", 1, 1);

scene
  .save()
  .setAchievement("CH1_DAWN_LUCY")
  .changeBackground("Port")
  .think(Lucy, "port_sradiff")
  .think(Lucy, "ville_brouillard")
  .think(Lucy, "odeur_salete")
  .think(Lucy, "ambiance_lugubre")
  .join(Lucy, "Gauche", LucyEmbarrassed)
  .talk(Lucy, "incertitude_navire")
  .join(Marian, "Droite", MarianHappy)
  .talk(Marian, "confiance_port_ami")
  .talk(Lucy, "confiance_ami")
  .think(Baal, "confiance_maître")
  .choice(Lucy, "doutes", [
    {
      message: "lugubre",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      exec: async () => scene.talk(Lucy, "confiance_en_maître"),
    },
  ])
  .talk(Marian, "retrouver_taverne")
  .choice(Lucy, "prochaine_etape", [
    {
      message: "rejoindre_taverne",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      exec: async () =>
        scene
          .variable("increment", "stat:courage")
          .talk(Lucy, "suivre")
          .talk(Marian, "discretion_sur_place")
          .goto("1_taverne"),
    },
    {
      message: "explorer_ville",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      exec: async () =>
        scene
          .talk(Lucy, "familiarisation_ville")
          .talk(Marian, "conseils_sécurite")
          .talk(Lucy, "separation_temporaire")
          .goto("1_decouverte_ville"),
    },
  ]);

export default scene;
