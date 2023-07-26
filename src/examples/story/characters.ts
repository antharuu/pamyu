import { Character } from "../../index";

export const Lucy = new Character("Lucy", {
  color: "#BE3B72",
});

export const Baal = new Character("Baal", { color: "#971f51", isDemon: true });

export const Rose = new Character("Rose", {
  color: "#F97B5C",
  expressions: "*",
});

export const Marian = new Character("Marian", {
  color: "#CADDFF",
});

export const Siegfried = new Character("Siegfried", {
  color: "#F3ECF3",
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
