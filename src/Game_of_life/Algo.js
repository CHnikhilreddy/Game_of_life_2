import { useState, useRef, useCallback } from 'react'

const numRows = 50
const numCols = 50

const direction = [[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]]

function getnewcleardgrid(){
    const rows = [];
    for(let i = 0;i<numRows;i++){
        rows.push(Array.from(Array(numCols),()=>'0'))
    }
    return rows 
}

function getnewrandomgrid(){
    const rows = [];
    for(let i = 0;i<numRows;i++){
        rows.push(Array.from(Array(numCols),()=>{
            return Math.random() < 0.3?'1':'0'
        }))
    }
    return rows 
}

function Algo(){
    const [run,setRun] = useState(false)
    const running = useRef()
    running.current = run
    const [grid,setGrid] = useState(getnewcleardgrid())
    const changesatefunctin = (i,j)=>{
        var new_arr = JSON.parse(JSON.stringify(grid))
        new_arr[i][j] = new_arr[i][j]==='0'?'1':'0'
        setGrid(new_arr)
    }
    const simulation = useCallback(()=>{
        if(!running.current){
            return   
        }
        setGrid(g=>{
            var new_grid = JSON.parse(JSON.stringify(g))
            for(let i in new_grid){
                for(let j in new_grid[i]){
                    var neighbors = 0;
                    for(let k = 0;k<direction.length;k++){
                        var x = parseInt(i) + direction[k][0]
                        var y = parseInt(j) + direction[k][1]
                        if(x>=0 && y>=0 && x<numRows && y<numCols && g[x][y] === '1'){
                            neighbors+=1
                        }
                    }
                    if(neighbors>3){
                        new_grid[i][j] = '0'
                    }
                    else if(neighbors===3){
                        new_grid[i][j] = '1'
                    }
                    else if(neighbors===2){
                    }
                    else{
                        new_grid[i][j] = '0'
                    }

                }
            }
            return new_grid
        })
        setTimeout(() => {
            simulation()
        },100);
    },[])

    return (
    <div>
        <button onClick={()=>{
            setRun(!run);
            if(!run){
                running.current = true
                simulation()
            }
        }}> {running.current?"stop":"start"} </button>
        <button onClick={()=>{
            setRun(false);
            running.current = false
            setGrid(getnewcleardgrid())
        }}>clear</button>
        <button onClick={()=>{
            setGrid(getnewrandomgrid())
        }}>Random</button>
    <div style={{
        display:'grid',gridTemplateColumns:'repeat(50,20px)',gridTemplateRows:'repeat(50,20px)'}}>
        {grid.map((row,i)=>(
            row.map((col,j)=>(
                <div
                key={`${i}+${j}`}
                onClick={()=>(changesatefunctin(i,j))}
                style={{
                    backgroundColor:grid[i][j] === '1'?"black":undefined,
                    border:"solid 1px black"
                }}> </div>
            ))
        ))}
    </div>
    </div>
    )
}
export default Algo