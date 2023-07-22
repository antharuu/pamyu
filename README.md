# Pamyu

## Introduction

**Pamyu** is a Visual Novel game engine/framework project. It is developed in Typescript.

## Installation

Coming soon. But probably `npm i pamyu`.

## Usage

I will provide only very brief usage examples here. The rest will be documented in the wiki once the project is much
more advanced, and I am certain that the features will no longer change.

### Main.ts

```typescript
Pamyu
    .configure({
        messageSpeed: 10, // Higher is slower
    })
    .create(
        "#app", // HTML Element selector
        "purple", // Base background color
        {
            background: "Global", // Base background image at game starting
        }
    )
    .prepare([ // Register all the assets,
        // it do nothing and dont require any specific class or type 
        // just use for the engine to know what to load if you want to use
        // some files to declare your assets like characters, expressions or others
        Characters,
        Expression
    ])
    .registerScenes([ // Register all the scenes you want to use, order is not important except for the first one
        Chapter1_ArrivePort
    ]);
```

### Characters

```typescript
import {Character} from "../core/Character";
import E from "./expressions";

export const Lisa = new Character("Lisa", {
    color: "#BE3B72", // Color of the name in the dialog box
    expressions: [ // Register all the expressions you want to use for this character
        // They need to be registered in the Expression enum
        E.Confused,
        E.Regret,
        E.Sad,
        E.Shy,
        E.Worried,
    ],
});

export const Jenny = new Character("Jenny", {
    color: "#BE3B72",
    expressions: [
        E.Confused,
        E.Determined,
        E.Normal,
        E.Regret,
        E.Sad,
    ],
});
```

### Expressions

```typescript
import Pamyu from "../core/Pamyu";

enum Expression {
    // List all the expressions you want to use for all your characters
    Angry = "angry",
    Confused = "confused",
    Determined = "determined",
    Embarrassed = "embarrassed",
    Happy = "happy",
    Normal = "normal",
    Regret = "regret",
    Sad = "sad",
    Shy = "shy",
    Surprised = "surprised",
    Worried = "worried",
}

Pamyu.assetManager
    // Set the pattern for the expressions files in the assets folder
    .setExpressionPatern("chars/{character}/{side}/{expression}.png")
    // Register the expressions
    .setExpressions(Expression);

export default Expression; // Export the enum for use in the other files
```

### Scenes

Chapter and scene number are used for the translation if you want to use it _(enabled by default and disabled is not
implemented yet)_ exemple in this case for a text with id "hello_world" the translation key will be
"ch5.sc1.hello_world"

```typescript
import {Scene} from "../../core/Scene";
import {Lisa, Jenny} from "../characters";
import E from "../expressions";

const scene = new Scene( // Create a new scene
    "5_just_a_test", // Scene name
    5, // chapter number
    1 // scene number
);

scene
    .save() // Save the game (not implemented yet)
    .setAchievement("CHAPTER_5") // Set a steam achievement (not implemented yet)
    .changeBackground("Forest") // Change the background
    .think(Lisa, "first_thought") // Show a message in a "think" mode
    .join(Lisa, 1) // Character enter the scene at the given position (1 to 5 is left to right, 3 is center) (not completly implemented yet)
    .talk(Lisa, "hello_jenny", E.Embarrassed) // Show a message in a "talk" mode with the given expression
    .join(Jenny, 5)
    .talk(Jenny, "hello_lisa", E.Happy)
    .talk(Lisa, "friendly", E.Happy)
    .choice(Jenny, "where_we_go", [ // Show a choice with the given character and message (not implemented yet)
        {
            message: "at_party",
            exec: async () => // You can put a scene or just import it from another file
                scene
                    .talk(Jenny, "go_party")
                    .talk(Lisa, "ok_party")
                    .goto("5_party") // Go to the scene with the given name (need to be registered) (not implemented yet)
        },
        {
            message: "at_cinema",
            exec: async () =>
                scene
                    .talk(Jenny, "go_cinema")
                    .talk(Lisa, "ok_cinema")
                    .goto("5_cinema")
        },
    ]);

export default scene; // Export the scene for use in the other files
```

## Contributing

To contribute to the project, simply fork the project and make a pull request on the `dev` branch.