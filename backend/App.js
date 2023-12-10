const express=require('express')
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

const PORT = 3333;


app.listen(PORT, () => {
    console.log(`Aplicação respondendo em: http://localhost:${PORT}`);
});

const mysql = require('mysql2/promise')
const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'share2care'
})

app.get('/',(req,res)=>{
    res.send("Rafael");
})

const getAllPessoas = async () =>{
    const [query] = await connection
    .execute('select * from TestePessoa.Pessoa');
    return query;
}
app.get('/pessoa', async (req,res)=>{
    const consulta = await getAllPessoas();
    return res.status(200).json(consulta);
})

app.get('/pessoa/:id', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from TestePessoa.Pessoa where id = ?', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})

app.get('/pessoa/busca/:nome', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from TestePessoa.Pessoa where id = ?', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})

app.post('/pessoa', async (req,res)=>{
    const {nome, email} = req.body;
    const [query]= await connection.
    execute('insert into TestePessoa.Pessoa (nome,email) values(?,?)',
    [nome,email])
    return res.status(200).json(query);
})


app.put('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
   
        const [updateQuery] = await connection.execute('UPDATE TestePessoa.Pessoa SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);
        return res.status(200).json({ mensagem: 'Pessoa atualizada com sucesso.' });
   
});


app.delete('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
        const [deleteQuery] = await connection.execute('DELETE FROM TestePessoa.Pessoa WHERE id = ?', [id]);
        return res.status(200).json({ mensagem: 'Pessoa excluída com sucesso.' });
});
