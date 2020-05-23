import { Program } from "./schema";

const exampleSong: Program = {
	metadata: {
		title: "My awesome song",
		author: "Martin",
		tpq: 240,
		version: "0.1.0", // Version of VMMX in which the current song was made
		length: 61440,
		procrastination: 100,
	},
	state: {
		bpm: 100,
		instruments: {
			drums: {
				hihatMachine: {
					setting: "WIP",
				},
				hihat: { muted: false },
				snare: { muted: false },
				kick: { muted: false },
				cymbal: { muted: false },
			},
			vibraphone: {
				notes: ["A_1", "B_1", "C_1", "D_1", "E_1", "B_1"], // Notes
				vibrato: false,
				vibratoSpeed: 1,
				muted: false,
			},
			bass: {
				strings: {
					0: { tuning: "E1", capoFret: 2 },
					1: { tuning: "A1", capoFret: 2 },
				},
				muted: false,
			},
		},
	},
	events: [
		{
			tick: 3,
			kind: "drop",
			channel: { instrument: "vibraphone", localChannel: 3 },
		},
		{
			tick: 5,
			kind: "drop",
			channel: { instrument: "vibraphone", localChannel: 3 },
		},
		{
			tick: 18,
			kind: "drop",
			channel: { instrument: "bass", localChannel: 2 },
		},
	],
};
