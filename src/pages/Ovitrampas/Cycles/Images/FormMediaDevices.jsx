import { useRef, useState, useEffect } from "react";
import {
  Button,
  Tile,
  FlexGrid,
  Row,
  Column,
  ToastNotification,
  Select,
  SelectItem,
} from "@carbon/react";
import { Camera } from "@carbon/icons-react";
import Image from "../../../../services/Image";
const blobs = [];
let track = null;

export default function FormMediaDevices({
  items,
  setItems,
  cycleId,
  handlerShowForm,
}) {
  const [optionsCam, setOptionsCam] = useState([]);
  const [selecteCam, setSelecteCam] = useState("");
  const refVideo = useRef(null);
  const [listImagens, setListImagems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const listDevice = async () => {
      const list = await navigator.mediaDevices.enumerateDevices();
      const filterList = await list.filter(
        (device) => device.kind == "videoinput"
      );
      setOptionsCam(filterList);
      setSelecteCam(filterList[0].deviceId);
    };

    listDevice();
  }, []);

  /* 
    let imageCapture;
  let photoCapabilities;
  let photoSettings;
  const hdConstraints = {
    video: { width: { exact: 1280 }, height: { exact: 720 } },
  };

  const fullHdConstraints = {
    video: { width: { exact: 1920 }, height: { exact: 1080 } },
  };

  const televisionFourKConstraints = {
    video: { width: { exact: 3840 }, height: { exact: 2160 } },
  };

  const cinemaFourKConstraints = {
    video: { width: { exact: 4096 }, height: { exact: 2160 } },
  };

  const eightKConstraints = {
    video: { width: { exact: 7680 }, height: { exact: 4320 } },
  }; */

  /* mandatory: {
    minWidth: 1280,
    minHeight: 720,
  }, */

  useEffect(() => {
    if (track) {
      track.stop();
    }
    if (refVideo.current && selecteCam !== "") {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: { exact: selecteCam },
            width: { ideal: 4320 },
            height: { ideal: 7680 },
            facingMode: "environment",
          },
        })
        .then(async (mediaStream) => {
          try {
            track = await mediaStream.getVideoTracks()[0];
            const capabilitie = track.getCapabilities();
            const constraint = track.getConstraints();
            constraint.height = capabilitie.height.max;
            constraint.width = capabilitie.width.max;
            mediaStream.getVideoTracks()[0].applyConstraints(constraint);
            refVideo.current.srcObject = mediaStream;
            refVideo.current.play();
          } catch (error) {
            refVideo.current.srcObject = mediaStream;
            refVideo.current.play();
          }
        })
        .catch(function (err) {
          console.log("Não há permissões para acessar a webcam" + err.message);
        });
    }

    return () => {
      if (track) {
        track.stop();
      }
    };
  }, [selecteCam]);

  const handlerClickCapture = async () => {
    try {
      const imageCapture = new ImageCapture(track);
      /*      
      const capabilitie = track.getCapabilities();
      console.log(capabilitie);
      const photoCapabilities = await imageCapture.getPhotoCapabilities();
      console.log(photoCapabilities);
      const photoSettings = await imageCapture.getPhotoSettings();
      console.log(photoSettings);
      photoSettings.imageHeight = capabilitie.height.max;
      photoSettings.imageWidth = capabilitie.width.max;

      photoSettings.fillLightMode = "flash";
      photoSettings.redEyeReduction = "always";
      */
      const newBlob = await imageCapture.takePhoto();
      // console.log(newBlob);
      blobs.push(newBlob);
      setListImagems([...blobs]);

      console.log("imageCapture");
    } catch (error) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.height = refVideo.current.videoHeight;
      canvas.width = refVideo.current.videoWidth;
      ctx.drawImage(refVideo.current, 0, 0);
      canvas.toBlob((blob) => {
        // console.log(blob);
        blobs.push(blob);
        setListImagems([...blobs]);
      }, 1);
      console.log("Not imageCapture");
    }
  };

  const handlerClickSave = async () => {
    if (blobs.length < 1) {
      setError("Não tem imagens para salvar");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cycle_id", cycleId);

      blobs.forEach((blob, index) => {
        formData.append("files", blob, `webcam-${index}.jpg`);
      });
      const ImagesDB = await Image.create(formData);
      await ImagesDB.forEach((ImageDB) => {
        ImageDB.id = ImageDB.id.toString();
      });
      setItems([...ImagesDB, ...items]);
      handlerShowForm(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <FlexGrid>
        <Row>
          <Column sm={4} md={5} lg={10}>
            <Select
              id="select-device"
              labelText=""
              onChange={(e) => {
                setSelecteCam(e.target.value);
              }}
            >
              <SelectItem key="" value="" text="Selecione uma câmera" />
              {optionsCam.map((option) => (
                <SelectItem
                  key={option.deviceId}
                  value={option.deviceId}
                  text={option.label}
                />
              ))}
            </Select>
            <Tile className="tile-card">
              <article>
                <main>
                  <video className="responsive" ref={refVideo}></video>
                </main>
                <footer>
                  <Button
                    id="save"
                    iconDescription="Salvar"
                    kind="secondary"
                    onClick={handlerClickSave}
                  >
                    Salvar
                  </Button>
                  <Button
                    id="capture"
                    iconDescription="Capturar"
                    onClick={handlerClickCapture}
                  >
                    <Camera /> Capturar
                  </Button>
                </footer>
              </article>
            </Tile>
          </Column>
          <Column sm={4} md={3} lg={6}>
            <div className="grid-template-columns-2">
              {listImagens.map((imagem, index) => (
                <Tile key={index}>
                  <img
                    className="responsive"
                    src={URL.createObjectURL(imagem)}
                    alt=""
                  />
                </Tile>
              ))}
            </div>
          </Column>
        </Row>
      </FlexGrid>
      {error && (
        <ToastNotification
          className="toast-notification"
          role="status"
          timeout={0}
          title={error}
        />
      )}
    </>
  );
}
