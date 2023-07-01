import { Character } from "../core/Character";
import Expression from "./expressions";

const E = Expression;

export const Lucy = new Character("Lucy", {
  color: "#BE3B72",
  expressions: [
    E.Confused,
    E.Determined,
    E.Embarrassed,
    E.Happy,
    E.Normal,
    E.Regret,
    E.Sad,
    E.Shy,
    E.Surprised,
    E.Worried,
  ],
});

export const Baal = new Character("Baal", { color: "#971f51", isDemon: true });

export const Rose = new Character("Rose", {
  color: "#F97B5C",
  expressions: [
    E.Angry,
    E.Confused,
    E.Determined,
    E.Embarrassed,
    E.Happy,
    E.Normal,
    E.Regret,
    E.Sad,
    E.Shy,
    E.Surprised,
    E.Worried,
  ],
});

export const Marian = new Character("Marian", {
  color: "#CADDFF",
  expressions: [
    E.Angry,
    E.Confused,
    E.Determined,
    E.Happy,
    E.Normal,
    E.Regret,
    E.Surprised,
    E.Worried,
  ],
});

export const Siegfried = new Character("Siegfried", {
  color: "#F3ECF3",
  expressions: [
    E.Angry,
    E.Confused,
    E.Determined,
    E.Happy,
    E.Normal,
    E.Regret,
    E.Surprised,
    E.Worried,
  ],
});

export const Stolas = new Character("Stolas", {
  color: "#F3ECF3",
  isDemon: true,
});

export default {
  Lucy,
  Baal,
  Rose,
  Marian,
  Siegfried,
  Stolas,
};
