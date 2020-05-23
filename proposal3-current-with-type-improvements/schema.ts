import { Note } from "../note_names";

type BassString = 1 | 2 | 3 | 4;

type DrumType = "bass" | "hihat" | "snare";
type Channels = DrumType | "vibraphone" | "bass";

// #region program

interface BassDropEvent {
	kind: "bass";
	note: Note;
	velocity: number;
}

interface DrumDropEvent {
	kind: "drum";
	drum: DrumType;
}

interface VibraphoneDropEvent {
	kind: "vibraphone";
	note: Note;
	velocity: number;
}

interface CoreDropEvent {
	tick: number;
}

type DropEvent = BassDropEvent | DrumDropEvent | VibraphoneDropEvent;
type TimedDropEvent = CoreDropEvent & DropEvent;

/** Metadata for program */
interface ProgramMetadata {
	title: string;
	author: string;
	/** Ticks per quarter */
	tpq: 240;
	/** Version of VMMX in which the current program was made */
	version: string;
	/** Total ticks on the "programming wheel" 240*4*bars on wheel */
	length: 1234;
	procrastination?: number;
}

interface Program {
	metadata: ProgramMetadata;
	beats: TimedDropEvent[];
}

// #endregion

// #region state

interface FlywheelState {
	connected: boolean;
	tempo: number;
}

interface VibraphoneState {
	vibrato: boolean;
	vibratoSpeed: number;
}

interface HihatMachineState {
	setting: string;
}

interface HihatState {
	closed: boolean;
}

interface State {
	mute: { [C in Channels]?: boolean };
	capos: { [S in BassString]?: number };
	vibraphone: VibraphoneState;
	hihatMachine: HihatMachineState;
	hihat: HihatState;
	flywheel: FlywheelState;
}

// #endregion

// #region events

interface PlayBeatEvent {
	kind: "play_beat";
	beat: DropEvent;
}

interface MuteEvent {
	kind: "mute";
	channel: number;
	muted: boolean;
}

interface CapoEvent {
	kind: "capo";
	capo: number;
	position: number;
}

interface TempoEvent {
	kind: "flywheel_tempo";
	tempo: number;
}

interface ConnectedEvent {
	kind: "flywheel_connected";
	connected: boolean;
}

interface FlywheelEvent {
	kind: "flywheel";
	state: FlywheelState;
}

interface HihatMachineEvent {
	kind: "hihat_machine";
	state: HihatMachineState;
}

interface HihatEvent {
	kind: "hihat";
	state: HihatState;
}

interface VibraphoneEvent {
	kind: "vibraphone";
	state: VibraphoneState;
}

interface BaseEvent {
	time: number;
}

type Event = BaseEvent &
	(
		| PlayBeatEvent
		| MuteEvent
		| CapoEvent
		| TempoEvent
		| ConnectedEvent
		| FlywheelEvent
		| HihatMachineEvent
		| HihatEvent
		| VibraphoneEvent
	);

//#endregion

// #region song

/** Metadata for song */
interface SongMetadata {
	title: string;
	author: string;
}

export interface Song {
	metadata: SongMetadata;
	program: Program;
	initialState: State;
	events: Event[];
}

// #endregion
