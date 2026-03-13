import { useState } from "react"

type Pedido = {
  id: number
  nomeCliente: string
  coleta: string
  entrega: string
  valorEntrega: string
  status: string
}

export default function App() {
  const [nomeCliente, setNomeCliente] = useState("")
  const [coleta, setColeta] = useState("")
  const [entrega, setEntrega] = useState("")
  const [valorEntrega, setValorEntrega] = useState("10,00")

  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: 1,
      nomeCliente: "Maria",
      coleta: "Centro",
      entrega: "Candeias",
      valorEntrega: "10,00",
      status: "Recebido",
    },
    {
      id: 2,
      nomeCliente: "João",
      coleta: "Mercado Central",
      entrega: "Brasil",
      valorEntrega: "12,00",
      status: "Em rota",
    },
  ])

  const abrirWhatsapp = () => {
    window.open("https://wa.me/5577998635270", "_blank")
  }

  const irParaPedido = () => {
    document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" })
  }

  const enviarPedido = () => {
    const mensagem =
      `Novo pedido - Novaes Delivery\n\n` +
      `Cliente: ${nomeCliente}\n` +
      `Coleta: ${coleta}\n` +
      `Entrega: ${entrega}\n` +
      `Valor da entrega: R$ ${valorEntrega}`

    const link = `https://wa.me/5577998635270?text=${encodeURIComponent(mensagem)}`
    window.open(link, "_blank")
  }

  const adicionarPedido = () => {
    if (!nomeCliente || !coleta || !entrega || !valorEntrega) {
      alert("Preencha todos os campos do pedido.")
      return
    }

    const novoPedido: Pedido = {
      id: Date.now(),
      nomeCliente,
      coleta,
      entrega,
      valorEntrega,
      status: "Recebido",
    }

    setPedidos([novoPedido, ...pedidos])
    setNomeCliente("")
    setColeta("")
    setEntrega("")
    setValorEntrega("10,00")

    document.getElementById("lista-pedidos")?.scrollIntoView({ behavior: "smooth" })
  }

  const atualizarStatus = (id: number, novoStatus: string) => {
    const pedidosAtualizados = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, status: novoStatus } : pedido
    )
    setPedidos(pedidosAtualizados)
  }

  const totalPedidos = pedidos.length
  const pedidosEmRota = pedidos.filter((pedido) => pedido.status === "Em rota").length
  const pedidosEntregues = pedidos.filter((pedido) => pedido.status === "Entregue").length
  const valorTotal = pedidos.reduce((total, pedido) => {
    const valor = Number(pedido.valorEntrega.replace(",", "."))
    return total + (isNaN(valor) ? 0 : valor)
  }, 0)

  return (
    <div
      style={{
        background: "#0b0b0b",
        color: "white",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #111, #1a1a1a)",
            border: "1px solid #2a2a2a",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <h1
            style={{
              color: "#facc15",
              fontSize: "48px",
              fontWeight: "bold",
              margin: "0 0 15px 0",
              letterSpacing: "2px",
              lineHeight: "1.1",
            }}
          >
            Entrega Novaes
          </h1>

          <h2
            style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#ffffff",
              margin: "0 0 12px 0",
              lineHeight: "1.3",
            }}
          >
            Entrega rápida e segura
          </h2>

          <p
            style={{
              color: "#cfcfcf",
              fontSize: "18px",
              marginBottom: "25px",
            }}
          >
            Atendendo Vitória da Conquista e região com agilidade.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                background: "#151515",
                padding: "20px",
                borderRadius: "18px",
                border: "1px solid #2c2c2c",
              }}
            >
              <h3 style={{ color: "#facc15", marginTop: 0 }}>Preço inicial</h3>
              <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                R$ 10,00
              </p>
            </div>

            <div
              style={{
                background: "#151515",
                padding: "20px",
                borderRadius: "18px",
                border: "1px solid #2c2c2c",
              }}
            >
              <h3 style={{ color: "#facc15", marginTop: 0 }}>Atendimento</h3>
              <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                Rápido
              </p>
            </div>

            <div
              style={{
                background: "#151515",
                padding: "20px",
                borderRadius: "18px",
                border: "1px solid #2c2c2c",
              }}
            >
              <h3 style={{ color: "#facc15", marginTop: 0 }}>Região</h3>
              <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                Vitória da Conquista
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                background: "#151515",
                padding: "20px",
                borderRadius: "18px",
                border: "1px solid #2c2c2c",
              }}
            >
              <h3 style={{ color: "#facc15", marginTop: 0 }}>Total de pedidos</h3>
              <p style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                {totalPedidos}
              </p>
            </div>

            <div
              style={{
                background: "#151515",
                padding: "20px",
                borderRadius: "18px",
                border: "1px solid #2c2c2c",
              }}
            >
              <h3 style={{ color: "#facc15", marginTop: 0 }}>Em rota</h3>
              <p style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                {pedidosEmRota}
              </p>
            </div>

            <div
              style={{
                background: "#151515",
                padding: "20px",
                borderRadius: "18px",
                border: "1px solid #2c2c2c",
              }}
            >
              <h3 style={{ color: "#facc15", marginTop: 0 }}>Entregues</h3>
              <p style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                {pedidosEntregues}
              </p>
            </div>

            <div
              style={{
                background: "#151515",
                padding: "20px",
                borderRadius: "18px",
                border: "1px solid #2c2c2c",
              }}
            >
              <h3 style={{ color: "#facc15", marginTop: 0 }}>Valor total</h3>
              <p style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                R$ {valorTotal.toFixed(2).replace(".", ",")}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            <button
              onClick={abrirWhatsapp}
              style={{
                background: "#25D366",
                color: "#000",
                border: "none",
                padding: "16px 28px",
                fontSize: "18px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Chamar no WhatsApp
            </button>

            <button
              onClick={irParaPedido}
              style={{
                background: "#facc15",
                color: "#000",
                border: "none",
                padding: "16px 28px",
                fontSize: "18px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Novo pedido
            </button>
          </div>

          <div
            id="pedido"
            style={{
              background: "#151515",
              padding: "25px",
              borderRadius: "18px",
              border: "1px solid #2c2c2c",
              marginBottom: "30px",
            }}
          >
            <h3
              style={{
                color: "#facc15",
                fontSize: "28px",
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              Fazer novo pedido
            </h3>

            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              <input
                type="text"
                placeholder="Nome do cliente"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                style={{
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid #333",
                  background: "#0f0f0f",
                  color: "white",
                  fontSize: "16px",
                }}
              />

              <input
                type="text"
                placeholder="Endereço de coleta"
                value={coleta}
                onChange={(e) => setColeta(e.target.value)}
                style={{
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid #333",
                  background: "#0f0f0f",
                  color: "white",
                  fontSize: "16px",
                }}
              />

              <input
                type="text"
                placeholder="Endereço de entrega"
                value={entrega}
                onChange={(e) => setEntrega(e.target.value)}
                style={{
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid #333",
                  background: "#0f0f0f",
                  color: "white",
                  fontSize: "16px",
                }}
              />

              <input
                type="text"
                placeholder="Valor da entrega"
                value={valorEntrega}
                onChange={(e) => setValorEntrega(e.target.value)}
                style={{
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid #333",
                  background: "#0f0f0f",
                  color: "white",
                  fontSize: "16px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={enviarPedido}
                  style={{
                    background: "#25D366",
                    color: "#000",
                    border: "none",
                    padding: "16px 28px",
                    fontSize: "18px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Enviar pedido no WhatsApp
                </button>

                <button
                  onClick={adicionarPedido}
                  style={{
                    background: "#facc15",
                    color: "#000",
                    border: "none",
                    padding: "16px 28px",
                    fontSize: "18px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Adicionar pedido à lista
                </button>
              </div>
            </div>
          </div>

          <div
            id="lista-pedidos"
            style={{
              background: "#151515",
              padding: "25px",
              borderRadius: "18px",
              border: "1px solid #2c2c2c",
            }}
          >
            <h3
              style={{
                color: "#facc15",
                fontSize: "28px",
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              Pedidos em andamento
            </h3>

            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              {pedidos.map((pedido) => (
                <div
                  key={pedido.id}
                  style={{
                    background: "#0f0f0f",
                    border: "1px solid #333",
                    borderRadius: "16px",
                    padding: "18px",
                    textAlign: "left",
                  }}
                >
                  <p style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: "bold" }}>
                    {pedido.nomeCliente}
                  </p>

                  <p style={{ margin: "0 0 6px 0", color: "#d4d4d4" }}>
                    <strong>Coleta:</strong> {pedido.coleta}
                  </p>

                  <p style={{ margin: "0 0 6px 0", color: "#d4d4d4" }}>
                    <strong>Entrega:</strong> {pedido.entrega}
                  </p>

                  <p style={{ margin: "0 0 6px 0", color: "#d4d4d4" }}>
                    <strong>Valor:</strong> R$ {pedido.valorEntrega}
                  </p>

                  <p style={{ margin: "0 0 14px 0", color: "#facc15", fontWeight: "bold" }}>
                    Status: {pedido.status}
                  </p>

                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => atualizarStatus(pedido.id, "Recebido")}
                      style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Recebido
                    </button>

                    <button
                      onClick={() => atualizarStatus(pedido.id, "Em rota")}
                      style={{
                        background: "#f59e0b",
                        color: "black",
                        border: "none",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Em rota
                    </button>

                    <button
                      onClick={() => atualizarStatus(pedido.id, "Entregue")}
                      style={{
                        background: "#22c55e",
                        color: "black",
                        border: "none",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Entregue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}