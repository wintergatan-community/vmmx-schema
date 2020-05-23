import { Performance } from "./schema";

const example: Performance = {
	metadata: {
		author: "test",
		title: "test",
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
			mute: {
				bass: true,
			},
			capos: {
				[1]: 0,
			},
			flywheel: {
				connected: false,
				bpm: 120,
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
			},
		},
		dropEvents: [
			{
				kind: "vibraphone",
				tick: 0,
				note: "G4",
			},
			{
				kind: "vibraphone",
				tick: 5,
				note: "C4",
			},
			{
				kind: "drum",
				tick: 10,
				drum: "snare",
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
			bpm: 120,
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
		},
	},
	events: [
		{
			kind: "vibraphone_vibrato_enabled",
			vibratoEnabled: false,
			time: 12,
		},
		{
			kind: "vibraphone_vibrato_enabled",
			vibratoEnabled: false,
			time: 12,
		},
		{
			kind: "vibraphone_vibrato_enabled",
			vibratoEnabled: false,
			time: 12,
		},
	],
};
