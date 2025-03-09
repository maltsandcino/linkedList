function bfs(begin, end){

let seen = new Set();
let movements = [   [-1, 2], [-1, -2], [1, -2], [1, 2],
                    [-2, 1], [-2, -1], [2, -1], [2, 1] ]

let q = [[begin, 0, begin]];

while (q.length > 0) {
    
    let [position, moves, path] = q.shift()
    seen.add(position.toString())
    if (position.toString() == end.toString()){
        console.log("moves: ", moves)
        console.log("path: ", path.toString())
        return [moves, [path]]

    }
    for(entry of movements){
        let new_position = [position[0] + entry[0], position[1] + entry[1]]

        if (new_position[0] < 8 && new_position[0] >= 0 && new_position[1] < 8 && new_position[1] >= 0 && !seen.has(new_position.toString())){
            let new_path = path.concat([" = to = "], [new_position])
            q.push([new_position, moves + 1, [new_path]])
        }
}
}

return -1

}

let [g, path] = bfs([3, 3], [4, 3])


console.log(`Starting Position: [3, 3] \nEnding Position: [4, 3] \nMinimum Number of moves: ${g} \nPath: ${path}`)
console.log("\nTo call the function, use bfs([starting position], [ending position])")

