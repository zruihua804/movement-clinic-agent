import http from 'node:http';
import {readFile} from 'node:fs/promises';
const root=new URL('./',import.meta.url);
const types={html:'text/html',css:'text/css',js:'text/javascript'};
http.createServer(async(req,res)=>{try{const path=new URL(req.url,'http://localhost').pathname; if(!['/','/index.html','/style.css','/app.js','/workflow.js','/adapters.js','/audit.js','/journey.js','/scene.js'].includes(path)){res.writeHead(404).end();return;}const file=path==='/'?'index.html':path.slice(1);res.setHeader('Content-Type',(types[file.split('.').pop()]||'text/plain')+'; charset=utf-8');res.end(await readFile(new URL(file,root)));}catch{res.writeHead(500).end('Unable to load application');}}).listen(4173,'127.0.0.1',()=>console.log('Clinic demo: http://127.0.0.1:4173'));
