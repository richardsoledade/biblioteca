const moment = require("moment");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function create(req, res) {
  const aluguel = await prisma.aluguel.create({
    data: req.body,
  });
  res.json(aluguel);
}
// =================================================

async function get(req, res) {
  res.json(
    await prisma.aluguel.findMany({
      include: {
        Livro: true,
        Cliente: true,
      },
    })
  );
}

//===================================================
async function getHst(req, res) {
  res.json(
    await prisma.aluguel.findMany({
      where: {
          clienteId: parseInt(req.params.id),
      },
      include: {
        Livro: true,
        Cliente: true,
      },
    })
  );
}

// =================================================

async function put(req, res) {
  let { data, dataDevolucao } = req.body;

  let dias = moment(dataDevolucao).diff(data, "days");

  req.body.valorArrecadado =
    parseFloat(dias) * parseFloat(req.body.valorDiaria);

  delete req.body.valorDiaria;

  const aluguel = await prisma.aluguel.update({
    data: req.body,
    where: {
      id: req.body.id,
    },
  });

  return res.json(aluguel);
}
// =================================================

async function deletar(req, res) {
  const aluguel = await prisma.aluguel.delete({
    where: {
      id: parseInt(req.params.id),
    },
    
  });

  return res.json(aluguel);
}

//usar data so para cadastrar e atualziar

module.exports = { create, get, put, deletar, getHst };
