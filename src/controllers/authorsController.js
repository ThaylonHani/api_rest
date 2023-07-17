import authors from "../models/Author.js";

class authorController {
  static getAllAuthors = async (req, res) => {
    try {
      const authorsRes = await authors.find();
      res.status(200).json(authorsRes);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static getAuthorById = async (req, res) => {
    const id = req.params.id;

    try {
      const author = await authors.findById(id);
      res.status(200).send(author.toJSON());
    } catch (error) {
      res
        .status(404)
        .send({ message: `${error.message} - Autor não encontrado` });
    }
  };

  static postAuthor = (req, res) => {
    try {
      const newAuthor = new authors(req.body);
      newAuthor.save(res.status(201).send(newAuthor.toJSON()));
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Autor não cadastrado` });
    }
  };
  static modifyAuthor = async (req, res) => {
    const id = req.params.id;

    try {
      await authors.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      res.status(200).send("Autor modificado com sucesso");
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Autor não modificado` });
    }
  };
  static updateAuthor = async (req, res) => {
    const id = req.params.id;
    try {
      if (req.body.name || req.body.nationality) {
        await authors.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).send("Autor atualizado com sucesso");
      } else {
        throw new Error("Nome ou nacionalidade não informada");
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Autor não atualizado` });
    }
  };
  static deleteAuthor = async (req, res) => {
    const id = req.params.id;

    try {
      await authors.findByIdAndDelete(id);
      res.status(200).send("Autor deletado com sucesso");
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Autor não deletado` });
    }
  };
}

export default authorController;
