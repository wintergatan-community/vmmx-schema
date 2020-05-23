import { Song } from "./schema";

const example: Song = {
	metadata: {
		author: "test",
		title: "test",
	},
	program: {
		metadata: {
			author: "",
			title: "",
			tpq: 240,
			length: 1234,
			version: "v1.0.0",
		},
		beats: [
			{
				kind: "vibraphone",
				tick: 0,
				note: "G4",
				velocity: 1,
			},
			{
				kind: "vibraphone",
				tick: 5,
				note: "C4",
				velocity: 1,
			},
		],
	},
	initialState: {
		mute: {
			bass: true,
		},
		capos: {
			[1]: 0,
		},
		flywheel: {
			connected: false,
			tempo: 1,
		},
		hihat: {
			closed: false,
		},
		hihatMachine: {
			setting: "",
		},
		vibraphone: {
			vibrato: true,
			vibratoSpeed: 1,
		},
	},
	events: [
		{
			kind: "vibraphone",
			state: { vibrato: true, vibratoSpeed: 10000 },
			time: 12,
		},
	],
};
