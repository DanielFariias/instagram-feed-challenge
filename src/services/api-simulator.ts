export async function simulateDelay(ms: number = 1000): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms))
}

export function shouldSimulateError(errorRate: number = 0.15): boolean {
  return Math.random() < errorRate
}

export function createSimulatedError(message: string = 'Algo deu errado'): Error {
  const errors = [
    'Erro de conexão. Tente novamente.',
    'Servidor não disponível.',
    'Tempo limite excedido.',
    'Falha ao processar requisição.',
  ]

  return new Error(errors[Math.floor(Math.random() * errors.length)] || message)
}
