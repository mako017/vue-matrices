interface SymbolRow {
	a: string;
	b: string;
	c: string;
}

interface sumRows {
	firstRow: string;
	secondRow: string;
	thirdRow: string;
}

interface Rules {
	add: number[];
	sub: number[];
	eka: number[];
	sm: number[];
	rot: number[];
	voll: number[];
}

class rCon {
	private readonly SYMBOLS = 5;
	private readonly SEPERATOR = ",";
	private _fullCode: string;
	private _codeArray: Array<string>;
	private _units: Array<Array<string>>;
	private _rules: Rules = {
		add: [],
		sub: [],
		eka: [],
		sm: [],
		rot: [],
		voll: [],
	};

	constructor(code: string) {
		this._fullCode = code;
		this._codeArray = code.split(this.SEPERATOR);
		this._units = this._codeArray.map(item => {
			return [item.slice(0, 4), item.slice(4, 8), item.slice(8, 12), item.slice(12, 16), item.slice(16, 20)];
		});
	}

	public get rules(): Rules {
		return this._rules;
	}

	public testAllRules(): void {
		this.isSymbolAdd();
		this.isSymbolSub();
		this.isSymbolEKA();
		this.isSymbolSM();
		this.isSymbolRot();
		this.isVoll();
	}

	public testDuplicate(code: string, codes: string[]): boolean {
		return codes.includes(code);
	}

	public get isSolvable(): boolean {
		const cleanUnits = this.zeroSolvedRules().join("");
		let ruleCount = 0;
		for (const key in this._rules) {
			if (Object.prototype.hasOwnProperty.call(this._rules, key)) {
				ruleCount += this._rules[key].length;
			}
		}
		if (+cleanUnits === 0 && ruleCount > 0) {
			return true;
		}
		return false;
	}

	private singleSymbolRow(symbol: number, row: number): SymbolRow {
		return {
			a: this._units[row * 3 + 0][symbol],
			b: this._units[row * 3 + 1][symbol],
			c: this._units[row * 3 + 2][symbol],
		};
	}

	private isGroupAdd({ a, b, c }): boolean {
		if (a === "0000" && b === "0000" && c === "0000") return false;
		const mat = [
			[0, 1],
			[1, 1],
		];
		let res = "";
		for (let i = 0; i < a.length; i++) {
			res += mat[+a[i]][+b[i]];
		}
		return res === c;
	}
	private isSymbolAdd(): void {
		for (let symbol = 0; symbol < this.SYMBOLS; symbol++) {
			let found = 0;
			for (let row = 0; row < 3; row++) {
				if (!this.isGroupAdd(this.singleSymbolRow(symbol, row))) {
					break;
				} else {
					found++;
				}
			}
			if (found === 3) {
				this._rules.add.push(symbol);
			}
		}
	}

	private isGroupSub({ a, b, c }): boolean {
		if (a === "0000" && b === "0000" && c === "0000") return false;
		const mat = [
			[0, 0],
			[1, 0],
		];
		let res = "";
		for (let i = 0; i < a.length; i++) {
			res += mat[+a[i]][+b[i]];
		}
		return res === c;
	}
	private isSymbolSub(): void {
		for (let symbol = 0; symbol < this.SYMBOLS; symbol++) {
			let found = 0;
			for (let row = 0; row < 3; row++) {
				if (!this.isGroupSub(this.singleSymbolRow(symbol, row))) {
					break;
				} else {
					found++;
				}
			}
			if (found === 3) {
				this._rules.sub.push(symbol);
			}
		}
	}

	private isGroupEKA({ a, b, c }): boolean {
		if (a === "0000" && b === "0000" && c === "0000") return false;
		const mat = [
			[0, 1],
			[1, 0],
		];
		let res = "";
		for (let i = 0; i < a.length; i++) {
			res += mat[+a[i]][+b[i]];
		}
		return res === c;
	}
	private isSymbolEKA(): void {
		for (let symbol = 0; symbol < this.SYMBOLS; symbol++) {
			let found = 0;
			for (let row = 0; row < 3; row++) {
				if (!this.isGroupEKA(this.singleSymbolRow(symbol, row))) {
					break;
				} else {
					found++;
				}
			}
			if (found === 3) {
				if (this._rules.add.indexOf(symbol) === -1 && this._rules.sub.indexOf(symbol) === -1) {
					this._rules.eka.push(symbol);
				}
			}
		}
	}

	private isGroupSM({ a, b, c }): boolean {
		if (a === "0000" && b === "0000" && c === "0000") return false;
		const mat = [
			[0, 0],
			[0, 1],
		];
		let res = "";
		for (let i = 0; i < a.length; i++) {
			res += mat[+a[i]][+b[i]];
		}
		return res === c;
	}
	private isSymbolSM(): void {
		for (let symbol = 0; symbol < this.SYMBOLS; symbol++) {
			let found = 0;
			for (let row = 0; row < 3; row++) {
				if (!this.isGroupSM(this.singleSymbolRow(symbol, row))) {
					break;
				} else {
					found++;
				}
			}
			if (found === 3) {
				if (this._rules.add.indexOf(symbol) === -1 && this._rules.sub.indexOf(symbol) === -1) {
					this._rules.sm.push(symbol);
				}
			}
		}
	}

	private isGroupRot({ a, b, c }) {
		function rotateRight(code: string): string {
			return code.slice(1) + code.slice(0, 1);
		}
		function rotateLeft(code: string): string {
			return code.slice(3) + code.slice(0, 3);
		}
		function rotateHalf(code: string): string {
			return code.slice(2, 4) + code.slice(0, 2);
		}
		const rotatesRight = rotateRight(a) === b && rotateRight(b) === c;
		const rotatesLeft = rotateLeft(a) === b && rotateLeft(b) === c;
		const rotatesHalf = rotateHalf(a) === b && rotateHalf(b) === c;
		if (a === "0000" && b === "0000" && c === "0000") return false;
		if (rotatesRight || rotatesLeft || rotatesHalf) return true;
		return false;
	}
	private isSymbolRot() {
		for (let symbol = 0; symbol < this.SYMBOLS; symbol++) {
			let found = 0;
			for (let row = 0; row < 3; row++) {
				if (!this.isGroupRot(this.singleSymbolRow(symbol, row))) {
					break;
				} else {
					found++;
				}
			}
			if (found === 3) {
				this._rules.rot.push(symbol);
			}
		}
	}

	private zeroSolvedRules() {
		const units = [...this._units];
		for (const key in this._rules) {
			if (Object.prototype.hasOwnProperty.call(this._rules, key)) {
				const rule = this._rules[key] as number[];
				rule.forEach(symbol => {
					units.forEach(row => {
						row[symbol] = "0000";
					});
				});
			}
		}
		return units;
	}
	private addStrings(string1: string, string2: string) {
		const string2Arr = string2.split("");
		return string1
			.split("")
			.map((char, pos) => {
				return (+char + +string2Arr[pos]).toString();
			})
			.join("");
	}
	private rowSums(units: string[][]): sumRows {
		const stringRows = units.map(row => row.join(""));
		let firstRow = this.addStrings(stringRows[0], stringRows[1]);
		firstRow = this.addStrings(firstRow, stringRows[2]);
		let secondRow = this.addStrings(stringRows[3], stringRows[4]);
		secondRow = this.addStrings(secondRow, stringRows[5]);
		let thirdRow = this.addStrings(stringRows[6], stringRows[7]);
		thirdRow = this.addStrings(thirdRow, stringRows[8]);
		return {
			firstRow,
			secondRow,
			thirdRow,
		};
	}
	private isVoll() {
		const cleanUnits = this.zeroSolvedRules();
		const rSums = this.rowSums(cleanUnits);
		if (rSums.firstRow === rSums.secondRow && rSums.firstRow === rSums.thirdRow && rSums.firstRow !== "00000000000000000000") {
			this._rules.voll.push(9);
		}
	}
}
