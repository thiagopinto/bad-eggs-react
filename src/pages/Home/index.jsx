import {
  Button,
  Tile,
  Row,
  Column,
  FlexGrid,
} from "@carbon/react";
export default function index() {
  // const obj = useAuthProvider()
  // console.log(obj)
  const basename = process.env.BASE_NAME;
  return (
    <FlexGrid fullWidth>
      <Row>
        <Column>
          <Tile className="tile-card">
            <article>
              <header>
                <h2>
                  Projeto de Visão Computacional para Contagem de Ovos de Aedes
                  aegypti em Ovitrampas
                </h2>
              </header>
              <footer></footer>
            </article>
          </Tile>
        </Column>
      </Row>
      <Row>
        <Column sm={4} md={2} lg={4}>
          <Tile className="tile-card">
            <main className="cds--aspect-ratio cds--aspect-ratio--1x1">
              <figure>
                <img
                  className="responsive"
                  src={`${basename}train_batch4860.jpg`}
                  alt="train"
                />
              </figure>
            </main>
          </Tile>
          <Tile className="tile-card">
            <main className="cds--aspect-ratio cds--aspect-ratio--1x1">
              <figure>
                <img
                  className="responsive"
                  src={`${basename}train_batch4861.jpg`}
                  alt="train"
                />
              </figure>
            </main>
          </Tile>
          <Tile className="tile-card">
            <main className="cds--aspect-ratio cds--aspect-ratio--1x1">
              <figure>
                <img
                  className="responsive"
                  src={`${basename}train_batch4862.jpg`}
                  alt="train"
                />
              </figure>
            </main>
          </Tile>
        </Column>
        <Column sm={4} md={6} lg={12}>
          <Tile className="tile-card">
            <article>
              <main>
                <h3>Introdução:</h3>
                <p>
                  Bem-vindo ao nosso projeto inovador de visão computacional
                  voltado para a contagem precisa e eficiente de ovos de Aedes
                  aegypti, o mosquito transmissor de doenças como a dengue, zika
                  e chikungunya. Neste trabalho, concentramo-nos em uma das
                  principais estratégias de controle desses insetos: as
                  ovitrampas. As ovitrampas são armadilhas especialmente
                  projetadas para atrair e coletar os ovos dos mosquitos fêmeas,
                  permitindo-nos obter informações valiosas sobre a atividade e
                  a presença do Aedes aegypti em determinadas áreas.
                </p>

                <h3>O Desafio:</h3>
                <p>
                  A contagem manual de ovos em ovitrampas é uma tarefa
                  trabalhosa e propensa a erros humanos. Nesse sentido, nosso
                  projeto visa utilizar tecnologias avançadas, como Yolo e
                  OpenCV, para automatizar esse processo, tornando-o mais
                  rápido, preciso e eficiente. Implementamos algoritmos
                  inteligentes para detecção de objetos, possibilitando a
                  identificação e contagem precisa dos ovos de Aedes aegypti
                  presentes nas ovitrampas.
                </p>

                <h3>Metodologia:</h3>
                <p>
                  Para alcançar nosso objetivo, capturamos imagens de ovitrampas
                  por meio de dispositivos de alta resolução. Utilizamos a
                  tecnologia Yolo para detecção de objetos, e o OpenCV para o
                  processamento das imagens e extração de características
                  distintivas dos ovos de Aedes aegypti. Através de técnicas
                  avançadas de aprendizado de máquina, nosso sistema é capaz de
                  realizar a contagem precisa e automatizada dos ovos presentes
                  nas ovitrampas.
                </p>

                <h3>Resultados Preliminares:</h3>
                <p>
                  Nossos resultados preliminares são promissores. O sistema
                  desenvolvido demonstrou alta acurácia na detecção e contagem
                  de ovos de Aedes aegypti em diferentes condições de iluminação
                  e posicionamento das ovitrampas. Acreditamos que essa
                  abordagem automatizada pode revolucionar o controle e a
                  vigilância do Aedes aegypti, possibilitando respostas mais
                  rápidas e eficazes em áreas propensas a surtos dessas doenças
                  transmitidas por mosquitos.
                </p>

                <h3>Conclusão:</h3>
                <p>
                  Este projeto representa uma contribuição significativa no
                  campo do controle de doenças transmitidas por mosquitos,
                  fornecendo uma solução tecnológica para a contagem de ovos de
                  Aedes aegypti em ovitrampas. Com essa abordagem, esperamos
                  facilitar a implementação de estratégias efetivas de controle
                  do mosquito e, consequentemente, reduzir os riscos à saúde
                  pública. Estamos ansiosos para continuar avançando nessa
                  pesquisa e expandir seu impacto positivo em nossas
                  comunidades.
                </p>
              </main>
              <footer>
                <Button kind="secondary">Ir para Galeria</Button>
              </footer>
            </article>
          </Tile>
        </Column>
      </Row>
    </FlexGrid>
  );
}
