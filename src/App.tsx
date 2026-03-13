import { useMemo, useState } from "react"

type Aba = "inicio" | "novo" | "pedidos" | "painel"

type Pedido = {
  id: number
  comercio: string
  nomeCliente: string
  coleta: string
  entrega: string
  valorEntrega: string
  observacoes: string
  status: string
}

export default function App() {
  const [abaAtual, setAbaAtual] = useState<Aba>("inicio")

  const [comercio, setComercio] = useState("")
  const [nomeCliente, setNomeCliente] = useState("")
  const [coleta, setColeta] = useState("")
  const [entrega, setEntrega] = useState("")
  const [valorEntrega, setValorEntrega] = useState("10,00")
  const [observacoes, setObservacoes] = useState("")

  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: 1,
      comercio: "Farmácia Central",
      nomeCliente: "Maria",
      coleta: "Centro",
      entrega: "Candeias",
      valorEntrega: "10,00",
      observacoes: "Entregar rápido",
      status: "Recebido",
    },
    {
      id: 2,
      comercio: "Mercado Bahia",
      nomeCliente: "João",
      coleta: "Mercado Central",
      entrega: "Brasil",
      valorEntrega: "12,00",
      observacoes: "",
      status: "Em rota",
    },
  ])

  const abrirWhatsapp = () => {
    window.open("https://wa.me/5577998635270", "_blank")
  }

  const enviarPedidoWhatsapp = () => {
    const mensagem =
      `Novo pedido - Novaes Delivery\n\n` +
      `Comércio: ${comercio}\n` +
      `Cliente: ${nomeCliente}\n` +
      `Coleta: ${coleta}\n` +
      `Entrega: ${entrega}\n` +
      `Valor da entrega: R$ ${valorEntrega}\n` +
      `Observações: ${observacoes || "Sem observações"}`

    const link = `https://wa.me/5577998635270?text=${encodeURIComponent(mensagem)}`
    window.open(link, "_blank")
  }

  const adicionarPedido = () => {
    if (!comercio || !nomeCliente || !coleta || !entrega || !valorEntrega) {
      alert("Preencha os campos principais do pedido.")
      return
    }

    const novoPedido: Pedido = {
      id: Date.now(),
      comercio,
      nomeCliente,
      coleta,
      entrega,
      valorEntrega,
      observacoes,
      status: "Recebido",
    }

    setPedidos([novoPedido, ...pedidos])

    setComercio("")
    setNomeCliente("")
    setColeta("")
    setEntrega("")
    setValorEntrega("10,00")
    setObservacoes("")

    setAbaAtual("pedidos")
  }

  const atualizarStatus = (id: number, novoStatus: string) => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, status: novoStatus } : pedido
      )
    )
  }

  const abrirRota = (endereco: string) => {
    const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      endereco
    )}`
    window.open(link, "_blank")
  }

  const excluirPedido = (id: number) => {
    const confirmar = window.confirm("Deseja excluir este pedido?")
    if (!confirmar) return

    setPedidos(pedidos.filter((pedido) => pedido.id !== id))
  }

  const totais = useMemo(() => {
    const totalPedidos = pedidos.length
    const emRota = pedidos.filter((pedido) => pedido.status === "Em rota").length
    const entregues = pedidos.filter((pedido) => pedido.status === "Entregue").length

    const valorTotal = pedidos.reduce((total, pedido) => {
      const valor = Number(pedido.valorEntrega.replace(",", "."))
      return total + (isNaN(valor) ? 0 : valor)
    }, 0)

    return {
      totalPedidos,
      emRota,
      entregues,
      valorTotal,
    }
  }, [pedidos])

  const corAba = (aba: Aba) =>
    abaAtual === aba
      ? {
          background: "#facc15",
          color: "#000",
          border: "1px solid #facc15",
        }
      : {
          background: "#151515",
          color: "#fff",
          border: "1px solid #2c2c2c",
        }

  return (
    <div
      style={{
        background: "#0b0b0b",
        color: "white",
        minHeight: "100vh",
        padding: "20px 14px 90px 14px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg,#111,#1a1a1a)",
            border: "1px solid #2a2a2a",
            borderRadius: "20px",
            padding: "22px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          {abaAtual === "inicio" && (
            <div>
              <div style={{ marginBottom: "22px" }}>
                <div
                  style={{
                    color: "#facc15",
                    fontSize: "32px",
                    fontWeight: "bold",
                    lineHeight: "1.2",
                    marginBottom: "2px",
                  }}
                >
                  Novaes
                </div>

                <div
                  style={{
                    color: "#facc15",
                    fontSize: "32px",
                    fontWeight: "bold",
                    lineHeight: "1.2",
                    marginBottom: "12px",
                  }}
                >
                  Delivery
                </div>

                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#ffffff",
                    margin: "0 0 10px 0",
                    lineHeight: "1.3",
                  }}
                >
                  Entrega rápida e segura
                </h2>

                <p
                  style={{
                    color: "#cfcfcf",
                    fontSize: "16px",
                    marginBottom: "0",
                    lineHeight: "1.5",
                  }}
                >
                  Chame motoboy agora ou cadastre entregas para seu comércio.
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "14px",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    background: "#151515",
                    padding: "16px",
                    borderRadius: "16px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "16px" }}>
                    Preço inicial
                  </h3>
                  <p style={{ fontSize: "22px", fontWeight: "bold", margin: 0 }}>
                    R$ 10,00
                  </p>
                </div>

                <div
                  style={{
                    background: "#151515",
                    padding: "16px",
                    borderRadius: "16px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "16px" }}>
                    Região
                  </h3>
                  <p style={{ fontSize: "22px", fontWeight: "bold", margin: 0 }}>
                    Vitória da Conquista
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                }}
              >
                <button
                  onClick={abrirWhatsapp}
                  style={{
                    background: "#25D366",
                    color: "#000",
                    border: "none",
                    padding: "16px 18px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Chamar motoboy agora
                </button>

                <button
                  onClick={() => setAbaAtual("novo")}
                  style={{
                    background: "#facc15",
                    color: "#000",
                    border: "none",
                    padding: "16px 18px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Cadastrar entrega
                </button>

                <button
                  style={{
                    background: "#151515",
                    color: "#fff",
                    border: "1px solid #2c2c2c",
                    padding: "16px 18px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Instalar app
                </button>
              </div>
            </div>
          )}

          {abaAtual === "novo" && (
            <div>
              <h2
                style={{
                  color: "#facc15",
                  marginTop: 0,
                  marginBottom: "18px",
                  fontSize: "26px",
                }}
              >
                Novo pedido
              </h2>

              <div style={{ display: "grid", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Nome do comércio"
                  value={comercio}
                  onChange={(e) => setComercio(e.target.value)}
                  style={{
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    background: "#0f0f0f",
                    color: "white",
                    fontSize: "16px",
                  }}
                />

                <input
                  type="text"
                  placeholder="Nome do cliente"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  style={{
                    padding: "14px",
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
                    padding: "14px",
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
                    padding: "14px",
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
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    background: "#0f0f0f",
                    color: "white",
                    fontSize: "16px",
                  }}
                />

                <textarea
                  placeholder="Observações"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  style={{
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    background: "#0f0f0f",
                    color: "white",
                    fontSize: "16px",
                    minHeight: "90px",
                    resize: "vertical",
                  }}
                />

                <button
                  onClick={enviarPedidoWhatsapp}
                  style={{
                    background: "#25D366",
                    color: "#000",
                    border: "none",
                    padding: "15px",
                    fontSize: "16px",
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
                    padding: "15px",
                    fontSize: "16px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Adicionar pedido à lista
                </button>
              </div>
            </div>
          )}

          {abaAtual === "pedidos" && (
            <div>
              <h2
                style={{
                  color: "#facc15",
                  marginTop: 0,
                  marginBottom: "18px",
                  fontSize: "26px",
                }}
              >
                Pedidos
              </h2>

              <div style={{ display: "grid", gap: "14px" }}>
                {pedidos.length === 0 && (
                  <div
                    style={{
                      background: "#151515",
                      border: "1px solid #2c2c2c",
                      padding: "18px",
                      borderRadius: "14px",
                      color: "#cfcfcf",
                    }}
                  >
                    Nenhum pedido cadastrado ainda.
                  </div>
                )}

                {pedidos.map((pedido) => (
                  <div
                    key={pedido.id}
                    style={{
                      background: "#151515",
                      border: "1px solid #2c2c2c",
                      borderRadius: "16px",
                      padding: "16px",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {pedido.comercio}
                    </p>

                    <p style={{ margin: "0 0 6px 0", color: "#d4d4d4" }}>
                      <strong>Cliente:</strong> {pedido.nomeCliente}
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

                    <p style={{ margin: "0 0 6px 0", color: "#d4d4d4" }}>
                      <strong>Obs:</strong> {pedido.observacoes || "Sem observações"}
                    </p>

                    <p
                      style={{
                        margin: "0 0 14px 0",
                        color: "#facc15",
                        fontWeight: "bold",
                      }}
                    >
                      Status: {pedido.status}
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => atualizarStatus(pedido.id, "Recebido")}
                        style={{
                          background: "#3b82f6",
                          color: "white",
                          border: "none",
                          padding: "11px 10px",
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
                          padding: "11px 10px",
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
                          padding: "11px 10px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Entregue
                      </button>

                      <button
                        onClick={() => abrirRota(pedido.entrega)}
                        style={{
                          background: "#151515",
                          color: "#fff",
                          border: "1px solid #555",
                          padding: "11px 10px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Abrir rota
                      </button>

                      <button
                        onClick={() => excluirPedido(pedido.id)}
                        style={{
                          gridColumn: "1 / -1",
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          padding: "11px 10px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Excluir pedido
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtual === "painel" && (
            <div>
              <h2
                style={{
                  color: "#facc15",
                  marginTop: 0,
                  marginBottom: "18px",
                  fontSize: "26px",
                }}
              >
                Painel de entregas
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    background: "#151515",
                    padding: "18px",
                    borderRadius: "16px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "16px" }}>
                    Total de pedidos
                  </h3>
                  <p style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                    {totais.totalPedidos}
                  </p>
                </div>

                <div
                  style={{
                    background: "#151515",
                    padding: "18px",
                    borderRadius: "16px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "16px" }}>
                    Em rota
                  </h3>
                  <p style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                    {totais.emRota}
                  </p>
                </div>

                <div
                  style={{
                    background: "#151515",
                    padding: "18px",
                    borderRadius: "16px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "16px" }}>
                    Entregues
                  </h3>
                  <p style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                    {totais.entregues}
                  </p>
                </div>

                <div
                  style={{
                    background: "#151515",
                    padding: "18px",
                    borderRadius: "16px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "16px" }}>
                    Valor total
                  </h3>
                  <p style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                    R$ {totais.valorTotal.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          background: "#101010",
          borderTop: "1px solid #2c2c2c",
          padding: "10px 8px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={() => setAbaAtual("inicio")}
          style={{
            ...corAba("inicio"),
            padding: "12px 8px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Início
        </button>

        <button
          onClick={() => setAbaAtual("novo")}
          style={{
            ...corAba("novo"),
            padding: "12px 8px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Novo
        </button>

        <button
          onClick={() => setAbaAtual("pedidos")}
          style={{
            ...corAba("pedidos"),
            padding: "12px 8px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Pedidos
        </button>

        <button
          onClick={() => setAbaAtual("painel")}
          style={{
            ...corAba("painel"),
            padding: "12px 8px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Painel
        </button>
      </div>
    </div>
  )
}