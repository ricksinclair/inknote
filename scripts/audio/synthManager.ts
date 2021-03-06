﻿module Inknote.Audio {

    export class SynthManager {

        private static _instance: SynthManager;

        static get Instance() {
            if (!SynthManager._instance) {
                SynthManager._instance = new SynthManager();
            }
            return SynthManager._instance;
        }

        private synths: Synth[] = [];

        addSynth(synth: Synth) {
            this.synths.push(synth);
        }

        getSynths(): Synth[] {
            return this.synths;
        }

        deleteSynth(id: string, name: string, callback: () => void) {
            var self = this;

            check("are you sure you want to delete this synth?", function () {
                var relevantSynth = self.getSynth(id, name);

                if (!relevantSynth) {
                    return;
                }

                var newSynthList: Synth[] = [];

                newSynthList = Inknote.getItemsWhere(self.synths, function (item: Synth) {
                    return item != relevantSynth;
                });

                self.synths = newSynthList;

                callback();
            });
        }

        private getSynthFromID(id: string): Synth {
            return <Synth>getItemFromID(this.synths, id);
        }

        private getSynthFromName(name: string): Synth {
            for (var i = 0; i < this.synths.length; i++) {
                if (this.synths[i].name == name) {
                    return this.synths[i];
                }
            }
            return null;
        }

        getSynth(id: string, name: string): Synth {
            // gets by id
            var result = this.getSynthFromID(id);

            // otherwise gets from name
            if (!result) {
                result = this.getSynthFromName(name);
            }

            // else creates a new synth with this name
            if (!result) {
                var synth = new Synth(name);
                this.addSynth(synth);

                return synth;
            }

            return result;
        }

        constructor() {
            this.synths = Storage.getSynths();

            if (this.synths.length == 0) {
                var newSynth = new Synth("Standard synth");
                newSynth.oscillatorType = SoundType.sine;
                newSynth.gain = 1;

                this.synths.push(newSynth);
            }
        }

    }

}