import { Note } from "./note_names";

/** Programs save DropEvents only (Programming Wheel + bass notes) */
export interface Program {
	metadata: ProgramMetadata;
	state: MachineState;
	events: DropEvent[];
}

/** The type of events allowed in a Performance */
type PerformanceEvents = DropEvent | ChangeEvent | InstructionEvent;

/**
 * Once a recording is done, copy the Program, bundle with
 * ChangeEvents and InstructionEvent and export it.
 * Program cannot be programmed (DropEvents) inside a Performance.
 * Stripping a Performance converts it back to a program
 */
export interface Performance {
	program: Program;
	metadata: PerformanceMetadata;
	events: PerformanceEvents[];
}

type Instrument = "vibraphone" | "drums" | "bass";

/** Metadata for performance unique from program */
interface PerformanceMetadata {
	title: string;
	author: string;
	/** Total runtime of the performance in time units (s, ms) */
	length: number;
}

interface ProgramMetadata {
	title: string;
	author: string;
	/** Ticks per quarter */
	tpq: 240;
	/** Version of VMMX in which the current program was made */
	version: string;
	/** Total ticks on the "programming wheel" = 240*4*64 = tpq*4*bars on wheel */
	length: 61440;
	procrastination?: number;
}

enum VibratoSpeed {
	/** Vibrato is disconnected from shaft. */
	Off = 0,
	/** Vibrato is connected at speed of 1 to shaft. */
	SingleSpeed = 1,
	/** Vibrato is connected at double speed of shaft. */
	DoubleSpeed = 2,
}

interface MachineState {
	bpm: number;
	instruments: {
		drums: {
			hihatMachine: {
				setting: string;
			};
			hihat: { muted: boolean };
			snare: { muted: boolean };
			kick: { muted: boolean };
			cymbal: { muted: boolean };
		};
		vibraphone: {
			/** Cannot change via Events */
			notes: Note[];
			vibrato: boolean;
			/**
			 * Implemented on the MMX like so: https://youtu.be/cGeTp-3KUr4?t=389
			 * MVP vMMX delivery intends to implement as a simple float for now, however
			 * it could be enhanced to calculate a relative rpm to more accurately
			 * represent the MMX's mechanics
			 */
			vibratoSpeed: VibratoSpeed;

			muted: boolean;
		};
		bass: {
			/** Bass indexing 1-4 */
			strings: {
				[string: number]: {
					/** Cannot change via Events */
					tuning: Note;
					/** Cannot change via Events */
					capoFret: number;
				};
			};
			muted: boolean;
		};
	};
}
/** MachineState except all optional */
type MachineChange = object;

interface Channel {
	/** Name of instrument eg vibraphone, drums, bass */
	instrument: Instrument;
	/**
		Channel number relative to start of instrument
		Vibraphone has 11, Drums has ?, Bass has 4
		Note that the physical marble machine uses double
		channels where we do not need them.
	*/
	localChannel: number;
}

// Event: A precisely timed event that corresponds to the dropping
// of ONE marble from channels or machine state change

interface DropEvent {
	kind: "drop";
	channel: Channel;
	note?: Note; // For bass only
	tick?: number;
}

interface ChangeEvent {
	kind: "change";
	/** Object representing values to overwrite on the current MachineState */
	machineChange: MachineChange;
	/** Actual time since performance start (s, ms) */
	time?: number;
}

interface InstructionEvent {
	kind: "instruction";
	instructions: string;
	/** Actual time since performance start (s, ms) */
	time?: number;
}
