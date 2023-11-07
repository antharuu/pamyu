import {describe, expect, test} from 'vitest';

import {FlatLabel, JumpAction, MenuAction, MessageAction, ReturnAction, ShowAction} from '../../src/types/scene';

import {ScanManager} from '../../src/classes/ScanManager';

const EXAMPLES: {
    script: string;
    labels: FlatLabel[];
}[] = [];

EXAMPLES.push({
    script: `# Étiquette de rassurance
label reassurance:
    m "Merci, ça me rassure."
    return

# Étiquette de discussion
label discussion:
    m "Il y a quelque chose que je veux te dire."
    show mary angry
    e "Qu'est-ce qui se passe ?"
    return
`,
    labels: [
        {
            name: 'reassurance',
            actions: [
                {
                    type: 'message',
                    message: 'Merci, ça me rassure.',
                    character: 'm'
                } as MessageAction,
                {
                    type: 'return'
                } as ReturnAction
            ]
        },
        {
            name: 'discussion',
            actions: [
                {
                    type: 'message',
                    message: 'Il y a quelque chose que je veux te dire.',
                    character: 'm'
                } as MessageAction,
                {
                    type: 'show',
                    image: 'mary angry',
                } as ShowAction,
                {
                    type: 'message',
                    message: 'Qu\'est-ce qui se passe ?',
                    character: 'e'
                } as MessageAction,
                {
                    type: 'return'
                } as ReturnAction
            ]
        }
    ]
});

EXAMPLES.push({
    script: `# Étiquette de discussion
label discussion:
    m "Il y a quelque chose que je veux te dire."
    show mary angry
    e "Qu'est-ce qui se passe ?"
    
    menu:
        "Choisissez une option :"

        "Rassurer Mary":
            e "Ne t'inquiète pas, tout va bien se passer."
            jump reassurance
            
        "Demander plus d'informations":
            e "Peux-tu m'en dire plus ?"
            jump more_info`,
    labels: [{
        name: 'discussion',
        actions: [
            {
                type: 'message',
                message: 'Il y a quelque chose que je veux te dire.',
                character: 'm'
            } as MessageAction,
            {
                type: 'show',
                image: 'mary angry',
            } as ShowAction,
            {
                type: 'message',
                message: 'Qu\'est-ce qui se passe ?',
                character: 'e'
            } as MessageAction,
            {
                type: 'menu',
                question: {
                    type: 'message',
                    message: 'Choisissez une option :',
                    character: null
                },
                options: [
                    {
                        label: 'Rassurer Mary',
                        actions: [
                            {
                                type: 'message',
                                message: 'Ne t\'inquiète pas, tout va bien se passer.',
                                character: 'e'
                            } as MessageAction,
                            {
                                type: 'jump',
                                sceneId: 'reassurance'
                            } as JumpAction
                        ]
                    },
                    {
                        label: 'Demander plus d\'informations',
                        actions: [
                            {
                                type: 'message',
                                message: 'Peux-tu m\'en dire plus ?',
                                character: 'e'
                            } as MessageAction,
                            {
                                type: 'jump',
                                sceneId: 'more_info'
                            }
                        ]
                    }
                ]
            } as MenuAction
        ]
    }]
});

describe('Need convert blocks into labels', () => {
    EXAMPLES.forEach(({script, labels}, index) => {
        test(`Exemple ${index + 1}`, () => {
            const labelsBlock = ScanManager.i.getLabels(script);
            labels.forEach((label, index) => {
                expect(labelsBlock[index]).toEqual(label);
            });
        });
    });
});