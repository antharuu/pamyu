import { Pamyu } from "../../index";
import MsgBox from "../assets/ui/msg-box.png";
import Next from "../assets/ui/next.png";
import Global from "../assets/backgrounds/Global.png";
import Auraly from "../assets/backgrounds/Auraly.png";
import ForetJour from "../assets/backgrounds/Foret jour.png";
import ForetNuit from "../assets/backgrounds/Foret nuit.png";
import Mer from "../assets/backgrounds/Mer.png";
import OrdreExt from "../assets/backgrounds/Ordre-ext.png";
import Port from "../assets/backgrounds/Port.png";
import Taverne from "../assets/backgrounds/Taverne.png";
import VillePortuaire from "../assets/backgrounds/Ville portuaire.png";
const UI = Pamyu.assetManager.registerUI({
    MsgBox,
    Next,
});
const Backgrounds = Pamyu.assetManager.registerBackgrounds({
    Global,
    Auraly,
    ForetJour,
    ForetNuit,
    Mer,
    OrdreExt,
    Port,
    Taverne,
    VillePortuaire,
});
export default {
    UI,
    Backgrounds,
};
//# sourceMappingURL=assets.js.map