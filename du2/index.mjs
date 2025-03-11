import fs from 'fs/promises'
import { exit, exitCode } from 'process'


const data = await fs.readFile('-4IT573---NodeJS/du2/instrukce.txt')

const number_of_files = parseInt(data.toString(),10)

if (isNaN(number_of_files)||number_of_files <0 ){
    console.log("neplatny pocet souboru k vytvoreni")
    process.exit(1)
}
let file_promeses = []

for (let i = 0 ; i<=10;i++){    


    file_promeses.push(fs.writeFile("-4IT573---NodeJS/du2/" + i + ".txt",""))
}

Promise.all(file_promeses).then(()=>{
     console.log("vsechny slozky vytvoreny")
})