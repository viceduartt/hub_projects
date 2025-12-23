export default function AddPedido(i1, i2) {
    //console.log("oi")

    if (i1 !== null && i2 !== null) {
        if (sessionStorage.getItem("p") !== null) {
            const pedidos = JSON.parse(sessionStorage.getItem("p"));
            //console.log("rec")


            pedidos.push([i1, i2])

            sessionStorage.setItem("p", JSON.stringify(pedidos));

        } else {
            //console.log("adddd")
            sessionStorage.setItem("p", JSON.stringify([[i1, i2]]));


            return JSON.parse(sessionStorage.getItem("p"))




        }

        
    }



}