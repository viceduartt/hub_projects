"use client";

import Db from "../lib/db";
import { useEffect, useState } from "react";
import Header from "../componenets/Header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Loading from "../componenets/Loading";

const db = Db()

let extras = db.extras
let indicePedidos = null
let pedidos = db.pratos
let lockScroll = false



function fazerPedido() {
  const [valorTotal, setValorTotal] = useState(0)



  useEffect(() => {
    getPratosExtras()
    getMeusPedidos()
  }, [])

  function getPratosExtras() {
    extras.forEach(extra => {
      const header = document.createElement("div")
      const categoria = document.createElement("h2")
      const listaGroupPedidosExtra = document.createElement("div")
      const groupPedidoExtra = document.createElement("div")
      const listaPratos = document.createElement("div")

      listaPratos.className = "group-pratoExtra"

      listaGroupPedidosExtra.className = "container-groupsPedidosExtra"
      groupPedidoExtra.className = "pedidoExtra"


      categoria.innerText = extra.categoria
      header.className = "header-categoria"

      header.append(categoria)
      listaGroupPedidosExtra.append(listaPratos)

      listaPratos.append(header)
      listaPratos.append(groupPedidoExtra)
      document.querySelector(".container-listaPratoExtra").append(listaGroupPedidosExtra)


      extra.produtos.forEach(produto => {
        const groupInfoPedidoExtra = document.createElement("div")
        const imgPedidoExtra = document.createElement("img")
        const nomePedidoExtra = document.createElement("h3")
        const btnAddPedidoExtra = document.createElement("button")
        const groupImgText = document.createElement("div")

        btnAddPedidoExtra.innerText = "Adicionar"

        imgPedidoExtra.src = produto.image
        console.log(produto.image)
        nomePedidoExtra.innerText = produto.nome

        groupInfoPedidoExtra.className = "group-infoPedidoExtra"
        imgPedidoExtra.className = "img_pedidoExtra"
        imgPedidoExtra.classList.add(categoria.innerText)
        nomePedidoExtra.className = "nomePedidoExtra"
        btnAddPedidoExtra.className = "btn-pedidoExtra"
        groupImgText.className = "groupIMgText"

        groupInfoPedidoExtra.append(imgPedidoExtra)
        groupInfoPedidoExtra.append(nomePedidoExtra)

        groupImgText.append(groupInfoPedidoExtra)
        groupImgText.append(btnAddPedidoExtra)

        groupPedidoExtra.append(groupImgText)

      })

    })
  }

  function getMeusPedidos() {
    const host = "http://localhost:3000//"

    if (sessionStorage.getItem("p") !== null) {
      const container = document.querySelector(".container-meusPedidos")
      indicePedidos = JSON.parse(sessionStorage.getItem("p"));
      const scrollViwerPratos = document.createElement("div")

      scrollViwerPratos.className = "scrollViwerPratos"

      container.append(scrollViwerPratos)

      let valorTotalTmp = 0


      indicePedidos.forEach((indice, indiceId) => {
        const pedido = pedidos[indice[0]][indice[1]]
        const nomePrato = pedido.nome
        const idPrato = pedido.id
        const imgPrato = pedido.images[0]
        let valorPrato = pedido.valor

        const miniaturaPrato = document.createElement("img")
        const containerDialog = document.createElement("div")
        const msgNomePrato = document.createElement("span")
        const pratoImg = document.createElement("div")

        miniaturaPrato.className = "miniaturaPrato"

        containerDialog.className = "containerNomePrato"
        msgNomePrato.className = "textInfo"

        msgNomePrato.innerText = nomePrato

        pratoImg.className = "pratoImg"
        pratoImg.classList.add(`pImage${indiceId}`)
        pratoImg.dataset.idImg = indiceId
        pratoImg.append(miniaturaPrato)

        containerDialog.id = idPrato
        miniaturaPrato.src = imgPrato

        containerDialog.append(msgNomePrato)
        scrollViwerPratos.append(pratoImg)


        valorPrato = parseInt(valorPrato, 10)
        valorTotalTmp = valorTotalTmp + valorPrato

        setValorTotal(parseInt(valorTotalTmp, 10))


      })
    } else {
      window.location.href = host
    }

  }

  useGSAP(() => {
    const configObseverPrato = () => {
      const pratos = document.querySelectorAll(".pratoImg")
      const scrollViwer = document.querySelector(".scrollViwerPratos")
      const timeline = gsap.timeline({})

      gsap.set(scrollViwer, {
        y: '100%'
      })

      gsap.set(pratos, {
        opacity: 0,
        scale: 1.3,

      })

      gsap.to(scrollViwer, {
        duration: 0.6,
        y: 0
      })


      const animaLoadingPrato = (es) => {
        const target = es[0].target
        const imgBg = target.querySelector("img")
        let prato2 = document.querySelector(`.pImage${parseInt(target.dataset.idImg, 10) + 1}`)
        let prato3 = document.querySelector(`.pImage${parseInt(target.dataset.idImg, 10) + 2}`)

        console.log(prato2)
        console.log(prato3)


        const fadeIn = (e) => {
          timeline.to(e, {
            duration: 0.5,
            opacity: 1,
            scale: 1,
          })
        }

        const fadeOut = (e) => {
          gsap.to(e, {
            duration: 0.6,
            opacity: 0,
            scale: 1.3,
          })
        }



        console.log("oiiiioii")



        if (es[0].isIntersecting === true) {
          fadeIn(target)
          if (prato2 !== null) {
            fadeIn(prato2)
          }

          if (prato3 !== null) {
            fadeIn(prato3)
          }
        } else {
          fadeOut(target)
          if (prato2 !== null) {
            fadeOut(prato2)
          }

          if (prato3 !== null) {
            fadeOut(prato3)
          }
        }
      }

      const obs = new IntersectionObserver(animaLoadingPrato, {
        //root: document.querySelector(".container-meusPedidos"),
        rootMargin: "0% -90% 0px 0px"
      })


      pratos.forEach(prato => {
        obs.observe(prato)
      })
    }

    const configObsListaExtras = () => {
      const timeline = gsap.timeline({})
      const container = document.querySelectorAll(".group-pratoExtra")


      gsap.set(container, {
        opacity: 0,

        y: "40rem",
        x: "50vw",
      })

      gsap.to(container, {
        duration: 0.3,
        y: "0rem",
      })


      const animaContainer = (es) => {

        if (es[0].isIntersecting === true) {
          timeline.to(es[0].target, {
            duration: 1,
            opacity: 1,
            x: "15%",
          })
        } else {
          gsap.to(es[0].target, {
            duration: 1,
            opacity: 0,
            x: "50vw",
          })
        }
      }

      const obs = new IntersectionObserver(animaContainer, {
        threshold: 0
      })

      container.forEach(c => {
        obs.observe(c)
      })
    }

    const scrollPedidos = () => {
      const container = document.querySelector(".scrollViwerPratos")
      const mesa = document.querySelector(".container-meusPedidos")
      let posAtual = 4
      const duration = 0.8

      mesa.addEventListener("wheel", (e) => {
        lockScroll = true

        if (e.deltaY > 0) {
          console.log(posAtual)

          if (posAtual === 4) {
            posAtual = 0
          }

          if (posAtual > -57) {

            gsap.to(container, {
              duration: duration,
              y: `${posAtual--}%`
            })

            if (posAtual < -57) {
              gsap.to(container, {
                duration: duration,
                y: `-${57}%`
              })
            }
          }
        } else if (e.deltaY < 0) {
          if (posAtual < 0) {

            gsap.to(container, {
              duration: duration,
              y: `${posAtual++}%`
            })

            if (posAtual > 0) {
              gsap.to(container, {
                duration: duration,
                y: `${0}%`
              })
            }
          }
        }
      })

      mesa.addEventListener("mouseenter", () => {
        gsap.set("body", {
          overflow: "hidden"
        })
      })

      mesa.addEventListener("mouseleave", () => {
        gsap.set("body", {
          overflow: "scroll"
        })
      })
    }

    const scrollPratosExtra = () => {
      const containers = document.querySelectorAll(".pedidoExtra")
      const duration = 2
      let posAtual = 0.5
      let posContainer = 0



      containers.forEach(container => {
        container.dataset.pos = posAtual

        container.addEventListener("mouseenter", () => {
          posContainer = parseInt(container.dataset.pos, 10)

          gsap.set("body", {
            overflow: "hidden"
          })

        })

        container.addEventListener("wheel", (e) => {
          lockScroll = true



          if (e.deltaY > 0) {
            if (posContainer < 0) {
              gsap.to(container, {
                duration: duration,
                x: `${posContainer++}%`
              })

              posContainer++

              if (posContainer > 0) {
                gsap.to(container, {
                  duration: duration,
                  x: `${0}%`
                })

                posContainer = 0
              }
            }
          } else if (e.deltaY < 0) {
            console.log(posContainer)
            if (posContainer > -33) {
              gsap.to(container, {
                duration: duration,
                x: `${posContainer--}%`
              })

              posContainer--

              if (posContainer < -33) {
                gsap.to(container, {
                  duration: duration,
                  x: `-${33}%`
                })

                posContainer = -33
              }
            }
          }

          container.dataset.pos = posContainer
          console.log(`posContainer: ${container.dataset.pos}`)
        })



        container.addEventListener("mouseleave", () => {
          gsap.set("body", {
            overflow: "scroll"
          })
        })
      })

    }

    setTimeout(() => {
      configObsListaExtras()
      configObseverPrato()
      scrollPedidos()
      scrollPratosExtra()
    }, 100)

  }, [])

  return (
    <>
      <Loading />

      <Header></Header>


      <div className="headerOpacity">
      </div>

      <main className="fazerPedido">
        <div className="group-meusPedidos">
          <h2>Pedidos</h2>

          <div className="group-verPedido-enviarPedido">
            <div className="container-meusPedidos">
            </div>

            <div className="container-valor">
              <h3>Total:</h3>

              <h3>{"R$" + valorTotal + ",00"}</h3>
            </div>

            <button className="btn-fazerPedido">Faer pedido</button>
          </div>
        </div>

        <div className="pratosExtras">
          <h2>Acompanhamento</h2>

          <div className="container-listaPratoExtra">
          </div>
        </div>
      </main>
    </>
  );
}

export default fazerPedido;