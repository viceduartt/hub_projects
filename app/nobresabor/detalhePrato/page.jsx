"use client";

import AddPedido from "@/lib/addPedido";
import Db from "@/lib/db";
import { useEffect, useState } from "react";
import Header from "../componenets/Header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Loading from "../componenets/Loading";

let pratos = Db()
pratos = pratos.pratos
let prato = 0


let cart = "/icons/pedidos.svg"

function detalhePrato() {
  let indiceListaPratos = null
  let indicePratos = null
  const imgBgPrato = "images/bgPrato.svg"

  const [imgPrato0, setImgPrato0] = useState("images/manha/p1.svg")
  const [imgPrato1, setImgPrato1] = useState("images/manha/p1.svg")
  const [imgPrato2, setImgPrato2] = useState("images/manha/p1.svg")
  const [imgPrato3, setImgPrato3] = useState("images/manha/p1.svg")
  const [imgPrato4, setImgPrato4] = useState("images/manha/p1.svg")

  const [nomePrato, setNomePrato] = useState("")
  const [descPrato, setDescPrato] = useState("")

  useEffect(() => {
    indiceListaPratos = sessionStorage.getItem("i1") || 1
    indicePratos = sessionStorage.getItem("i2") || 2

    const id = sessionStorage.getItem("ps") || 1
    console.log(`id ${id}`)

    pratos.forEach(ps => {
      ps.forEach(p => {
        if (p.id == id) {
          prato = p
        }
      })
    })

    console.log(prato)



    setNomePrato(prato.nome)
    setDescPrato(prato.desc)

    setImgPrato0(prato.images[0])
    setImgPrato1(prato.images[1])
    setImgPrato2(prato.images[2])
    setImgPrato3(prato.images[3])
    setImgPrato4(prato.images[2])

    AddPedido(indiceListaPratos, indicePratos)


  }, [])

  useGSAP(() => {
    let lockHover = false

    const animaLoading = () => {

    }

    const animaChangeFoto = (e) => {
      const imgPosBaseFoco = document.querySelector(".imgFoco")
      const imgPosBase = e.querySelector("img")
      const timeline = gsap.timeline({})
      const imgFocoViwer = document.querySelector(".imgFocoLayer")
      const imgViwer = document.querySelector(".imgLayer")

      const stylesImgBaseFoco = window.getComputedStyle(imgPosBaseFoco)
      const stylesImgBase = window.getComputedStyle(imgPosBase)

      const timelineImgViwer = gsap.timeline({})
      const timelineImgFocoViwer = gsap.timeline({})

      const posImgFoccoTmp = imgPosBaseFoco.getBoundingClientRect()
      const posImgTmp = imgPosBase.getBoundingClientRect()
      let posImgX = 0
      let posImgY = 0
      let posImgFocoX = 0
      let posImgFocoY = 0


      posImgFocoX = posImgFoccoTmp.left
      posImgFocoY = posImgFoccoTmp.top
      posImgX = posImgTmp.left
      posImgY = posImgTmp.top


      //height: stylesImgBase.getPropertyValue("height"),
      //widows: stylesImgBase.getPropertyValue("widows"),
      //y: posImgY - (imgViwer.offsetHeight*1.47),
      //x: posImgX  - (imgViwer.offsetWidth/2.2),

      gsap.set(imgViwer, {
        height: stylesImgBase.getPropertyValue("height"),
        widows: stylesImgBase.getPropertyValue("widows"),
        top: posImgY - (imgViwer.offsetHeight * 1.3),
        left: posImgX - (imgViwer.offsetWidth / 2.3),
      })

      imgViwer.src = imgPosBase.src


      gsap.to(imgViwer, {
        direction: 3,
        height: stylesImgBase.getPropertyValue("height"),
        widows: stylesImgBase.getPropertyValue("widows"),
        top: posImgY - (imgViwer.offsetHeight * 1.3),
        left: posImgX - (imgViwer.offsetWidth / 2.3),
        onComplete: () => {
          gsap.set(imgViwer, {
            opacity: 1,
          })
        }
      })

      imgFocoViwer.src = imgPosBaseFoco.src


      e.addEventListener("click", () => {

        if (false) {

          gsap.to(imgViwer, {
            direction: 3,
            opacity: 1,
            height: stylesImgBaseFoco.getPropertyValue("height"),
            widows: stylesImgBaseFoco.getPropertyValue("widows"),
            y: posImgFocoY - (imgViwer.offsetHeight * 1.47),
            x: posImgFocoX - (imgViwer.offsetWidth / 2.2),
            onComplete: () => {
              //imgFocoViwer.src = imgPosBase.src
            }
          })

        }

        //gsap.set(imgPosBaseFoco, { opacity: 0 })

        if (timelineImgFocoViwer.isActive() === false) {
          //imgViwer.src = imgPosBaseFoco.src

        }

        if (timelineImgViwer.isActive() === false) {

          //imgFocoViwer.src = imgPosBase.src
        }

        timelineImgFocoViwer.clear()
        timelineImgViwer.clear()



        lockHover = true

        timeline.to(e, {
          duration: 0.7,
          scale: 1.2,
          boxShadow: "0 0 5rem 0.1rem #ffffff8f",
        })

        gsap.set(imgViwer, {
          opacity: 1
        })

        timelineImgFocoViwer.to(imgFocoViwer, {
          //direction: 3,
          opacity: 1,
          //y: "12rem",
          //x: "1rem",
          //height: "52rem",
          //width: "52rem",
          onComplete: () => {
            //imgPosBaseFoco.src = imgFocoViwer.src
            gsap.set(imgPosBaseFoco, { opacity: 1 })


            gsap.set(imgFocoViwer, {
              //opacity: 0,
              //y: posImgY,
              //x: posImgX,
              //height: "7.5rem",
              //width: "7.5rem",
            })
          }
        })

        timelineImgViwer.to(imgViwer, {
          direction: 6,
          //y: posImgY - 123,
          //x: posImgX - 14,
          //height: "7.5rem",
          //width: "7.5rem",
          onComplete: () => {
            //imgPosBase.src = imgViwer.src
            gsap.set(imgViwer, {
              //opacity: 0,
              //y: "0rem",
              //x: "0rem",
              //height: "52rem",
              //width: "52rem",
            })
          }
        })




      })

      if (lockHover == false) {

        gsap.to(".pratoBg", {
          duration: 0,
          //scale: 1,
          boxShadow: "0 0 5rem 0.1rem #0000008f",
        })



        timeline.to(e, {
          duration: 1.4,
          //scale: 1.2,
          boxShadow: "0 0 5rem 0.1rem #ffffff8f",
          onComplete: () => {
            e.addEventListener("mouseleave", () => {

              if (lockHover === false) {
                gsap.to(e, {
                  duration: 1.4,
                  //scale: 1,
                  boxShadow: "0 0 5rem 0.1rem #0000008f",
                })
              }
            })
          }
        })
      }

    }

    setTimeout(() => {
      document.querySelectorAll(".pratoBg").forEach(foto => {
        foto.addEventListener("mouseenter", (e) => {
          animaChangeFoto(e.target)
        })
      })
    }, 400)
  }, [])

  return (
    <>
      <Loading />
      <Header />


      <main className="detalhePrato">



        <div className="fotosPrato">
          <div className="backgroundPrato">
            <img className="bg" src={imgBgPrato} alt="" />
            <div className="effectLightFoco"></div>
          </div>

          <div className="group-prato">
            <img className="imgFocoLayer" alt="" />

            <img className="imgFoco" src={imgPrato0} alt="" />

            <div className="group-fotosPrato">
            <img className="imgLayer" alt="" />
              <div className="pratoBg" id="f1">
                <img src={imgPrato1} alt="" />
              </div>

              <div className="pratoBg" id="f2">
                <img src={imgPrato2} alt="" />
              </div>

              <div className="pratoBg" id="f3">
                <img src={imgPrato3} alt="" />
              </div>


              <div className="pratoBg" id="f4">
                <img src={imgPrato4} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="group-detalhePrato">
          <div className="group-detalheText">
            <h4>{nomePrato}</h4>
            <p>{descPrato}</p>
          </div>

          <div className="group-btns">

            <button className="btn-fazerPedido">Faer pedidp</button>
            <button className="btn-addCart"><img src={cart} alt="" /></button>
          </div>
        </div>
      </main>
    </>
  );
}

export default detalhePrato;