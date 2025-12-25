"use client";

import { useGSAP } from "@gsap/react";
import Cardapio from "./componenets/Cardapio";
import Footer from "./componenets/Footer";
import Header from "./componenets/Header";
import gsap from "gsap";
import Db from "./lib/db";
import Loading from "./componenets/Loading";
import AddPedido from "./lib/addPedido";

const host = "http://localhost:3000/"
const cart = "/icons/pedidos.svg"

let pratos = Db()
pratos = pratos.pratos

function Home() {
  const time = 0
  let msgHora = "Delicias da manha!"
  let nomePrato = "Coxinha de frango"
  let descPrato = "Coxinha dourada, massa leve e crocante, recheada com frango cremoso e tempero intenso que explode sabor a cada mordida."
  let pratoTmp = null



  useGSAP(() => {
    const animaCards = () => {

    }

    function getPratoById(id) {
      pratos.forEach(prato => {
        prato.forEach(p => {

          if (p.id == id) {
            pratoTmp = p
          }
        })
      })
    }

    const configFocoPrato = () => {
      const root = document.querySelector(".hero")
      const pratos = root.querySelectorAll(".pratoDestaque")
      const delay = 1.6



      const animaInfo = (id) => {
        getPratoById(id)
        const boxInfo = document.querySelector(".group-info")
        const h2 = boxInfo.querySelector("h3")
        const desc = boxInfo.querySelector("p")
        const btnDetalhes = boxInfo.querySelector(".btn-queroJa")
        const btnAdd = boxInfo.querySelector(".icon-cart")
        const textContainer = boxInfo.querySelector(".texts")
        const prato = pratoTmp

        gsap.to(textContainer, {
          duration: 0.5,
          opacity: 0,
          x: "-7%",
          onComplete: () => {
            h2.innerText = prato.nome
            desc.innerText = prato.desc
            btnAdd.dataset.pratoId = prato.id
            btnDetalhes.dataset.pratoId = prato.id

            gsap.to(textContainer, {
              duration: 1,
              opacity: 1,
              x: "0%",

            })
          }
        })




        gsap.to(boxInfo, {
          duration: time,
          delay: delay,
          opacity: 1,
          x: "0%"
        })
      }

      const configObsever = (es) => {
        const e = es[0].target
        if (es[0].isIntersecting === true) {
          console.log('oiii')

          setTimeout(() => {
            animaInfo(e.dataset.id)

          }, 100)

          gsap.to(e, {
            duration: 1.5,
            scale: 2.6,
            onComplete: () => {
              //pratoDestaque

              gsap.to(".destaques", {
                duration: 0.6,
                rotate: `${gsap.getProperty(".destaques", "rotate") - 10}`,
                delay: 0.8
              })

              gsap.to(".destaques .pratoDestaque", {
                duration: 0.6,
                rotate: `-${gsap.getProperty(".destaques", "rotate") - 10}`,
                delay: 0.8
              })

              gsap.to(e, {
                duration: 1.5,
                scale: 1,
                delay: delay,
              })
            }

          })
        } else {
          gsap.to(e, {
            duration: 0.5,
            scale: 1
          })
        }
      }

      const obsever = new IntersectionObserver(configObsever, {
        root: root,
      })

      pratos.forEach(prato => {
        obsever.observe(prato)
      })


    }

    const animaRotatePrato = () => {
      const rotation = 90
      const rotationStart = 0
      const delay = 2
      const time = 1.5
      const timelineContainer = gsap.timeline({ repeat: -1 })
      const timelinePratos = gsap.timeline({ repeat: -1 })


      timelineContainer
        .to(".destaques", {
          duration: 0,
          rotate: `${rotationStart}deg`
        }
        )
        .to(".destaques", {
          duration: time,
          delay: delay,
          rotate: `${rotation * 1}deg`,
        }
        )
        .to(".destaques", {
          duration: time,
          delay: delay,
          rotate: `${rotation * 2}deg`,
        }
        )
        .to(".destaques", {
          duration: time,
          delay: delay,
          rotate: `${rotation * 3}deg`,

        }
        )
        .to(".destaques", {
          duration: time,
          delay: delay,
          rotate: `${rotation * 4}deg`,

        }
        )



      timelinePratos
        .to(".destaques .pratoDestaque", { duration: 0, rotate: `${rotationStart}deg` })
        .to(".destaques .pratoDestaque", { duration: time, delay: delay, rotate: `-${rotation * 1}deg` })
        .to(".destaques .pratoDestaque", { duration: time, delay: delay, rotate: `-${rotation * 2}deg` })
        .to(".destaques .pratoDestaque", { duration: time, delay: delay, rotate: `-${rotation * 3}deg` })
        .to(".destaques .pratoDestaque", { duration: time, delay: delay, rotate: `-${rotation * 4}deg` })


      configFocoPrato()





    }

    const verDetalhes = () => {
      const btn = document.querySelector(".btn-queroJa")

      btn.addEventListener("click", (e) => {
        console.log(e.target.dataset.pratoId)


        if (e.target.dataset.pratoId !== undefined && e.target.dataset.pratoId !== null) {
          console.log("olala")

          sessionStorage.setItem("ps", e.target.dataset.pratoId)

        } else {
          sessionStorage.setItem("ps", 9)

        }

        gsap.to(".backgroundPage", {
          duration: 0.3,
          opacity: 1,
          onComplete: () => {
            window.location.href = host + "detalhePrato"
          }
        })


      })
    }

    const addPedido = () => {
      const btn = document.querySelector(".icon-cart")

      btn.addEventListener("click", () => {
        pratos.forEach((ps, indiceLista) => {
          ps.forEach((p, indice) => {
            if (p.id == btn.dataset.pratoId) {
              console.log(p)
              AddPedido(indiceLista, indice)
            }
          })
        })
      })
    }

    function getHora() {
      const date = new Date()
      const hora = date.getHours()
      console.log(hora)


      if (hora > 4) {
        document.querySelector("body").className = "dia"
        document.querySelector("header").className = "dia"
      }

      if (hora > 11) {
        document.querySelector("body").className = "tarde"
        document.querySelector("header").className = "tarde"

      }

      if (hora > 17) {
        document.querySelector("body").className = "noite"
        document.querySelector("header").className = "noite"

      }
    }

    getHora()

    //verDetalhes()
    //addPedido()

    animaRotatePrato()
  }, [])





  function getPratos() {
    return (
      <>
        <img className="pratoDestaque pratoPos1" data-id={pratos[0][0].id} src={pratos[0][0].images[0]} alt="" />
        <img className="pratoDestaque pratoPos2" data-id={pratos[0][1].id} src={pratos[0][1].images[0]} alt="" />
        <img className="pratoDestaque pratoPos3" data-id={pratos[0][2].id} src={pratos[0][2].images[0]} alt="" />
        <img className="pratoDestaque pratoPos4" data-id={pratos[1][0].id} src={pratos[1][0].images[0]} alt="" />
      </>
    )
  }

  return (
    <>
      <Loading />

      <Header />



      <main className="getPratos">
        <div className="hero">
          <h2 className="boasvindas">{msgHora}</h2>
          <div className="destaques">

            <div className="pratos">
              {getPratos()}
            </div>
            <div className="circEffect">
              <div className="shadowCirc"></div>
            </div>

          </div>
          <div className="group-info">
            <div className="texts">
              <h3>{nomePrato}</h3>
              <p>{descPrato}</p>
            </div>

            <div className="group-btns">
              <button className="btn-queroJa">Quero já</button>

              <button className="icon-cart">
                <img src={cart} alt="" />
              </button>
            </div>
          </div>
        </div>

        <Cardapio />
      </main>

      <Footer />
    </>
  );
}

export default Home;