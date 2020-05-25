/** Main schema definition
 *
 * CONTENTS:
 * Program
 * ProgramMetadata
 * State
 * DropEvent (and subtypes / -interfaces)
 * -------
 * Performance
 * PerformanceMetadata
 * Events
 * -------
 * Ordrered by Machine, Vibraphone, Bass,
 * HiHat machine, HiHat:
 * - sub-States
 * - sub-Events
 */
import { Note } from "./note_names";

export type DrumType = "bassdrum" | "hihat" | "snare";
export type Channel = DrumType | "vibraphone" | "bass";

/** Programs save TimedDropEvent only (Programming Wheel + bass notes) */
export interface Program {
	metadata: ProgramMetadata;
	/**
	 * This is the "working" state of the machine, outside of a performance.
	 * When a user is modifying the program, this is how we store what settings they use.
	 * Whenever the user saves, this field gets updated, and whether they load, this gets read.
	 * It has almost no relevence when editing a performance since the performance events will
	 * cause it to be updated dynamically.
	 *
	 * ## Example
	 * ```typescript
	 * let prog: Program;
	 * // invert the muted state of the snare
	 * prog.state.mute.snare =!prog.state.mutue.snare;
	 * ```
	 */
	state: State;
	dropEvents: TickedDropEvent[];
}
// prog.state.mute.snare = !prog.state.mute.snare; // Somebody pulls / pushes the snare-mute lever
/** Metadata for program */
export interface ProgramMetadata {
	title: string;
	author: string;
	/** Ticks per quarter */
	readonly tpq: 240;
	/** Version of VMMX in which the current program was made */
	readonly version: string;
	/** Total ticks on the "programming wheel" 240*4*bars on wheel */
	readonly length: 61440;
	procrastination?: number;
}

/** The machine's state */
export interface State {
	machine: MachineState;
	vibraphone: VibraphoneState;
	bass: BassState;
	hihatMachine: HihatMachineState;
	hihat: HihatState;
}

/** A dropping of a marble (no delay) */
export type DropEvent = BassDropEvent | DrumDropEvent | VibraphoneDropEvent;
export type TickedDropEvent = CoreDropEvent & DropEvent;
export interface CoreDropEvent {
	tick: number;
}
export interface BassDropEvent {
	kind: "bass";
	string: BassString;
	fret: number;
}
export interface DrumDropEvent {
	kind: "drum";
	drum: DrumType;
}
export interface VibraphoneDropEvent {
	kind: "vibraphone";
	channel: VibraphoneChannel;
}

// -----------------------------

export interface Performance {
	metadata: PerformanceMetadata;
	program: Program;
	/** Not the working state. Use Program.state for that.
	 * initialState should be copied into Program.state at time 0
	 * of a Performance playback
	 */
	readonly initialState: State;
	events: TimedEvent[];
}
/** Metadata for performance */
export interface PerformanceMetadata {
	title: string;
	author: string;
}

/** An untimed event that changes the state of one channel
 * (or drops a marble)
 *
 * Event only change one thing. Multiple simultanious changes must
 * be multiple events with the same time.
 */
export type Event =
	| DropEvent // Performances only store manual drops
	| MachineEvent
	| VibraphoneEvent
	| HihatMachineEvent
	| HihatEvent
	| BassEvent;

export type TimedEvent = BaseTimedEvent & Event;
export interface BaseTimedEvent {
	time: number;
}

// -----------------------------

// MACHINE
export interface MachineState {
	mute: { [C in Channel]?: boolean };
	bpm: number;
	flywheelConnected: boolean;
}

export type MachineEvent = MachineMuteEvent;
export interface MachineMuteEvent {
	kind: "machine_mute";
	channel: Channel;
	muted: boolean;
}
export interface MachineTempoEvent {
	kind: "machine_tempo";
	bpm: number;
}
export interface FlywheelConnectedEvent {
	kind: "machine_flywheelConnected";
	connected: boolean;
}

// VIBRAPHONE
export type VibraphoneChannel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface VibraphoneState {
	vibratoEnabled: boolean;
	vibratoSpeed: number;
	/** Cannot be changed via event */
	notes: { [VC in VibraphoneChannel]: Note };
}

export type VibraphoneEvent =
	| VibraphoneVibratoEnabledEvent
	| VibraphoneVibratoSpeedEvent;
export interface VibraphoneVibratoEnabledEvent {
	kind: "vibraphone_vibrato_enabled";
	vibratoEnabled: boolean;
}
export interface VibraphoneVibratoSpeedEvent {
	kind: "vibraphone_vibrato_speed";
	vibratoSpeed: number;
}

// BASS
export type BassString = 1 | 2 | 3 | 4;

export interface BassState {
	capos: { [S in BassString]?: number };
	tuning: { [S in BassString]?: Note };
}

export type BassEvent = BassCapoEvent;
export interface BassCapoEvent {
	kind: "bass_capo";
	capoString: BassString;
	fret: number;
}

// HIHAT MACHINE
export interface HihatMachineState {
	setting: string;
}

export type HihatMachineEvent = HihatMachineSettingEvent;
export interface HihatMachineSettingEvent {
	kind: "hihatmachine_setting";
	state: HihatMachineState;
}

// HIHAT
export interface HihatState {
	closed: boolean;
}

export type HihatEvent = HihatClosedEvent;
export interface HihatClosedEvent {
	kind: "hihat_closed";
	closed: boolean;
}
