const connect = require("../db/connect");

module.exports = class eventoController {
  //criação de um evento
  static async createEvento(req, res) {
    const { nome, descricao, data_hora, local, fk_id_organizador } = req.body;

    //validação genérica de todos atributos
    if (!nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `INSERT into evento (nome, descricao, data_hora, local, fk_id_organizador) values (?, ?, ?, ?, ?)`;
    const values = [nome, descricao, data_hora, local, fk_id_organizador];
    try {
      connect.query(query, values, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao criar o evento" });
        }
        return res.status(201).json({ message: "Evento criado com sucesso!" });
      });
    } catch (error) {
      console.log("erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  } //fim do create

  //Vistar todos os eventos cadastrados

  static async getAllEventos(req, res) {
    const query = `SELECT * FROM evento`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro ao buscar eventos" });
        }

        return res
          .status(200)
          .json({ message: "Eventos listados com sucesso!", events: results });
      });
    } catch (error) {
      console.error("Erro ao executar a query:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    
  }
  //update de um evento
  static async updateEvento(req, res) {
    const { id_evento, nome, descricao, data_hora, local, fk_id_organizador } = req.body;

    //validação genérica de todos atributos
    if (!id_evento || !nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `UPDATE evento set nome=?, descricao=?, data_hora=?, local=?, fk_id_organizador=? WHERE id_evento =? `;
    const values = [nome, descricao, data_hora, local, fk_id_organizador, id_evento];
    try {
      connect.query(query, values, (err, results) => {
        console.log("Resultados:", results);
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao atualizar o evento!" });
        }
        if(results.affectedRows === 0){
            return res.status(404).json({error: "Evento não encontrado"})
        }
        return res.status(200).json({ message: "Evento atualizado com sucesso!" });
      });
    } catch (error) {
      console.log("erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  } //fim do update

  static async deleteEvento(req, res){
    const idEvento = req.params.id;

    const query = `delete from evento where id_evento=?`;

    try{
        connect.query(query, idEvento, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: "Erro ao excluir evento!"});
            }
            if(results.affectedRows === 0){
                return res.status(404).json({error:"Evento não encontrado!"});
            }
            return res.status(200).json({message:"Evento excluído com sucesso!"});
        });
    }catch(error){
        console.log("Erro ao executar a consulta!", error);
        res.status(500).json({error:"Erro interno do servidor"});
    }
}
  
};
