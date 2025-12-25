"use client";

import AddPedido from "../lib/addPedido";
import Db from "../lib/db";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";



let pratos = Db()
pratos = pratos.pratos
const host = "http://localhost:3000/"

console.log(pratos)

function getCardapio() {
  pratos.forEach((listaPratos, indiceListaPratos) => {
    let i = 0
    const listaPrato = document.createElement("div");
    listaPrato.className = "listaPratos";

    document.querySelector(".comtainer-cardapio").append(listaPrato);

    listaPratos.forEach((prato, indicePratos) => {
      const containerPrato = document.createElement("div");
      const groupInfo = document.createElement("div");
      const groupTexts = document.createElement("div");
      const imgPrato = document.createElement("img");
      const nomePrato = document.createElement("h4");
      const descPrato = document.createElement("p");
      const BtnAdd = document.createElement("button");

      containerPrato.className = "containerPrato";
      groupInfo.className = "group-infoPrato";
      imgPrato.className = "fotoPrato";
      nomePrato.className = "titulPrato";
      descPrato.className = "descPrato";
      groupTexts.className = "groupText";
      BtnAdd.className = "btnAdd";
      BtnAdd.dataset.id = prato.id

      BtnAdd.innerText = "Adicionar"

      imgPrato.src = prato.images[0]

      nomePrato.innerText = prato.nome
      descPrato.innerText = prato.desc
      containerPrato.dataset.id = prato.id

      groupTexts.append(nomePrato);
      groupTexts.append(descPrato);
      groupInfo.append(imgPrato);
      groupInfo.append(groupTexts);
      containerPrato.append(groupInfo);
      containerPrato.append(BtnAdd);

      listaPrato.append(containerPrato);

      containerPrato.addEventListener("click", () => {
        sessionStorage.setItem("i1", indicePratos)
        sessionStorage.setItem("i2", indiceListaPratos)
      })

      i++


    })

  })
}

function Cardapio() {
  let lockVerDetalhes = false

  useEffect(() => {
    getCardapio()
  }, [])

  useGSAP(() => {
    const fadeOutCards = () => {
      gsap.to(".containerPrato", {
        duration: 0,
        opacity: 0,
        y: "-19%"
      })
    }

    const configCards = () => {
      const listaPratos = document.querySelectorAll(".listaPratos")

      const animaCards = (es) => {
        const container = es[0].target
        const duration = 0.5
        const delay = 0.2

        const timeline = gsap.timeline({})
        const cards = container.querySelectorAll(".containerPrato")

        const animaFadeIn = (e, delay) => {

          gsap.to(e, {
            duration: duration,
            opacity: 1,
            y: "0%",
            delay: delay,
          })
        }

        const animaFadeOut = (e, delay) => {

          gsap.to(e, {
            duration: duration,
            opacity: 0,
            y: "-10%",
            delay: delay,
          })
        }

        if (es[0].isIntersecting === true) {
          animaFadeIn(cards[0], 0)
          animaFadeIn(cards[1], delay)
          animaFadeIn(cards[2], delay * 2)

        } else {
          animaFadeOut(cards[0], 0)
          animaFadeOut(cards[1], delay)
          animaFadeOut(cards[2], delay * 2)
        }
      }


      const obs = new IntersectionObserver(animaCards, {
        threshold: 0.3,
      })

      listaPratos.forEach(listaPrato => {
        obs.observe(listaPrato)
      })

    }

    const fadeOutHeader = () => {
      gsap.to(".header", {
        duration: 0.5,
        opacity: 0,
        y: "-5%"
      })
    }

    const animaLoading = (es) => {

      if (es[0].isIntersecting === true) {
        const target = es[0].target
        const header = target.querySelector(".header")

        gsap.to(header, {
          duration: 1,
          opacity: 1,
          y: "0%"
        })
      } else {
        fadeOutHeader()
      }
    }

    const animaHoverCard = (e) => {
      console.log(e)
      gsap.to(e, {
        duration: 1,
        scale: 1.05,
        y: "-7%",
        onComplete: () => {
          e.addEventListener("mouseleave", () => {
            gsap.to(e, {
              duration: 0.5,
              scale: 1,
              y: "0%",
            })
          })
        }
      })
    }

    const animaLoadingPageCard = (e) => {
      const background = document.querySelector(".backgroundPage")
      console.log(background)


      gsap.to(background, {
        duration: 0.3,
        opacity: 1,
        onComplete: () => {

          //window.location.href = host + "detalhePrato"
        }
      })
    }

    const selectCardAnima = (e) => {
      gsap.to(e, {
        duration: 1,
        scale: 1.05,
        y: "-14%",
        opacity: 0.5,
        onComplete: () => {
          a//nimaLoadingPageCard(e)
        }
      })
    }

    const addPrato = () => {
      const btns = document.querySelectorAll(".btnAdd")

      btns.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
          lockVerDetalhes = true
        })
  
        btn.addEventListener("mouseleave", () => {
          lockVerDetalhes = false
        })
  
  
        btn.addEventListener("click", () => {
          console.log("kkljklkklj")
  
          pratos.forEach((ps, indiceLista) => {
            ps.forEach((p, indice) => {
              console.log(`id: ${p.id} === ${btn.dataset.id}`)
              if (p.id == btn.dataset.id) {
                console.log(p)
                AddPedido(indiceLista, indice)
              }
            })
          })
        })
      })

    }


    setTimeout(() => {
      addPrato()
      fadeOutHeader()

      fadeOutCards()
      configCards()


      document.querySelectorAll(".containerPrato").forEach(pratoCard => {
        pratoCard.addEventListener("mouseenter", (e) => {
          animaHoverCard(e.target)
        })

        pratoCard.addEventListener("click", (e) => {
          if (lockVerDetalhes === false) {
            sessionStorage.setItem("ps", pratoCard.dataset.id)
            selectCardAnima(e.target)
          }
        })
      })

    }, 300)


    const obs = new IntersectionObserver(animaLoading, {
      rootMargin: "-20% 0% 0% 0%"
    })

    obs.observe(document.querySelector(".cardapio"))
  }, [])

  return (
    <div className="cardapio">
      <div className="header">

        <h2>Nosso cardapio</h2>
      </div>

      <div className="comtainer-cardapio">
      </div>
    </div>
  );
}

export default Cardapio;