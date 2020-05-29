class rCon {
  static getRows(item) {
    let subsets = [
      item.split(",").slice(0, 3),
      item.split(",").slice(3, 6),
      item.split(",").slice(6, 9),
    ];
    return subsets;
  } //returns three arrays
  static getElements(row) {
    let elements = [];
    for (let i = 0; i < 5; i++) {
      let element = {
        e1: row[0].slice(0 + i * 4, 4 + i * 4),
        e2: row[1].slice(0 + i * 4, 4 + i * 4),
        e3: row[2].slice(0 + i * 4, 4 + i * 4),
      };
      elements.push(element);
    }
    return elements;
  } //returns 5 elements per row
  //
  //test rule for all rows
  static fullTest(item) {
    let rows = this.getRows(item);
    let relements = [
      this.getElements(rows[0]),
      this.getElements(rows[1]),
      this.getElements(rows[2]),
    ];
    let rules = {
      add: [],
      sub: [],
      eka: [],
      sm: [],
      rot: [],
      voll: [],
    };
    rules.add = this.complete(this.isADD, relements);
    rules.sub = this.complete(this.isSUB, relements);
    rules.eka = this.complete(this.isEKA, relements);
    rules.sm = this.complete(this.isSM, relements);
    rules.rot = this.complete(this.isROT, relements);
    rules.voll = this.isVOLL(relements);
    return rules;
  }
  //single line rules
  static isADD(a, b, c) {
    if (a === "0000" && b === "0000" && c === "0000") return false;
    let mat = [
      [0, 1],
      [1, 1],
    ];
    let res = "";
    for (let i = 0; i < a.length; i++) {
      res += mat[+a[i]][+b[i]];
    }
    return res === c;
  }

  static isSUB(a, b, c) {
    if (a === "0000" && b === "0000" && c === "0000") return false;
    let mat = [
      [0, 0],
      [1, 0],
    ];
    let res = "";
    for (let i = 0; i < a.length; i++) {
      if (b[i] > a[i]) return false;
      res += mat[+a[i]][+b[i]];
    }
    return res === c;
  }

  static isEKA(a, b, c) {
    if (a === "0000" && b === "0000" && c === "0000") return false;
    let mat = [
      [0, 1],
      [1, 0],
    ];
    let res = "";
    for (let i = 0; i < a.length; i++) {
      res += mat[+a[i]][+b[i]];
    }

    return res === c;
  }

  static isSM(a, b, c) {
    if (a === "0000" && b === "0000" && c === "0000") return false;
    let mat = [
      [0, 0],
      [0, 1],
    ];
    let res = "";
    for (let i = 0; i < a.length; i++) {
      res += mat[+a[i]][+b[i]];
    }
    return res === c;
  }

  static isROT(a, b, c) {
    if (a === "0000" && b === "0000" && c === "0000") return false;
    if (a.slice(3) + a.slice(0, 3) == b && b.slice(3) + b.slice(0, 3) == c)
      return true;
    else if (
      a.slice(1, 4) + a.slice(0, 1) == b &&
      b.slice(1, 4) + b.slice(0, 1) == c
    )
      return true;
    else return false;
  }
  //
  //all line complete
  static complete(fun, relements) {
    let el = [];
    for (let i = 0; i < 5; i++) {
      //für jedes Element
      let hit = 0;
      let sub = 0;
      let add = 0;
      for (let j = 0; j < 3; j++) {
        //für jede Reihe
        if (fun(relements[j][i].e1, relements[j][i].e2, relements[j][i].e3))
          hit++;
      }
      if (fun === this.isEKA && hit === 3) {
        for (let j = 0; j < 3; j++) {
          //für jede Reihe
          if (
            this.isSUB(
              relements[j][i].e1,
              relements[j][i].e2,
              relements[j][i].e3,
            )
          )
            sub++;
          if (
            this.isADD(
              relements[j][i].e1,
              relements[j][i].e2,
              relements[j][i].e3,
            )
          )
            add++;
        }
      }
      if (hit === 3 && sub !== 3 && add !== 3) el.push(i);
    }
    return el;
  }

  static isVOLL(relements) {
    let el = [];
    for (let i = 0; i < 5; i++) {
      if (
        !(
          relements[0][i].e1 === "0000" &&
          relements[0][i].e2 === "0000" &&
          relements[0][i].e3 === "0000"
        )
      ) {
        if (
          relements[0][i].e1 === relements[1][i].e1 ||
          relements[0][i].e1 === relements[1][i].e2 ||
          (relements[0][i].e1 === relements[1][i].e3 &&
            relements[0][i].e2 === relements[1][i].e1) ||
          relements[0][i].e2 === relements[1][i].e2 ||
          (relements[0][i].e2 === relements[1][i].e3 &&
            relements[0][i].e3 === relements[1][i].e1) ||
          relements[0][i].e3 === relements[1][i].e2 ||
          relements[0][i].e3 === relements[1][i].e3
        ) {
          if (
            relements[0][i].e1 === relements[2][i].e1 ||
            relements[0][i].e1 === relements[2][i].e2 ||
            (relements[0][i].e1 === relements[2][i].e3 &&
              relements[0][i].e2 === relements[2][i].e1) ||
            relements[0][i].e2 === relements[2][i].e2 ||
            (relements[0][i].e2 === relements[2][i].e3 &&
              relements[0][i].e3 === relements[2][i].e1) ||
            relements[0][i].e3 === relements[2][i].e2 ||
            relements[0][i].e3 === relements[2][i].e3
          )
            el.push(i);
        }
      }
    }
    return el;
  }

  //test solvability
  static solvable(code, rules) {
    let symbols = [];
    let arr = code.split(",");
    rules = [
      ...rules.add,
      ...rules.sub,
      ...rules.eka,
      ...rules.sm,
      ...rules.rot,
      ...rules.voll,
    ];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 9; j++) {
        if (arr[j].substr(i * 4, 4) !== "0000") {
          symbols.push(i);
          break;
        }
      }
    }

    let problems = symbols.filter(item => rules.indexOf(item) < 0);
    if (problems.length > 0) {
      alert(
        "This item can't be solved because there are problems with the element row(s) " +
          problems,
      );
      return false;
    }
    return true;
  }
  //
  //test for duplicates

  static testDuplicate = (code, codes) => codes.includes(code);
}

export default rCon;
