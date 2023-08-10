import { useState, useEffect } from "react";
import UpdateModal from "./UpdateModal";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Row, Column, FlexGrid, Button, ButtonSet } from "@carbon/react";
import { PageFirst, PageLast, CloseOutline } from "@carbon/icons-react";

export default function Overlay({ toggleOverlay, selectImagem }) {
  const handlerClickClose = () => {
    toggleOverlay();
  };
  return (
    <div id="overlay">
      <div className="conteiner">
        <FlexGrid>
          <Row>
            <Column
              sm={4}
              md={{ span: 6, offset: 1 }}
              lg={{ span: 12, offset: 2 }}
            >
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={125}
                totalSlides={selectImagem.segments.length}
              >
                <Slider>
                  {selectImagem.segments.map((segment, index) => (
                    <Slide key={segment.id} index={index}>
                      <Row>
                        <Column>
                          <ButtonSet>
                            <ButtonBack className="cds--btn cds--btn--primary">
                              <PageFirst />
                              Anterior
                            </ButtonBack>
                            <ButtonNext className="cds--btn cds--btn--primary">
                              Próximo
                              <PageLast />
                            </ButtonNext>
                          </ButtonSet>
                        </Column>
                        <Column>
                          <Button
                            className="button-close"
                            onClick={handlerClickClose}
                          >
                            <CloseOutline />
                          </Button>
                        </Column>
                      </Row>

                      <UpdateModal
                        selectImagem={selectImagem}
                        segment={segment}
                        handlerClickClose={handlerClickClose}
                      ></UpdateModal>
                    </Slide>
                  ))}
                </Slider>
              </CarouselProvider>
            </Column>
          </Row>
        </FlexGrid>
      </div>
    </div>
  );
}

{
  /* 
          <FlexGrid>
          <Row>
            <Column
              sm={4}
              md={{ span: 6, offset: 1 }}
              lg={{ span: 12, offset: 2 }}
            >
            <Row key={segment.id}>
<Column  sm={2} md={4} lg={8}>

</Column>
<Column key={segment.id} sm={2} md={4} lg={8}>
  <Tile className="tile-card">
    <main>
      <figure>
        <img
          className="responsive"
          src={`${process.env.API_URL}/storage/predict/${selectImagem.file_name}/${segment.file_name}`}
          alt="train"
        />
      </figure>
    </main>
  </Tile>
</Column>
</Row> 
            </Column>
          </Row>
        </FlexGrid>*/
}
