import {Scene} from "../../core/Scene";

const scene = new Scene("1_arrive_port", 1, 1);

scene
    .save()
    .setAchievement("CH1_DAWN_LUCY")
    .changeBackground("Port")
    .msg("Lucy", "port_sradiff")
    .msg("Lucy", "ville_brouillard")
    .msg("Lucy", "odeur_salete")
    .msg("Lucy", "ambiance_lugubre")
    .join("Lucy", 1)
    .msg("Lucy", "incertitude_navire")
    .join("Marian", 5)
    .msg("Marian", "confiance_port_ami")
    .msg("Lucy", "confiance_ami")
    .msg("Baal", "confiance_maître")
    .choice("doutes", [
        {
            message: "lugubre",
            exec: async () => await scene
                .msg("Lucy", "sinistre")
                .msg("Marian", "rassurance_securite")
                .msg("Marian", "defense_confiance")
                .msg("Lucy", "doute_presence_aube")
                .msg("Marian", "reconfort_baal")
                .msg("Marian", "confiance_en_soi")
                .msg("Lucy", "renforcement_foi_en_soi")
        },
        {
            message: "confiance",
            exec: async () => await scene
                .msg("Lucy", "confiance_en_maître")
        }
    ])
    .msg("Marian", "retrouver_taverne")
    .choice("prochaine_etape", [
        {
            message: "rejoindre_taverne",
            exec: async () => await scene
                .variable('increment', "stat:courage")
                .msg("Lucy", "suivre")
                .msg("Marian", "discretion_sur_place")
                .goto("1_taverne")
        },
        {
            message: "explorer_ville",
            exec: async () => await scene
                .msg("Lucy", "familiarisation_ville")
                .msg("Marian", "conseils_sécurite")
                .msg("Lucy", "separation_temporaire")
                .goto("1_decouverte_ville")
        }
    ]);

export default scene;