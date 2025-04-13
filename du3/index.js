import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import fs from 'fs';
import { promisify } from 'util';

const app = new Hono();

async function read_file(path) {
  const read_file_async = promisify(fs.readFile);
  try {
    const data = await read_file_async(path, 'utf-8');
    console.log(data.toString());
    return data.toString()
  } catch (error) {
    console.error('Chyba při čtení souboru:', error);
    return 'Chyba při čtení souboru:'
  }
}


async function chang_count(path,zmena) {
  const write_file_async = promisify(fs.writeFile);
  let novy_pocet = "0"
  if (fs.existsSync(path)){
    let aktualni_pocet = await read_file(path)
    novy_pocet = (Number(aktualni_pocet) + zmena).toString()
  }
  try {
    await write_file_async(path, novy_pocet, 'utf-8');
    console.log('Zmena zapsana do souboru.');
  } catch (error) {
    console.error('Chyba při zápisu do souboru:', error);
  }
}

function check_existence(path){
  if (!fs.existsSync(path)){
    console.log(path + ' neexistuje')
  }
}

app.get("/read",async c =>{
  const data = await read_file('counter.txt')
  return c.text(data)
})

app.get("/increase", async c =>{
  chang_count('counter.txt',1)
  return c.text("zvyseno")
})

app.get("/decrease", async c =>{
  chang_count('counter.txt',-1)
  return c.text("snizeno")
})


// Spustí server na portu 3000
serve({ port: 3000, fetch: app.fetch }, (info) => {
  console.log(`Server naslouchá na portu ${info.port}`);
});
