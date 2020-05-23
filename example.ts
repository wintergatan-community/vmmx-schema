import { Performance } from "./schema";

const example: Performance = {
	metadata: {
		author: "person",
		title: "Example Title",
	},
	program: {
		metadata: {
			author: "",
			title: "",
			tpq: 240,
			length: 61440,
			version: "v1.0.0",
		},
		state: {
			machine: {
				mute: {
					bass: true,
				},
				bpm: 120,
				flywheelConnected: false,
			},
			bass: {
				capos: {
					1: 0,
				},
				tuning: {
					1: "E1",
					2: "A1",
					3: "D2",
					4: "G2",
				},
			},
			hihat: {
				closed: false,
			},
			hihatMachine: {
				setting: "",
			},
			vibraphone: {
				vibratoSpeed: 1,
				vibratoEnabled: true,
				notes: {
					1: "A4",
					2: "B4",
					3: "C4",
					4: "D4",
					5: "E4",
					6: "F4",
					7: "G4",
					8: "A5",
					9: "B5",
					10: "C5",
					11: "D5",
				},
			},
		},
		dropEvents: [
			{
				kind: "vibraphone",
				tick: 0,
				channel: 1,
			},
			{
				kind: "vibraphone",
				tick: 5,
				channel: 2,
			},
			{
				kind: "drum",
				tick: 10,
				drum: "snare",
			},
		],
	},
	initialState: {
		machine: {
			mute: {
				bass: true,
			},
			bpm: 120,
			flywheelConnected: false,
		},
		bass: {
			capos: {
				1: 0,
			},
			tuning: {
				1: "E1",
				2: "A1",
				3: "D2",
				4: "G2",
			},
		},
		hihat: {
			closed: false,
		},
		hihatMachine: {
			setting: "",
		},
		vibraphone: {
			vibratoSpeed: 1,
			vibratoEnabled: true,
			notes: {
				1: "A4",
				2: "B4",
				3: "C4",
				4: "D4",
				5: "E4",
				6: "F4",
				7: "G4",
				8: "A5",
				9: "B5",
				10: "C5",
				11: "D5",
			},
		},
	},
	events: [
		{
			kind: "vibraphone_vibrato_enabled",
			vibratoEnabled: false,
			time: 12,
		},
		{
			kind: "bass",
			fret: 3,
			string: 1,
			time: 15,
		},
		{
			kind: "vibraphone",
			channel: 2,
			time: 17,
		},
	],
};
