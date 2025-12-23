export default function Db() {
    const baseBebida = "images/bebidas/"
    const basePMolho = "images/molhos/"

    const folderManha = "images/manha/";
    const folderTarde = "images/tarde/";
    const folderNoite = "images/noite/";

    const pratos = [
        [
            {
                id: 1,
                nome: "Bolinho de bacalhau",
                valor: "32",
                desc: "Porção de bolinhos artesanais, massa leve com lascas de bacalhau e tempero fresco, dourados até ficarem crocantes.",
                images: [folderManha + "p3.svg", folderManha + "p2.svg", folderManha + "p1.svg", folderManha + "p4.svg"],
                acabou: false,
                categoria: "manha"
            },
            {
                id: 2,
                nome: "Esfirra de carne",
                valor: "18",
                desc: "Massa macia recheada com carne moída bem temperada, assada lentamente para preservar suculência e aroma.",
                images: [folderManha + "p1.svg", folderManha + "p2.svg", folderManha + "p3.svg", folderManha + "p4.svg"],
                acabou: false,
                categoria: "manha"
            },
            {
                id: 3,
                nome: "Enroladinho de queijo",
                valor: "22",
                desc: "Massa fina e dourada envolvendo queijo derretido com leve toque de especiarias e crocância equilibrada.",
                images: [folderManha + "p2.svg", folderManha + "p2.svg", folderManha + "p3.svg", folderManha + "p4.svg"],
                acabou: false,
                categoria: "manha"
            },
        ],

        [
            {
                id: 4,
                nome: "Pastel de camarão",
                valor: "27",
                desc: "Pastel crocante recheado com camarões refogados e creme suave, trazendo sabor marcante e textura equilibrada.",
                images: [folderTarde + "p1.svg", folderTarde + "p2.svg", folderTarde + "p3.svg", folderTarde + "p4.svg"],
                acabou: false,
                categoria: "tarde"
            },
            {
                id: 5,
                nome: "Empada de frango",
                valor: "12",
                desc: "Empada amanteigada com recheio de frango cremoso, tempero leve e final macio que desmancha na boca.",
                images: [folderTarde + "p1.svg", folderTarde + "p2.svg", folderTarde + "p3.svg", folderTarde + "p4.svg"],
                acabou: false,
                categoria: "tarde"
            },
            {
                id: 6,
                nome: "Kibe recheado",
                valor: "20",
                desc: "Massa de trigo e carne temperada, crocante por fora e recheada com queijo derretido no interior.",
                images: [folderTarde + "p1.svg", folderTarde + "p2.svg", folderTarde + "p3.svg", folderTarde + "p4.svg"],
                acabou: false,
                categoria: "tarde"
            },
        ],

        [
            {
                id: 7,
                nome: "Torta de palmito",
                valor: "15",
                desc: "Torta leve com massa amanteigada e recheio cremoso de palmito fresco com ervas aromáticas.",
                images: [folderNoite + "p1.svg", folderNoite + "p2.svg", folderNoite + "p3.svg", folderNoite + "p4.svg"],
                acabou: false,
                categoria: "noite"
            },
            {
                id: 8,
                nome: "Mini pizza de calabresa",
                valor: "14",
                desc: "Base fina assada com molho artesanal, queijo derretido e calabresa crocante no ponto ideal.",
                images: [folderNoite + "p1.svg", folderNoite + "p2.svg", folderNoite + "p3.svg", folderNoite + "p4.svg"],
                acabou: false,
                categoria: "noite"
            },
            {
                id: 9,
                nome: "Croissant recheado",
                valor: "19",
                desc: "Folhado leve e amanteigado, recheado com queijo e presunto, assado até atingir textura crocante.",
                images: [folderNoite + "p1.svg", folderNoite + "p2.svg", folderNoite + "p3.svg", folderNoite + "p4.svg"],
                acabou: false,
                categoria: "noite"
            },
        ],

        [
            {
                id: 10,
                nome: "Pão de queijo recheado",
                valor: "10",
                desc: "Clássico pão de queijo mineiro com interior cremoso, aroma marcante e textura elástica.",
                images: [folderManha + "p1.svg", folderManha + "p2.svg", folderManha + "p3.svg", folderManha + "p4.svg"],
                acabou: false,
                categoria: "manha"
            },
            {
                id: 11,
                nome: "Sanduíche natural de atum",
                valor: "17",
                desc: "Pão integral com patê de atum leve, alface crocante, cenoura ralada e toque suave de limão.",
                images: [folderManha + "p1.svg", folderManha + "p2.svg", folderManha + "p3.svg", folderManha + "p4.svg"],
                acabou: false,
                categoria: "manha"
            },
            {
                id: 12,
                nome: "Crepe salgado",
                valor: "21",
                desc: "Massa fina com recheio de queijo e peito de peru, dobrado e grelhado até criar leve crocância.",
                images: [folderManha + "p1.svg", folderManha + "p2.svg", folderManha + "p3.svg", folderManha + "p4.svg"],
                acabou: false,
                categoria: "manha"
            },
        ],

        [
            {
                id: 13,
                nome: "Tapioca de queijo coalho",
                valor: "16",
                desc: "Tapioca macia com queijo coalho derretido, finalizada com leve tostado que ressalta o sabor.",
                images: [folderTarde + "p1.svg", folderTarde + "p2.svg", folderTarde + "p3.svg", folderTarde + "p4.svg"],
                acabou: false,
                categoria: "tarde"
            },
            {
                id: 14,
                nome: "Wrap de frango",
                valor: "23",
                desc: "Tortilla macia recheada com frango grelhado, alface fresca, tomate e molho leve de iogurte.",
                images: [folderTarde + "p1.svg", folderTarde + "p2.svg", folderTarde + "p3.svg", folderTarde + "p4.svg"],
                acabou: false,
                categoria: "tarde"
            },
            {
                id: 15,
                nome: "Quiche de alho-poró",
                valor: "19",
                desc: "Quiche leve com massa dourada e recheio cremoso de alho-poró suavemente refogado.",
                images: [folderTarde + "p1.svg", folderTarde + "p2.svg", folderTarde + "p3.svg", folderTarde + "p4.svg"],
                acabou: false,
                categoria: "tarde"
            },
        ],
    ];






    const extras = [
        {
            categoria: "Bebidas",
            produtos: [
                {
                    nome: "coca cola 2l",
                    acabou: false,
                    image: baseBebida + "p1.svg"
                },

                {
                    nome: "coca cola 2l",
                    acabou: false,
                    image: baseBebida + "p2.svg"
                },

                {
                    nome: "coca cola 2l",
                    acabou: false,
                    image: baseBebida + "p3.svg"
                },

                {
                    nome: "coca cola 2l",
                    acabou: false,
                    image: baseBebida + "p1.svg"
                },
            ]
        },
        {
            categoria: "Molhos:",
            produtos: [
                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p1.svg"
                },

                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p2.svg"
                },

                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p3.svg"
                },

                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p4.svg"
                },


            ]
        },
        {
            categoria: "Molhos:",
            produtos: [
                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p1.svg"
                },

                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p2.svg"
                },

                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p3.svg"
                },

                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p4.svg"
                },


            ]
        },
        {
            categoria: "Molhos:",
            produtos: [
                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p1.svg"
                },

                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p2.svg"
                },

                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p3.svg"
                },

                {
                    nome: "Molho da casa",
                    acabou: false,
                    image: basePMolho + "p4.svg"
                },


            ]
        }
    ]


    return { pratos: pratos, extras: extras }
}
