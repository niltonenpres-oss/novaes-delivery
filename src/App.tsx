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

  const estiloAba = (aba: Aba) => ({
    background: abaAtual === aba ? "#facc15" : "#151515",
    color: abaAtual === aba ? "#000" : "#fff",
    border: abaAtual === aba ? "1px solid #facc15" : "1px solid #2c2c2c",
    padding: "10px 12px",
    borderRadius: "10px",
    fontWeight: "bold" as const,
    fontSize: "14px",
    cursor: "pointer",
    minWidth: "72px",
    whiteSpace: "nowrap" as const,
    overflow: "hidden" as const,
    textOverflow: "ellipsis" as const,
    flexShrink: 0 as const,
  })

  return (
    <div
      style={{
        background: "#0b0b0b",
        color: "white",
        minHeight: "100vh",
        padding: "16px 12px 24px 12px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg,#111,#1a1a1a)",
            border: "1px solid #2a2a2a",
            borderRadius: "20px",
            padding: "18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "10px",
              marginBottom: "18px",
            }}
          >
            <button onClick={() => setAbaAtual("inicio")} style={estiloAba("inicio")}>
              Início
            </button>
            <button onClick={() => setAbaAtual("novo")} style={estiloAba("novo")}>
              Novo
            </button>
            <button onClick={() => setAbaAtual("pedidos")} style={estiloAba("pedidos")}>
              Pedidos
            </button>
            <button onClick={() => setAbaAtual("painel")} style={estiloAba("painel")}>
              Painel
            </button>
          </div>

          {abaAtual === "inicio" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    color: "#facc15",
                    fontSize: "30px",
                    fontWeight: "bold",
                    lineHeight: "1.15",
                    marginBottom: "2px",
                  }}
                >
                  Novaes
                </div>

                <div
                  style={{
                    color: "#facc15",
                    fontSize: "30px",
                    fontWeight: "bold",
                    lineHeight: "1.15",
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
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    background: "#151515",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "15px" }}>
                    Preço inicial
                  </h3>
                  <p style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
                    R$ 10,00
                  </p>
                </div>

                <div
                  style={{
                    background: "#151515",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "15px" }}>
                    Região
                  </h3>
                  <p style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
                    Vitória da Conquista
                  </p>
                </div>
              </div>

              <div style={{ display: "grid", gap: "10px" }}>
                <button
                  onClick={abrirWhatsapp}
                  style={{
                    background: "#25D366",
                    color: "#000",
                    border: "none",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "15px",
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
                    padding: "14px 16px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "15px",
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
                    padding: "14px 16px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "15px",
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
                  marginBottom: "16px",
                  fontSize: "24px",
                }}
              >
                Novo pedido
              </h2>

              <div style={{ display: "grid", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Nome do comércio"
                  value={comercio}
                  onChange={(e) => setComercio(e.target.value)}
                  style={{
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    background: "#0f0f0f",
                    color: "white",
                    fontSize: "15px",
                  }}
                />

                <input
                  type="text"
                  placeholder="Nome do cliente"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  style={{
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    background: "#0f0f0f",
                    color: "white",
                    fontSize: "15px",
                  }}
                />

                <input
                  type="text"
                  placeholder="Endereço de coleta"
                  value={coleta}
                  onChange={(e) => setColeta(e.target.value)}
                  style={{
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    background: "#0f0f0f",
                    color: "white",
                    fontSize: "15px",
                  }}
                />

                <input
                  type="text"
                  placeholder="Endereço de entrega"
                  value={entrega}
                  onChange={(e) => setEntrega(e.target.value)}
                  style={{
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    background: "#0f0f0f",
                    color: "white",
                    fontSize: "15px",
                  }}
                />

                <input
                  type="text"
                  placeholder="Valor da entrega"
                  value={valorEntrega}
                  onChange={(e) => setValorEntrega(e.target.value)}
                  style={{
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    background: "#0f0f0f",
                    color: "white",
                    fontSize: "15px",
                  }}
                />

                <textarea
                  placeholder="Observações"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  style={{
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    background: "#0f0f0f",
                    color: "white",
                    fontSize: "15px",
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
                    padding: "14px",
                    fontSize: "15px",
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
                    padding: "14px",
                    fontSize: "15px",
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
                  marginBottom: "16px",
                  fontSize: "24px",
                }}
              >
                Pedidos
              </h2>

              <div style={{ display: "grid", gap: "12px" }}>
                {pedidos.length === 0 && (
                  <div
                    style={{
                      background: "#151515",
                      border: "1px solid #2c2c2c",
                      padding: "16px",
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
                      borderRadius: "14px",
                      padding: "14px",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "17px",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {pedido.comercio}
                    </p>

                    <p style={{ margin: "0 0 5px 0", color: "#d4d4d4" }}>
                      <strong>Cliente:</strong> {pedido.nomeCliente}
                    </p>

                    <p style={{ margin: "0 0 5px 0", color: "#d4d4d4" }}>
                      <strong>Coleta:</strong> {pedido.coleta}
                    </p>

                    <p style={{ margin: "0 0 5px 0", color: "#d4d4d4" }}>
                      <strong>Entrega:</strong> {pedido.entrega}
                    </p>

                    <p style={{ margin: "0 0 5px 0", color: "#d4d4d4" }}>
                      <strong>Valor:</strong> R$ {pedido.valorEntrega}
                    </p>

                    <p style={{ margin: "0 0 5px 0", color: "#d4d4d4" }}>
                      <strong>Obs:</strong> {pedido.observacoes || "Sem observações"}
                    </p>

                    <p
                      style={{
                        margin: "0 0 12px 0",
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
                          padding: "10px 8px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "13px",
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
                          padding: "10px 8px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "13px",
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
                          padding: "10px 8px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "13px",
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
                          padding: "10px 8px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "13px",
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
                          padding: "10px 8px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "13px",
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
                  marginBottom: "16px",
                  fontSize: "24px",
                }}
              >
                Painel de entregas
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    background: "#151515",
                    padding: "16px",
                    borderRadius: "14px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "15px" }}>
                    Total de pedidos
                  </h3>
                  <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                    {totais.totalPedidos}
                  </p>
                </div>

                <div
                  style={{
                    background: "#151515",
                    padding: "16px",
                    borderRadius: "14px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "15px" }}>
                    Em rota
                  </h3>
                  <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                    {totais.emRota}
                  </p>
                </div>

                <div
                  style={{
                    background: "#151515",
                    padding: "16px",
                    borderRadius: "14px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "15px" }}>
                    Entregues
                  </h3>
                  <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                    {totais.entregues}
                  </p>
                </div>

                <div
                  style={{
                    background: "#151515",
                    padding: "16px",
                    borderRadius: "14px",
                    border: "1px solid #2c2c2c",
                  }}
                >
                  <h3 style={{ color: "#facc15", marginTop: 0, fontSize: "15px" }}>
                    Valor total
                  </h3>
                  <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                    R$ {totais.valorTotal.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}