const input = `addx 1
addx 5
addx -1
addx 20
addx -14
addx -1
addx 5
addx 13
addx -12
addx 3
addx 3
addx 3
addx 1
addx 4
noop
noop
addx 1
noop
noop
addx 4
noop
addx -35
addx 11
addx -1
addx -7
addx 5
addx 2
addx 3
addx -2
addx 2
addx 5
addx 5
noop
noop
addx -2
addx 2
noop
addx 3
addx 2
addx 7
noop
noop
addx 3
addx -2
addx -36
noop
addx 25
addx -22
addx 7
noop
addx -2
noop
noop
noop
addx 5
addx 5
addx 4
noop
addx -2
addx 5
addx -4
addx 5
addx 4
noop
addx -29
addx 32
addx -23
addx -12
noop
addx 7
noop
addx -2
addx 4
addx 3
addx 20
addx 3
addx -20
addx 5
addx 16
addx -15
addx 6
noop
noop
noop
addx 5
noop
addx 5
noop
noop
noop
addx -37
addx 2
addx -2
addx 7
noop
addx -2
addx 5
addx 2
addx 3
addx -2
addx 2
addx 5
addx 2
addx -6
addx -15
addx 24
addx 2
noop
addx 3
addx -8
addx 15
addx -14
addx 15
addx -38
noop
noop
addx 21
addx -14
addx 1
addx 5
noop
addx -2
addx 7
addx -1
addx 5
noop
addx 2
addx 3
addx 3
addx -2
addx 4
addx 2
addx -17
addx 20
noop
noop
noop
noop`;

const instructions = input.split("\n");
const addxRegexp = /addx (-?\d+)/;

//create an array of just the x movement values for each cycle
const movements = instructions.reduce(
  (arr, instruction) =>
    addxRegexp.test(instruction)
      ? [...arr, 0, Number(instruction.match(addxRegexp)[1])]
      : [...arr, 0],
  []
);

// PART 1
const { sum: signalSum } = movements.reduce(
  ({ sum, x }, dx, cycle) => ({
    sum: sum + (cycle % 40 === 19 ? (cycle + 1) * x : 0),
    x: x + dx,
  }),
  { sum: 0, x: 1 }
);
console.log(signalSum);

// PART 2
const { screen } = movements.reduce(
  ({ screen, x }, dx, cycle) => {
    const r = Math.floor(cycle / 40);
    const c = cycle % 40;
    const pixel = Math.abs(x - c) < 2 ? "#" : ".";
    return {
      screen: screen.map((line, i) => (i === r ? line + pixel : line)),
      x: x + dx,
    };
  },
  { screen: Array(6).fill(""), x: 1 }
);
console.log(screen);


// "####..##...##..#..#.####.###..####..##.."
// "#....#..#.#..#.#..#....#.#..#.#....#..#."
// "###..#....#....#..#...#..#..#.###..#...."
// "#....#.##.#....#..#..#...###..#....#...."
// "#....#..#.#..#.#..#.#....#.#..#....#..#."
// "#.....###..##...##..####.#..#.####..##.."
