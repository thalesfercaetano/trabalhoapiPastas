import { aplicacao } from "./app";
import { rotaArtigo } from "./routes/postRoutes";
import { rotaPessoa } from "./routes/userRouter";

aplicacao.use("/pessoas", rotaPessoa);
aplicacao.use("/artigos", rotaArtigo);

aplicacao.listen(3003, () => {
  console.log("API está funcionando na porta 3003");
});
