const GameBoard = () => {
  const boardArray = [];
  for (let i = 0; i < 8; i++) {
    boardArray[i] = [];
    for (let j = 0; j < 8; j++) {
      boardArray[i][j] = `[${i}, ${j}]`;
    }
  }
  return boardArray;
};

const legalMoves = ([x, y], boardArray = GameBoard()) => {
  for (let i = 0; i < boardArray.length; i++) {
    boardArray[i] = boardArray[i].filter(
      (move) =>
        move === `[${x - 2}, ${y - 1}]` ||
        move === `[${x - 1}, ${y - 2}]` ||
        move === `[${x + 1}, ${y - 2}]` ||
        move === `[${x + 2}, ${y - 1}]` ||
        move === `[${x + 2}, ${y + 1}]` ||
        move === `[${x + 1}, ${y + 2}]` ||
        move === `[${x - 1}, ${y + 2}]` ||
        move === `[${x - 2}, ${y + 1}]`
    );
  }

  boardArray = boardArray.flat();
  return boardArray;
};

const Node = ([x, y]) => {
  let node = { value: `[${x}, ${y}]`, prev: null };
  return node;
};

const q = [];
const visited = [];

const bfs = (node, end) => {
  visited.push(q.shift());

  let children = legalMoves(JSON.parse(node.value));

  children.forEach((child) => {
    child = { value: child, prev: node };
    if (!visited.some((el) => el.value === child.value)) {
      q.push(child);
    }
  });

  if (node.value === Node(end).value) {
    return node;
  } else {
    return bfs(q[0], end);
  }
};

const knightMoves = (start, end) => {
  if (end[0] > 7 || end[0] < 0 || end[1] > 7 || end[1] < 0) {
    return "Out of Range!!";
  }

  q.push(Node(start));
  let path = bfs(q[0], end);

  const output = [];

  while (path.prev !== null) {
    output.unshift(path.prev.value);
    path = path.prev;
  }

  console.log("Here is your path from " + start + " to " + end);
  output.forEach((move) => console.log(move));
};

console.log(knightMoves([3, 3], [7, 0]));
