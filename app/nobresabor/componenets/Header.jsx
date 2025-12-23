"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

const logo = "images/logo.svg"
const cart = "icons/pedidos.svg"
 


function Header() {
  const [qtdsPedidos, setQtdsPedidos] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem("p") !== null) {
      let qtd = 0

      const pedidos = sessionStorage.getItem("p")

      qtd = parseInt(pedidos[0].length, 10) + 1


      setQtdsPedidos(qtd)
    } else {
      setQtdsPedidos(0)
    }
  }, [])

  useGSAP(() => {
    const time = 1

    const animaInitHeader = () => {
      const header = document.querySelector("header")
      const timeline = gsap.timeline({})
      let lock = 1

      const startMenu = () => {
        if (true) {

          timeline.clear()
          timeline.to("header", {
            duration: time,
            opacity: 1,
            y: "0rem",
          })

          timeline.to("header .bg", {
            duration: time * 2,
            opacity: 0.3,
            onComplete: () => {
              header.addEventListener("mouseleave", () => {
                console.log(lock)

                closeMenu(1)
              })
            }
          })
        }

      }

      const closeMenu = (delay) => {
        if (true) {


          timeline.to("header", {
            duration: time,
            opacity: 0,
            y: "-6rem",
          })

          timeline.to("header", {
            duration: 0,
            y: "0rem",
          })


          timeline.to("header .bg", {
            duration: time / 2,
            opacity: 0,
            onComplete: () => {
              //timeline.clear()
            }
          })

        }
      }


      startMenu()
      closeMenu(1)


      header.addEventListener("mouseenter", () => {
        console.log(lock)
        startMenu()

      })



    }

    animaInitHeader()
  }, [])
  return (
    <>

      <header>
        <div className="bg"></div>

        <a href="/" className="group-logo">
          <img src={logo} alt="" />

          <h1>Nobre Sabor</h1>
        </a>



        <nav className="group-menus">
          <a className="link-menu" href="/">Inicio</a>
          <button className="link-menu">Cardapio</button>
          <a className="link-menu" href="/detalhePrato">Mais vendido</a>
        </nav>

        <a href="/fazerPedido" className="linkPedidos">
          <img src={cart} alt="" />

          <div className="qtdPedido">
            <span>{qtdsPedidos}</span>
          </div>
        </a>
      </header>
    </>
  );
}

export default Header;