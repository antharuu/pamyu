import {Scene} from "../../core/Scene";

const scene = new Scene("1_arrive_port");

scene
    .save()
    .setAchievement("CH1_DAWN_LUCY")
    .changeBackground("Port")
    .msg("Lucy", "ch1_sc1_port_sradiff")
    .msg("Lucy", "ch1_sc1_ville_brouillard")
    .msg("Lucy", "ch1_sc1_odeur_salete")
    .msg("Lucy", "ch1_sc1_ambiance_lugubre")
    .join("Lucy", 1)
    .msg("Lucy", "ch1_sc1_incertitude_navire")
    .join("Marian", 5)
    .msg("Marian", "ch1_sc1_confiance_port_ami")
    .msg("Lucy", "ch1_sc1_confiance_ami")
    .msg("Baal", "ch1_sc1_confiance_maître")
    .choice("ch1_sc1_doutes", [
        {
            message: "ch1_sc1_lugubre",
            exec: async () => await scene
                .msg("Lucy", "ch1_sc1_sinistre")
                .msg("Marian", "ch1_sc1_rassurance_securite")
                .msg("Marian", "ch1_sc1_defense_confiance")
                .msg("Lucy", "ch1_sc1_doute_presence_aube")
                .msg("Marian", "ch1_sc1_reconfort_baal")
                .msg("Marian", "ch1_sc1_confiance_en_soi")
                .msg("Lucy", "ch1_sc1_renforcement_foi_en_soi")
        },
        {
            message: "ch1_sc1_confiance",
            exec: async () => await scene
                .msg("Lucy", "ch1_sc1_confiance_en_maître")
        }
    ])
    .msg("Marian", "ch1_sc1_retrouver_taverne")
    .choice("ch1_sc1_prochaine_etape", [
        {
            message: "ch1_sc1_rejoindre_taverne",
            exec: async () => await scene
                .variable('increment', "stat:courage")
                .msg("Lucy", "ch1_sc1_suivre")
                .msg("Marian", "ch1_sc1_discretion_sur_place")
                .goto("1_taverne")
        },
        {
            message: "ch1_sc1_explorer_ville",
            exec: async () => await scene
                .msg("Lucy", "ch1_sc1_familiarisation_ville")
                .msg("Marian", "ch1_sc1_conseils_sécurite")
                .msg("Lucy", "ch1_sc1_separation_temporaire")
                .goto("1_decouverte_ville")
        }
    ]);

export default scene;