import fs from 'fs'

if (!fs.existsSync('instrukce.txt')){
console.log('soubor instrukce.txt neexistuje')

}else{
    fs.readFile('instrukce.txt',(err,data) =>{
        if(err){
            console.log(err.message)
        }else{
            let nazvy_souboru = data.toString().split(';')
            let zdrojovy_soubor = nazvy_souboru[0]
            let cilovy_soubor = nazvy_souboru[1]
            if (!fs.existsSync(zdrojovy_soubor)){
                console.log('Zdrojovy soubor neexistuje')
            }else{
                fs.readFile(zdrojovy_soubor,(err,data)=>{
                    if(err){
                        console.log(err.message)
                    }else{
                        fs.writeFile(cilovy_soubor,data,(err)=>{
                            if(err){
                                console.log(err.message)
                            }else{
                                console.log('data zapsana')
                            }

                        })
                    }
                })

                
            }
        }
    })

}